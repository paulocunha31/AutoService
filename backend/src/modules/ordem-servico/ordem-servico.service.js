import { Prisma } from '@prisma/client';

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

  async findById(id) {
    const ordemServico = await ordemServicoRepository.findById(id);

    if (!ordemServico) {
      throw new AppError('Ordem de serviço não encontrada.', 404);
    }

    return ordemServico;
  }

  async recalcularValores(id) {
    const ordemServico = await this.findById(id);

    const valorMaoObra = ordemServico.servicos.reduce(
      (total, item) => total.plus(item.subtotal),
      new Prisma.Decimal(0),
    );

    const valorProdutos = ordemServico.produtos.reduce(
      (total, item) => total.plus(item.subtotal),
      new Prisma.Decimal(0),
    );

    const valorTotal = valorMaoObra.plus(valorProdutos).minus(ordemServico.desconto);

    return ordemServicoRepository.updateValores(id, {
      valorMaoObra,
      valorProdutos,
      valorTotal,
    });
  }

  async update(id, data) {
    await this.findById(id);

    await ordemServicoRepository.update(id, data);

    return this.recalcularValores(id);
  }

  async addServico(id, data) {
    const ordemServico = await this.findById(id);

    if (ordemServico.status === 'FINALIZADA') {
      throw new AppError(
        'Não é possível adicionar serviço em uma ordem de serviço finalizada.',
        400,
      );
    }

    const servico = await servicoRepository.findById(data.servicoId);

    if (!servico || !servico.ativo) {
      throw new AppError('Serviço não encontrado.', 404);
    }

    const precoUnitario = servico.preco;
    const subtotal = precoUnitario.mul(data.quantidade);

    const ordemServicoServico = await ordemServicoRepository.addServico({
      ordemServicoId: id,
      servicoId: data.servicoId,
      quantidade: data.quantidade,
      precoUnitario,
      subtotal,
    });

    await this.recalcularValores(id);

    return ordemServicoServico;
  }

  async addProduto(id, data) {
    const ordemServico = await this.findById(id);

    if (ordemServico.status === 'FINALIZADA' || ordemServico.status === 'CANCELADA') {
      throw new AppError(
        'Não é possível adicionar produtos a uma ordem de serviço finalizada ou cancelada',
        400,
      );
    }

    const produto = await produtoRepository.findById(data.produtoId);

    if (!produto || !produto.ativo) {
      throw new AppError('Produto não encontrado.', 404);
    }

    const precoUnitario = produto.preco;
    const subtotal = precoUnitario.mul(data.quantidade);

    const ordemServicoProduto = await ordemServicoRepository.addProduto({
      ordemServicoId: id,
      produtoId: data.produtoId,
      quantidade: data.quantidade,
      precoUnitario,
      subtotal,
    });

    await this.recalcularValores(id);

    return ordemServicoProduto;
  }

  async removeServico(ordemServicoId, itemId) {
    const ordemServico = await this.findById(ordemServicoId);

    if (ordemServico.status === 'FINALIZADA' || ordemServico.status === 'CANCELADA') {
      throw new AppError(
        'Não é possível remover serviço de uma ordem de serviço finalizada ou cancelada.',
        400,
      );
    }

    const servico = ordemServico.servicos.find((item) => item.id === itemId);

    if (!servico) {
      throw new AppError('Serviço não encontrado na ordem de serviço.', 404);
    }

    await ordemServicoRepository.removeServico(itemId);

    return this.recalcularValores(ordemServicoId);
  }

  async removeProduto(ordemServicoId, itemId) {
    const ordemServico = await this.findById(ordemServicoId);

    if (ordemServico.status === 'FINALIZADA' || ordemServico.status === 'CANCELADA') {
      throw new AppError(
        'Não é possível remover produtos de uma ordem de serviço finalizada ou cancelada.',
        400,
      );
    }

    const produto = ordemServico.produtos.find((item) => item.id === itemId);

    if (!produto) {
      throw new AppError('Produto não encontrado na ordem de serviço.', 404);
    }

    await ordemServicoRepository.removeProduto(itemId);

    return this.recalcularValores(ordemServicoId);
  }

  async updateStatus(id, status) {
    await this.findById(id);

    return ordemServicoRepository.updateStatus(id, status);
  }
}

export default new OrdemServicoService();
