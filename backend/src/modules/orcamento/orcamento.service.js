import { Prisma } from '@prisma/client';

import prisma from '../../config/database.js';
import AppError from '../../errors/AppError.js';
import clienteRepository from '../cliente/cliente.repository.js';
import produtoRepository from '../produto/produto.repository.js';
import servicoRepository from '../servico/servico.repository.js';
import veiculoRepository from '../veiculo/veiculo.repository.js';
import orcamentoRepository from './orcamento.repository.js';

class OrcamentoService {
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

    return orcamentoRepository.create(data);
  }

  async findAll() {
    return orcamentoRepository.findAll();
  }

  async findById(id, client) {
    const orcamento = await orcamentoRepository.findById(id, client);

    if (!orcamento) {
      throw new AppError('Orçamento não encontrado.', 404);
    }

    return orcamento;
  }

  validarOrcamentoEditavel(orcamento) {
    if (['REJEITADO', 'EXPIRADO'].includes(orcamento.status)) {
      throw new AppError('Não é possível alterar um orçamento rejeitado ou expirado.', 400);
    }
  }

  validarDesconto(desconto, valorBase) {
    if (desconto !== undefined && new Prisma.Decimal(desconto).gt(valorBase)) {
      throw new AppError('O desconto não pode ser maior que o valor do orçamento.', 400);
    }
  }

  async recalcularValores(id, client = prisma) {
    const orcamento = await this.findById(id, client);

    const valorMaoObra = orcamento.servicos.reduce(
      (total, item) => total.plus(item.subtotal),
      new Prisma.Decimal(0),
    );

    const valorProdutos = orcamento.produtos.reduce(
      (total, item) => total.plus(item.subtotal),
      new Prisma.Decimal(0),
    );

    const valorBase = valorMaoObra.plus(valorProdutos);

    if (orcamento.desconto.gt(valorBase)) {
      throw new AppError('O desconto não pode ser maior que o valor do orçamento.', 400);
    }

    const valorTotal = valorBase.minus(orcamento.desconto);

    return orcamentoRepository.updateValores(
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
      const orcamento = await this.findById(id, tx);

      this.validarOrcamentoEditavel(orcamento);

      const dadosAtualizacao = {
        validade: data.validade,
        observacoes: data.observacoes,
      };

      if (data.desconto !== undefined) {
        dadosAtualizacao.desconto = new Prisma.Decimal(data.desconto);
      }

      Object.keys(dadosAtualizacao).forEach((key) => {
        if (dadosAtualizacao[key] === undefined) {
          delete dadosAtualizacao[key];
        }
      });

      await orcamentoRepository.update(id, dadosAtualizacao, tx);

      await this.recalcularValores(id, tx);

      return this.findById(id, tx);
    });
  }

  async addServico(id, data) {
    return prisma.$transaction(async (tx) => {
      const orcamento = await this.findById(id, tx);

      this.validarOrcamentoEditavel(orcamento);

      const servico = await servicoRepository.findById(data.servicoId);

      if (!servico || !servico.ativo) {
        throw new AppError('Serviço não encontrado.', 404);
      }

      const quantidade = data.quantidade;
      const precoUnitario = new Prisma.Decimal(servico.preco);
      const subtotal = precoUnitario.mul(quantidade);

      await orcamentoRepository.addServico(
        {
          orcamentoId: id,
          servicoId: servico.id,
          quantidade,
          precoUnitario,
          subtotal,
        },
        tx,
      );

      await this.recalcularValores(id, tx);

      return this.findById(id, tx);
    });
  }

  async addProduto(id, data) {
    return prisma.$transaction(async (tx) => {
      const orcamento = await this.findById(id, tx);
      this.validarOrcamentoEditavel(orcamento);

      const produto = await produtoRepository.findById(data.produtoId);

      if (!produto || !produto.ativo) {
        throw new AppError('Produto não encontrado.', 404);
      }

      const quantidade = data.quantidade;
      const precoUnitario = new Prisma.Decimal(produto.preco);
      const subtotal = precoUnitario.mul(quantidade);

      await orcamentoRepository.addProduto(
        {
          orcamentoId: id,
          produtoId: produto.id,
          quantidade,
          precoUnitario,
          subtotal,
        },
        tx,
      );

      await this.recalcularValores(id, tx);

      return this.findById(id, tx);
    });
  }

  async removeServico(id, itemId) {
    return prisma.$transaction(async (tx) => {
      const orcamento = await this.findById(id, tx);

      this.validarOrcamentoEditavel(orcamento);

      const servico = orcamento.servicos.find((item) => item.id === itemId);

      if (!servico) {
        throw new AppError('Serviço não encontrado neste orçamento.', 404);
      }

      await orcamentoRepository.removeServico(itemId, tx);

      await this.recalcularValores(id, tx);

      return this.findById(id, tx);
    });
  }

  async removeProduto(id, itemId) {
    return prisma.$transaction(async (tx) => {
      const orcamento = await this.findById(id, tx);

      this.validarOrcamentoEditavel(orcamento);

      const produto = orcamento.produtos.find((item) => item.id === itemId);

      if (!produto) {
        throw new AppError('Produto não encontrado neste orçamento.', 404);
      }

      await orcamentoRepository.removeProduto(itemId, tx);

      await this.recalcularValores(id, tx);

      return this.findById(id, tx);
    });
  }

  async updateStatus(id, novoStatus) {
    return prisma.$transaction(async (tx) => {
      const orcamento = await this.findById(id, tx);

      if (
        novoStatus === 'APROVADO' &&
        orcamento.servicos.length === 0 &&
        orcamento.produtos.length === 0
      ) {
        throw new AppError(
          'Adicione pelo menos um serviço ou produto antes de aprovar o orçamento.',
        );
      }

      const transicoesPermitidas = {
        PENDENTE: ['APROVADO', 'REJEITADO', 'EXPIRADO'],
        APROVADO: ['REJEITADO'],
        REJEITADO: [],
        EXPIRADO: [],
      };

      if (!transicoesPermitidas[orcamento.status].includes(novoStatus)) {
        throw new AppError(
          `Não é possível alterar o status de ${orcamento.status} para ${novoStatus}.`,
          400,
        );
      }

      await orcamentoRepository.updateStatus(id, novoStatus, tx);

      return this.findById(id, tx);
    });
  }
}

export default new OrcamentoService();
