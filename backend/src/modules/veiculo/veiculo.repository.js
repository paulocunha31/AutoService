import prisma from '../../config/database.js';

class VeiculoRepository {
  async create(data) {
    return prisma.veiculo.create({
      data,
    });
  }

  async findAll() {
    return prisma.veiculo.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        modelo: 'asc',
      },
    });
  }

  async findById(id) {
    return prisma.veiculo.findUnique({
      where: { id },
    });
  }

  async findByPlaca(placa) {
    return prisma.veiculo.findUnique({
      where: { placa },
    });
  }

  async update(id, data) {
    return prisma.veiculo.update({
      where: { id },
      data,
    });
  }

  async deactivate(id) {
    return prisma.veiculo.update({
      where: { id },
      data: {
        ativo: false,
      },
    });
  }
}

export default new VeiculoRepository();
