import AppError from '../../errors/AppError.js';
import clienteRepository from './cliente.repository.js';

class ClienteService {
  async create(data) {
    if (data.cpfCnpj) {
      const clienteExistente = await clienteRepository.findByCpfCnpj(data.cpfCnpj);

      if (clienteExistente) {
        throw new AppError('CPF/CNPJ já cadastrado.', 409);
      }
    }

    const cliente = await clienteRepository.create(data);

    return cliente;
  }

  async findAll() {
    const clientes = await clienteRepository.findAll();

    return clientes;
  }

  async findById(id) {
    const cliente = await clienteRepository.findById(id);

    if (!cliente || !cliente.ativo) {
      throw new AppError('Cliente não encontrado.', 404);
    }

    return cliente;
  }

  async update(id, data) {
    await this.findById(id);

    if (data.cpfCnpj) {
      const clienteExistente = await clienteRepository.findByCpfCnpj(data.cpfCnpj);

      if (clienteExistente && clienteExistente.id !== id) {
        throw new AppError('CPF/CNPJ já cadastrado.', 409);
      }
    }

    const cliente = await clienteRepository.update(id, data);

    return cliente;
  }

  async deactivate(id) {
    await this.findById(id);

    const cliente = await clienteRepository.deactivate(id);

    return cliente;
  }
}

export default new ClienteService();
