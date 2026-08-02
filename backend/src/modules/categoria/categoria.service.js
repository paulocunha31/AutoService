import AppError from '../../errors/AppError.js';
import categoriaRepository from './categoria.repository.js';

class CategoriaService {
  async create(data) {
    const categoriaExistente = await categoriaRepository.findByNome(data.nome);

    if (categoriaExistente) {
      throw new AppError('Categoria já cadastrada.', 409);
    }

    const categoria = await categoriaRepository.create(data);

    return categoria;
  }

  async findAll() {
    return categoriaRepository.findAll();
  }

  async findById(id) {
    const categoria = await categoriaRepository.findById(id);

    if (!categoria || !categoria.ativo) {
      throw new AppError('Categoria não encontrada.', 404);
    }

    return categoria;
  }

  async update(id, data) {
    await this.findById(id);

    if (data.nome) {
      const categoriaExistente = await categoriaRepository.findByNome(data.nome);

      if (categoriaExistente && categoriaExistente.id !== id) {
        throw new AppError('Categoria já cadastrada.', 409);
      }
    }

    const categoria = await categoriaRepository.update(id, data);

    return categoria;
  }

  async deactivate(id) {
    await this.findById(id);

    const categoria = await categoriaRepository.deactivate(id);

    return categoria;
  }
}

export default new CategoriaService();
