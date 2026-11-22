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

    this.validarDatas(data.dataEntrada ?? new Date(), data.dataEntregaPrevista);

    this.validarDesconto(data.desconto, new Prisma.Decimal(0));

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
    if (desconto === undefined) return;

    const valorDesconto = new Prisma.Decimal(desconto);

    if (valorDesconto.lt(0)) {
      throw new AppError('O desconto não pode ser negativo.', 400);
    }

    if (valorDesconto.gt(valorBase)) {
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

  validarDatas(dataEntrada, dataEntregaPrevista) {
    const entrada = new Date(dataEntrada);

    if (Number.isNaN(entrada.getTime())) {
      throw new AppError('A data de entrada é inválida.', 400);
    }

    if (!dataEntregaPrevista) return;

    const entregaPrevista = new Date(dataEntregaPrevista);

    if (Number.isNaN(entregaPrevista.getTime())) {
      throw new AppError('A data prevista de entrega é inválida.', 400);
    }

    if (entregaPrevista < entrada) {
      throw new AppError(
        'A data prevista de entrega não pode ser anterior à data de entrada.',
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

      this.validarDatas(
        data.dataEntrada ?? ordemServico.dataEntrada,
        data.dataEntregaPrevista ?? ordemServico.dataEntregaPrevista,
      );

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

      const servico = await servicoRepository.findById(data.servicoId, tx);

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

      const produto = await produtoRepository.findById(data.produtoId, tx);

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

  async updateStatus(id, status, usuarioId) {
    return prisma.$transaction(async (tx) => {
      const ordemServico = await this.findById(id, tx);

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

      if (
        status === 'FINALIZADA' &&
        ordemServico.servicos.length === 0 &&
        ordemServico.produtos.length === 0
      ) {
        throw new AppError(
          'Não é possível finalizar uma ordem de serviço sem serviços ou produtos.',
          400,
        );
      }

      if (status === 'FINALIZADA') {
        for (const item of ordemServico.produtos) {
          const produto = await produtoRepository.findById(item.produtoId, tx);

          if (!produto || !produto.ativo) {
            throw new AppError(
              `Estoque insuficiente ou produto indisponível (ID: ${item.produtoId}).`,
              400,
            );
          }

          const estoqueAnterior = produto.estoque;

          const estoqueAtualizado = await produtoRepository.baixarEstoque(
            item.produtoId,
            item.quantidade,
            tx,
          );

          if (estoqueAtualizado === 0) {
            throw new AppError(
              `Estoque insuficiente ou produto indisponível (ID: ${item.produtoId}).`,
              400,
            );
          }

          await tx.movimentacaoEstoque.create({
            data: {
              produtoId: item.produtoId,
              usuarioId,
              ordemServicoId: id,
              tipo: 'SAIDA',
              quantidade: item.quantidade,
              estoqueAnterior,
              estoqueAtual: estoqueAnterior - item.quantidade,
              observacao: `Consumo de produto na OS #${id}`,
            },
          });
        }
      }

      const data = {
        status,
      };

      if (status === 'FINALIZADA') {
        data.dataEntrega = new Date();
      }

      return ordemServicoRepository.updateStatus(id, data, tx);
    });
  }
}

export default new OrdemServicoService();
