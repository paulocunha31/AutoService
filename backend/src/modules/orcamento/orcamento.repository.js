import prisma from '../../config/database.js';

class OrcamentoRepository {
  async create(data, client = prisma) {
    return client.orcamento.create({
      data,
    });
  }

  async findAll(client = prisma) {
    return client.orcamento.findMany({
      include: {
        cliente: true,
        veiculo: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id, client = prisma) {
    return client.orcamento.findUnique({
      where: {
        id,
      },
      include: {
        cliente: true,
        veiculo: true,
        servicos: {
          include: {
            servico: true,
          },
        },
        produtos: {
          include: {
            produto: true,
          },
        },
      },
    });
  }

  async addServico(data, client = prisma) {
    return client.orcamentoServico.create({
      data,
    });
  }

  async addProduto(data, client = prisma) {
    return client.orcamentoProduto.create({
      data,
    });
  }

  async removeServico(id, client = prisma) {
    return client.orcamentoServico.delete({
      where: { id },
    });
  }

  async removeProduto(id, client = prisma) {
    return client.orcamentoProduto.delete({
      where: { id },
    });
  }

  async updateValores(id, data, client = prisma) {
    return client.orcamento.update({
      where: { id },
      data: {
        valorMaoObra: data.valorMaoObra,
        valorProdutos: data.valorProdutos,
        valorTotal: data.valorTotal,
      },
    });
  }

  async update(id, data, client = prisma) {
    return client.orcamento.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateStatus(id, status, client = prisma) {
    return client.orcamento.update({
      where: { id },
      data: { status },
    });
  }
}

export default new OrcamentoRepository();
