import prisma from '../../config/database.js';

class CategoriaRepository {
  async create(data) {
    return prisma.categoria.create({
      data,
    });
  }

  async findAll() {
    return prisma.categoria.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findById(id) {
    return prisma.categoria.findUnique({
      where: { id },
    });
  }

  async findByNome(nome) {
    return prisma.categoria.findUnique({
      where: { nome },
    });
  }

  async update(id, data) {
    return prisma.categoria.update({
      where: { id },
      data,
    });
  }

  async deactivate(id) {
    return prisma.categoria.update({
      where: { id },
      data: {
        ativo: false,
      },
    });
  }
}

export default new CategoriaRepository();
