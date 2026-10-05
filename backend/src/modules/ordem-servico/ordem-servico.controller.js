import AppError from '../../errors/AppError.js';
import { success } from '../../helpers/response.js';
import { idParamSchema } from '../../validators/id.validator.js';
import {
  addProdutoOrdemServicoSchema,
  addServicoOrdemServicoSchema,
  createOrdemServicoSchema,
  updateOrdemServicoSchema,
  updateStatusOrdemServicoSchema,
} from '../../validators/ordem-servico.validator.js';
import ordemServicoService from './ordem-servico.service.js';

class OrdemServicoController {
  async create(req, res, next) {
    try {
      const data = createOrdemServicoSchema.parse(req.body);

      const ordemServico = await ordemServicoService.create(data);

      return success(res, ordemServico, 'Ordem de serviço criada com sucesso.', 201);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const ordensServico = await ordemServicoService.findAll();

      return success(res, ordensServico);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const ordemServico = await ordemServicoService.findById(id);

      return success(res, ordemServico);
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = updateOrdemServicoSchema.parse(req.body);

      const ordemServico = await ordemServicoService.update(id, data);

      return success(res, ordemServico, 'Ordem de serviço atualizada com sucesso.');
    } catch (error) {
      next(error);
    }
  }
  async updateStatus(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const { status } = updateStatusOrdemServicoSchema.parse(req.body);

      const ordemServico = await ordemServicoService.updateStatus(id, status);

      return success(res, ordemServico, 'Status da ordem de serviço atualizado com sucesso.');
    } catch (error) {
      next(error);
    }
  }

  async addServico(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = addServicoOrdemServicoSchema.parse(req.body);

      const servico = await ordemServicoService.addServico(id, data);

      return success(res, servico, 'Serviço adicionado à ordem de serviço com sucesso.', 201);
    } catch (error) {
      next(error);
    }
  }

  async addProduto(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = addProdutoOrdemServicoSchema.parse(req.body);

      const produto = await ordemServicoService.addProduto(id, data);

      return success(res, produto, 'Produto adicionado à ordem de serviço com sucesso.', 201);
    } catch (error) {
      next(error);
    }
  }

  async removeServico(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const itemId = Number(req.params.itemId);

      if (!Number.isInteger(itemId) || itemId <= 0) {
        throw new AppError('ID do serviço inválido.', 400);
      }

      const ordemServico = await ordemServicoService.removeServico(id, itemId);

      return success(res, ordemServico, 'Serviço removido da ordem de serviço com sucesso.');
    } catch (error) {
      next(error);
    }
  }

  async removeProduto(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const itemId = Number(req.params.itemId);

      if (!Number.isInteger(itemId) || itemId <= 0) {
        throw new AppError('ID do produto inválido.', 400);
      }

      const ordemServico = await ordemServicoService.removeProduto(id, itemId);

      return success(res, ordemServico, 'Produto removido da ordem de serviço com sucesso.');
    } catch (error) {
      next(error);
    }
  }
}

export default new OrdemServicoController();
