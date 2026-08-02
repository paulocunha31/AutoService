import prisma from '../../config/database.js';

class ServicoRepository {
  async create(data) {
    return prisma.servico.create({
      data,
    });
  }

  async findAll() {
    return prisma.servico.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findById(id) {
    return prisma.servico.findUnique({
      where: { id },
    });
  }

  async findByNome(nome) {
    return prisma.servico.findFirst({
      where: { nome },
    });
  }

  async update(id, data) {
    return prisma.servico.update({
      where: { id },
      data,
    });
  }

  async deactivate(id) {
    return prisma.servico.update({
      where: { id },
      data: {
        ativo: false,
      },
    });
  }
}

export default new ServicoRepository();
