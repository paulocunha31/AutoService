import { success } from '../../helpers/response.js';
import {
  createCategoriaSchema,
  updateCategoriaSchema,
} from '../../validators/categoria.validator.js';
import { idParamSchema } from '../../validators/id.validator.js';
import categoriaService from './categoria.service.js';

class CategoriaController {
  async create(req, res, next) {
    try {
      const data = createCategoriaSchema.parse(req.body);

      const categoria = await categoriaService.create(data);

      return success(res, categoria);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const categorias = await categoriaService.findAll();

      return success(res, categorias);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const categoria = await categoriaService.findById(id);

      return success(res, categoria);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = updateCategoriaSchema.parse(req.body);

      const categoria = await categoriaService.update(id, data);

      return success(res, categoria);
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const categoria = await categoriaService.deactivate(id);

      return success(res, categoria);
    } catch (error) {
      next(error);
    }
  }
}

export default new CategoriaController();
