import prisma from '../../config/database.js';

class MovimentacaoEstoqueRepository {
  async findAll(filters = {}) {
    const { produtoId, usuarioId, ordemServicoId, tipo, dataInicial, dataFinal } = filters;

    return prisma.movimentacaoEstoque.findMany({
      where: {
        ...(produtoId && { produtoId }),
        ...(usuarioId && { usuarioId }),
        ...(ordemServicoId && { ordemServicoId }),
        ...(tipo && { tipo }),
        ...(dataInicial || dataFinal
          ? {
              createdAt: {
                ...(dataInicial && { gte: dataInicial }),
                ...(dataFinal && {
                  lt: new Date(new Date(dataFinal).setDate(new Date(dataFinal).getDate() + 1)),
                }),
              },
            }
          : {}),
      },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
          },
        },
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        ordemServico: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id) {
    return prisma.movimentacaoEstoque.findUnique({
      where: { id },
      include: {
        produto: true,
        usuario: {
          select: {
            id: true,
            nome: true,
          },
        },
        ordemServico: {
          select: {
            id: true,
          },
        },
      },
    });
  }
}

export default new MovimentacaoEstoqueRepository();
