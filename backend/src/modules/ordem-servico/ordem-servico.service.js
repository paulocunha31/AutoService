import { Prisma } from '@prisma/client';

import prisma from '../../config/database.js';
import AppError from '../../errors/AppError.js';
import clienteRepository from '../cliente/cliente.repository.js';
import produtoRepository from '../produto/produto.repository.js';
import servicoRepository from '../servico/servico.repository.js';
import veiculoRepository from '../veiculo/veiculo.repository.js';
import ordemServicoRepository from './ordem-servico.repository.js';

class OrdemServicoService {
  async create(data) {
    const cliente = await clienteRepository.findById(data.clienteId);

    if (!cliente || !cliente.ativo) {
      throw new AppError('Cliente não encontrado.', 404);
    }

    const veiculo = await veiculoRepository.findById(data.veiculoId);

    if (!veiculo || !veiculo.ativo) {
      throw new AppError('Veículo não encontrado.', 404);
    }

    if (veiculo.clienteId !== cliente.id) {
      throw new AppError('O veiculo não pertence ao cliente informado.', 400);
    }

    const ordemServico = await ordemServicoRepository.create(data);

    return ordemServico;
  }

  async findAll() {
    return ordemServicoRepository.findAll();
  }

  async findById(id, client) {
    const ordemServico = await ordemServicoRepository.findById(id, client);

    if (!ordemServico) {
      throw new AppError('Ordem de serviço não encontrada.', 404);
    }

    return ordemServico;
  }

  validarDesconto(desconto, valorBase) {
    if (desconto !== undefined && new Prisma.Decimal(desconto).gt(valorBase)) {
      throw new AppError('O desconto não pode ser maior que o valor da ordem de serviço.', 400);
    }
  }

  validarOrdemEditavel(ordemServico) {
    if (['FINALIZADA', 'CANCELADA'].includes(ordemServico.status)) {
      throw new AppError(
        'Não é possível alterar uma ordem de serviço finalizada ou cancelada.',
        400,
      );
    }
  }

  async recalcularValores(id, client) {
    const ordemServico = await this.findById(id, client);

    const valorMaoObra = ordemServico.servicos.reduce(
      (total, item) => total.plus(item.subtotal),
      new Prisma.Decimal(0),
    );

    const valorProdutos = ordemServico.produtos.reduce(
      (total, item) => total.plus(item.subtotal),
      new Prisma.Decimal(0),
    );

    const valorBase = valorMaoObra.plus(valorProdutos);

    if (ordemServico.desconto.gt(valorBase)) {
      throw new AppError('O desconto não pode ser maior que o valor da ordem de serviço.', 400);
    }

    const valorTotal = valorBase.minus(ordemServico.desconto);

    return ordemServicoRepository.updateValores(
      id,
      {
        valorMaoObra,
        valorProdutos,
        valorTotal,
      },
      client,
    );
  }

  async update(id, data) {
    return prisma.$transaction(async (tx) => {
      const ordemServico = await this.findById(id, tx);
      this.validarOrdemEditavel(ordemServico);

      const valorMaoObra = ordemServico.servicos.reduce(
        (total, item) => total.plus(item.subtotal),
        new Prisma.Decimal(0),
      );

      const valorProdutos = ordemServico.produtos.reduce(
        (total, item) => total.plus(item.subtotal),
        new Prisma.Decimal(0),
      );

      const valorBase = valorMaoObra.plus(valorProdutos);

      if (data.desconto !== undefined) {
        this.validarDesconto(data.desconto, valorBase);
      }

      await ordemServicoRepository.update(id, data, tx);

      return this.recalcularValores(id, tx);
    });
  }

  async addServico(id, data) {
    return prisma.$transaction(async (tx) => {
      const ordemServico = await this.findById(id, tx);
      this.validarOrdemEditavel(ordemServico);

      const servico = await servicoRepository.findById(data.servicoId);

      if (!servico || !servico.ativo) {
        throw new AppError('Serviço não encontrado.', 404);
      }

      const precoUnitario = new Prisma.Decimal(servico.preco);
      const subtotal = precoUnitario.mul(data.quantidade);

      const ordemServicoServico = await ordemServicoRepository.addServico(
        {
          ordemServicoId: id,
          servicoId: data.servicoId,
          quantidade: data.quantidade,
          precoUnitario,
          subtotal,
        },
        tx,
      );

      await this.recalcularValores(id, tx);

      return ordemServicoServico;
    });
  }

  async addProduto(id, data) {
    return prisma.$transaction(async (tx) => {
      const ordemServico = await this.findById(id, tx);
      this.validarOrdemEditavel(ordemServico);

      const produto = await produtoRepository.findById(data.produtoId);

      if (!produto || !produto.ativo) {
        throw new AppError('Produto não encontrado.', 404);
      }

      const precoUnitario = new Prisma.Decimal(produto.preco);
      const subtotal = precoUnitario.mul(data.quantidade);

      const ordemServicoProduto = await ordemServicoRepository.addProduto(
        {
          ordemServicoId: id,
          produtoId: data.produtoId,
          quantidade: data.quantidade,
          precoUnitario,
          subtotal,
        },
        tx,
      );

      await this.recalcularValores(id, tx);

      return ordemServicoProduto;
    });
  }

  async removeServico(ordemServicoId, itemId) {
    return prisma.$transaction(async (tx) => {
      const ordemServico = await this.findById(ordemServicoId, tx);
      this.validarOrdemEditavel(ordemServico);

      const servico = ordemServico.servicos.find((item) => item.id === itemId);

      if (!servico) {
        throw new AppError('Serviço não encontrado na ordem de serviço.', 404);
      }

      await ordemServicoRepository.removeServico(itemId, tx);

      return this.recalcularValores(ordemServicoId, tx);
    });
  }

  async removeProduto(ordemServicoId, itemId) {
    return prisma.$transaction(async (tx) => {
      const ordemServico = await this.findById(ordemServicoId, tx);
      this.validarOrdemEditavel(ordemServico);

      const produto = ordemServico.produtos.find((item) => item.id === itemId);

      if (!produto) {
        throw new AppError('Produto não encontrado na ordem de serviço.', 404);
      }

      await ordemServicoRepository.removeProduto(itemId, tx);

      return this.recalcularValores(ordemServicoId, tx);
    });
  }

  async updateStatus(id, status) {
    const ordemServico = await this.findById(id);

    const transicoesPermitidas = {
      ABERTA: ['EM_ANDAMENTO', 'CANCELADA'],
      EM_ANDAMENTO: ['AGUARDANDO_PECAS', 'FINALIZADA', 'CANCELADA'],
      AGUARDANDO_PECAS: ['EM_ANDAMENTO', 'CANCELADA'],
      FINALIZADA: [],
      CANCELADA: [],
    };

    if (!transicoesPermitidas[ordemServico.status].includes(status)) {
      throw new AppError(
        `Não é possível alterar o status de ${ordemServico.status} para ${status}.`,
        400,
      );
    }

    const data = {
      status,
    };

    if (status === 'FINALIZADA') {
      data.dataEntrega = new Date();
    }

    return ordemServicoRepository.updateStatus(id, data);
  }
}

export default new OrdemServicoService();
