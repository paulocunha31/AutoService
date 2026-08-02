import { success } from '../../helpers/response.js';
import { idParamSchema } from '../../validators/id.validator.js';
import { createVeiculoSchema } from '../../validators/veiculo.validator.js';
import veiculoService from './veiculo.service.js';

class VeiculoController {
  async create(req, res, next) {
    try {
      const data = createVeiculoSchema.parse(req.body);

      const veiculo = await veiculoService.create(data);

      return success(res, veiculo, 201);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const veiculos = await veiculoService.findAll();

      return success(res, veiculos);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const veiculo = await veiculoService.findById(id);

      return success(res, veiculo);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const veiculo = await veiculoService.update(id, req.body);

      return success(res, veiculo);
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const veiculo = await veiculoService.deactivate(id);

      return success(res, veiculo);
    } catch (error) {
      next(error);
    }
  }
}

export default new VeiculoController();
