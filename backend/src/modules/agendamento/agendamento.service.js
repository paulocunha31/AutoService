import AppError from '../../errors/AppError.js';
import agendamentoRepository from '../agendamento/agendamento.repository.js';
import clienteRepository from '../cliente/cliente.repository.js';
import servicoRepository from '../servico/servico.repository.js';
import veiculoRepository from '../veiculo/veiculo.repository.js';

class AgendamentoService {
  async create(data) {
    const cliente = await clienteRepository.findById(data.clienteId);

    if (!cliente || !cliente.ativo) {
      throw new AppError('Cliente não encontrado.', 404);
    }

    const veiculo = await veiculoRepository.findById(data.veiculoId);

    if (!veiculo || !veiculo.ativo) {
      throw new AppError('Veículo não encontrado.', 404);
    }

    if (veiculo.clienteId !== data.clienteId) {
      throw new AppError('O veículo não pertence ao cliente informado.', 400);
    }

    const servico = await servicoRepository.findById(data.servicoId);

    if (!servico || !servico.ativo) {
      throw new AppError('Serviço não encontrado.', 404);
    }

    const agendamento = await agendamentoRepository.create(data);

    return agendamento;
  }

  async findAll() {
    return agendamentoRepository.findAll();
  }

  async findById(id) {
    const agendamento = await agendamentoRepository.findById(id);

    if (!agendamento) {
      throw new AppError('Agendamento não encontrado.', 404);
    }

    return agendamento;
  }

  async update(id, data) {
    const agendamento = await this.findById(id);

    if (data.clienteId) {
      const cliente = await clienteRepository.findById(data.clienteId);

      if (!cliente || !cliente.ativo) {
        throw new AppError('Cliente não encontrado.', 404);
      }
    }

    if (data.veiculoId) {
      const veiculo = await veiculoRepository.findById(data.veiculoId);

      if (!veiculo || !veiculo.ativo) {
        throw new AppError('Veículo não encontrado.', 404);
      }

      const clienteId = data.clienteId ?? agendamento.clienteId;

      if (veiculo.clienteId !== clienteId) {
        throw new AppError('O veículo não pertence ao cliente informado.', 400);
      }
    }

    if (data.servicoId) {
      const servico = await servicoRepository.findById(data.servicoId);

      if (!servico || !servico.ativo) {
        throw new AppError('Serviço não encontrado.', 404);
      }
    }

    const agendamentoAtualizado = await agendamentoRepository.update(id, data);

    return agendamentoAtualizado;
  }

  async cancel(id) {
    await this.findById(id);

    const agendamento = await agendamentoRepository.cancel(id);

    return agendamento;
  }
}

export default new AgendamentoService();
