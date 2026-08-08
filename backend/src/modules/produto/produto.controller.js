import { success } from '../../helpers/response.js';
import { idParamSchema } from '../../validators/id.validator.js';
import { createProdutoSchema, updateProdutoSchema } from '../../validators/produto.validator.js';
import produtoService from './produto.service.js';

class ProdutoController {
  async create(req, res, next) {
    try {
      const data = createProdutoSchema.parse(req.body);

      const produto = await produtoService.create(data);

      return success(res, produto, 201);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const produtos = await produtoService.findAll();

      return success(res, produtos);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const produto = await produtoService.findById(id);

      return success(res, produto);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = updateProdutoSchema.parse(req.body);

      const produto = await produtoService.update(id, data);

      return success(res, produto);
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const produto = await produtoService.deactivate(id);

      return success(res, produto);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProdutoController();
