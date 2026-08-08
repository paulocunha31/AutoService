import prisma from '../../config/database.js';

class ProdutoRepository {
  async create(data) {
    return prisma.produto.create({
      data,
    });
  }

  async findAll() {
    return prisma.produto.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });
  }

  async findById(id) {
    return prisma.produto.findUnique({
      where: { id },
    });
  }

  async findByNome(nome) {
    return prisma.produto.findFirst({
      where: { nome },
    });
  }

  async update(id, data) {
    return prisma.produto.update({
      where: { id },
      data,
    });
  }

  async deactivate(id) {
    return prisma.produto.update({
      where: { id },
      data: {
        ativo: false,
      },
    });
  }
}

export default new ProdutoRepository();
