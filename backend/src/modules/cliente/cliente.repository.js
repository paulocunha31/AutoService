import prisma from '../../config/database.js';

class ClienteRepository {
  async create(data) {
    return prisma.cliente.create({
      data,
    });
  }

  async findAll() {
    return prisma.cliente.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findById(id) {
    return prisma.cliente.findUnique({
      where: { id },
    });
  }

  async findByCpfCnpj(cpfCnpj) {
    return prisma.cliente.findUnique({
      where: {
        cpfCnpj,
      },
    });
  }

  async update(id, data) {
    return prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async deactivate(id) {
    return prisma.cliente.update({
      where: { id },
      data: {
        ativo: false,
      },
    });
  }
}

export default new ClienteRepository();
