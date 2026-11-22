import { success } from '../../helpers/response.js';
import { idParamSchema } from '../../validators/id.validator.js';
import { movimentacaoEstoqueSchema } from '../../validators/movimentacao-estoque.validator.js';
import movimentacaoEstoqueService from './movimentacao-estoque.service.js';

class MovimentacaoEstoqueController {
  async findAll(req, res, next) {
    try {
      const filtros = movimentacaoEstoqueSchema.parse(req.query);
      const movimentacoes = await movimentacaoEstoqueService.findAll(filtros);

      return success(res, movimentacoes, 'Movimentações de estoque listadas com sucesso.');
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const movimentacao = await movimentacaoEstoqueService.findById(id);

      return success(res, movimentacao, 'Movimentação de estoque encontrada com sucesso.');
    } catch (error) {
      next(error);
    }
  }
}

export default new MovimentacaoEstoqueController();
