import prisma from '../../config/database.js';

const defaultIncludes = {
  cliente: true,
  veiculo: true,
  servico: true,
};

class AgendamentoRepository {
  async create(data) {
    return prisma.agendamento.create({
      data,
      include: defaultIncludes,
    });
  }

  async findAll() {
    return prisma.agendamento.findMany({
      include: defaultIncludes,
      orderBy: {
        data: 'asc',
      },
    });
  }

  async findById(id) {
    return prisma.agendamento.findUnique({
      where: { id },
      include: defaultIncludes,
    });
  }

  async update(id, data) {
    return prisma.agendamento.update({
      where: { id },
      data,
      include: defaultIncludes,
    });
  }

  async cancel(id) {
    return prisma.agendamento.update({
      where: { id },
      data: {
        status: 'CANCELADO',
      },
      include: defaultIncludes,
    });
  }
}

export default new AgendamentoRepository();
