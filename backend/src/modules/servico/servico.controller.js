import { success } from '../../helpers/response.js';
import { idParamSchema } from '../../validators/id.validator.js';
import { createServicoSchema, updateServicoSchema } from '../../validators/servico.validator.js';
import servicoService from './servico.service.js';

class ServicoController {
  async create(req, res, next) {
    try {
      const data = createServicoSchema.parse(req.body);

      const servico = await servicoService.create(data);

      return success(res, servico, 201);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const servicos = await servicoService.findAll();

      return success(res, servicos);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const servico = await servicoService.findById(id);

      return success(res, servico);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = updateServicoSchema.parse(req.body);

      const servico = await servicoService.update(id, data);

      return success(res, servico);
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const servico = await servicoService.deactivate(id);

      return success(res, servico);
    } catch (error) {
      next(error);
    }
  }
}

export default new ServicoController();
