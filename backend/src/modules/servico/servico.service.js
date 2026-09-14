import AppError from '../../errors/AppError.js';
import categoriaRepository from '../categoria/categoria.repository.js';
import servicoRepository from './servico.repository.js';

class ServicoService {
  async create(data) {
    const categoria = await categoriaRepository.findById(data.categoriaId);

    if (!categoria || !categoria.ativo) {
      throw new AppError('Categoria não encontrada.', 404);
    }

    const servicoExistente = await servicoRepository.findByNome(data.nome);

    if (servicoExistente) {
      throw new AppError('Serviço já cadastrado.', 409);
    }

    const servico = await servicoRepository.create(data);

    return servico;
  }

  async findAll() {
    return servicoRepository.findAll();
  }

  async findById(id) {
    const servico = await servicoRepository.findById(id);

    if (!servico || !servico.ativo) {
      throw new AppError('Serviço não encontrado.', 404);
    }

    return servico;
  }

  async update(id, data) {
    await this.findById(id);

    if (data.categoriaId) {
      const categoria = await categoriaRepository.findById(data.categoriaId);

      if (!categoria || !categoria.ativo) {
        throw new AppError('Categoria não encontrada.', 404);
      }
    }

    if (data.nome) {
      const servicoExistente = await servicoRepository.findByNome(data.nome);

      if (servicoExistente && servicoExistente.id !== id) {
        throw new AppError('Serviço já cadastrado.', 409);
      }
    }

    const servico = await servicoRepository.update(id, data);

    return servico;
  }

  async deactivate(id) {
    await this.findById(id);

    const servico = await servicoRepository.deactivate(id);

    return servico;
  }
}

export default new ServicoService();
