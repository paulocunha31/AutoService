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

  async findById(id, client = prisma) {
    return client.produto.findUnique({
      where: { id },
    });
  }

  async baixarEstoque(id, quantidade, client = prisma) {
    const resultado = await client.produto.updateMany({
      where: {
        id,
        ativo: true,
        estoque: {
          gte: quantidade,
        },
      },
      data: {
        estoque: {
          decrement: quantidade,
        },
      },
    });

    return resultado.count;
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
