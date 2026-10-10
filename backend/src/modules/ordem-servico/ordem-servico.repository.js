import prisma from '../../config/database.js';

class OrdemServicoRepository {
  async create(data) {
    return prisma.ordemServico.create({
      data,
    });
  }

  async findAll() {
    return prisma.ordemServico.findMany({
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
    return client.ordemServico.findUnique({
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
    return client.ordemServicoServico.create({
      data,
    });
  }

  async addProduto(data, client = prisma) {
    return client.ordemServicoProduto.create({
      data,
    });
  }

  async removeServico(id, client = prisma) {
    return client.ordemServicoServico.delete({
      where: { id },
    });
  }

  async removeProduto(id, client = prisma) {
    return client.ordemServicoProduto.delete({
      where: { id },
    });
  }

  async updateValores(id, data, client = prisma) {
    return client.ordemServico.update({
      where: { id },
      data: {
        valorMaoObra: data.valorMaoObra,
        valorProdutos: data.valorProdutos,
        valorTotal: data.valorTotal,
      },
    });
  }

  async update(id, data, client = prisma) {
    return client.ordemServico.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateStatus(id, data) {
    return prisma.ordemServico.update({
      where: {
        id,
      },
      data,
    });
  }
}

export default new OrdemServicoRepository();
