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

  async findById(id) {
    return prisma.ordemServico.findUnique({
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

  async addServico(data) {
    return prisma.ordemServicoServico.create({
      data,
    });
  }

  async addProduto(data) {
    return prisma.ordemServicoProduto.create({
      data,
    });
  }

  async removeServico(id) {
    return prisma.ordemServicoServico.delete({
      where: { id },
    });
  }

  async removeProduto(id) {
    return prisma.ordemServicoProduto.delete({
      where: { id },
    });
  }

  async updateValores(id, data) {
    return prisma.ordemServico.update({
      where: { id },
      data: {
        valorMaoObra: data.valorMaoObra,
        valorProdutos: data.valorProdutos,
        valorTotal: data.valorTotal,
      },
    });
  }

  async update(id, data) {
    return prisma.ordemServico.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateStatus(id, status) {
    return prisma.ordemServico.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}

export default new OrdemServicoRepository();
