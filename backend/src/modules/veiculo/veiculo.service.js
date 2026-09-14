import AppError from '../../errors/AppError.js';
import clienteRepository from '../cliente/cliente.repository.js';
import veiculoRepository from './veiculo.repository.js';

class VeiculoService {
  async create(data) {
    const cliente = await clienteRepository.findById(data.clienteId);

    if (!cliente || !cliente.ativo) {
      throw new AppError('Cliente não encontrado.', 404);
    }

    const veiculoExistente = await veiculoRepository.findByPlaca(data.placa);

    if (veiculoExistente) {
      throw new AppError('Placa já cadastrada.', 409);
    }

    const veiculo = await veiculoRepository.create(data);

    return veiculo;
  }

  async findAll() {
    const veiculos = await veiculoRepository.findAll();

    return veiculos;
  }

  async findById(id) {
    const veiculo = await veiculoRepository.findById(id);

    if (!veiculo || !veiculo.ativo) {
      throw new AppError('Veículo não encontrado.', 404);
    }

    return veiculo;
  }

  async update(id, data) {
    const veiculo = await this.findById(id);

    if (data.clienteId && data.clienteId !== veiculo.clienteId) {
      const cliente = await clienteRepository.findById(data.clienteId);

      if (!cliente || !cliente.ativo) {
        throw new AppError('Cliente não encontrado.', 404);
      }
    }

    if (data.placa && data.placa !== veiculo.placa) {
      const placaExistente = await veiculoRepository.findByPlaca(data.placa);

      if (placaExistente) {
        throw new AppError('Placa já cadastrada.', 409);
      }
    }

    return veiculoRepository.update(id, data);
  }

  async deactivate(id) {
    await this.findById(id);

    const veiculo = await veiculoRepository.deactivate(id);

    return veiculo;
  }
}

export default new VeiculoService();
