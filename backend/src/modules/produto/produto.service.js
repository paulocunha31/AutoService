import AppError from '../../errors/AppError.js';
import categoriaRepository from '../categoria/categoria.repository.js';
import produtoRepository from './produto.repository.js';

class ProdutoService {
  async create(data) {
    const categoria = await categoriaRepository.findById(data.categoriaId);

    if (!categoria || !categoria.ativo) {
      throw new AppError('Categoria não encontrada.', 404);
    }

    const produtoExistente = await produtoRepository.findByNome(data.nome);

    if (produtoExistente) {
      throw new AppError('Produto já cadastrado.', 409);
    }

    const produto = await produtoRepository.create(data);

    return produto;
  }

  async findAll() {
    return produtoRepository.findAll();
  }

  async findById(id) {
    const produto = await produtoRepository.findById(id);

    if (!produto || !produto.ativo) {
      throw new AppError('Produto não encontrado.', 404);
    }

    return produto;
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
      const produtoExistente = await produtoRepository.findByNome(data.nome);

      if (produtoExistente && produtoExistente.id !== id) {
        throw new AppError('Produto já cadastrado.', 409);
      }
    }

    const produto = await produtoRepository.update(id, data);

    return produto;
  }

  async deactivate(id) {
    await this.findById(id);

    const produto = await produtoRepository.deactivate(id);

    return produto;
  }
}

export default new ProdutoService();
