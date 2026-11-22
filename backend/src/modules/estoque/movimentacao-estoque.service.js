import AppError from '../../errors/AppError.js';
import movimentacaoEstoqueRepository from './movimentacao-estoque.repository.js';

class MovimentacaoEstoqueService {
  async findAll(filters = {}) {
    return movimentacaoEstoqueRepository.findAll(filters);
  }

  async findById(id) {
    const movimentacao = await movimentacaoEstoqueRepository.findById(id);

    if (!movimentacao) {
      throw new AppError('Movimentação de estoque não encontrada.', 404);
    }

    return movimentacao;
  }
}

export default new MovimentacaoEstoqueService();
