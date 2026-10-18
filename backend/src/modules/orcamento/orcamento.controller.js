import AppError from '../../errors/AppError.js';
import { success } from '../../helpers/response.js';
import { idParamSchema } from '../../validators/id.validator.js';
import {
  addProdutoOrcamentoSchema,
  addServicoOrcamentoSchema,
  createOrcamentoSchema,
  updateOrcamentoSchema,
  updateStatusOrcamentoSchema,
} from '../../validators/orcamento.validator.js';
import orcamentoService from './orcamento.service.js';

class OrcamentoController {
  async create(req, res, next) {
    try {
      const data = createOrcamentoSchema.parse(req.body);

      const orcamento = await orcamentoService.create(data);

      return success(res, orcamento, 'Orçamento criado com sucesso.', 201);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const orcamentos = await orcamentoService.findAll();

      return success(res, orcamentos);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const orcamento = await orcamentoService.findById(id);

      return success(res, orcamento);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = updateOrcamentoSchema.parse(req.body);

      const orcamento = await orcamentoService.update(id, data);

      return success(res, orcamento, 'Orçamento atualizado com sucesso.');
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const { status } = updateStatusOrcamentoSchema.parse(req.body);

      const orcamento = await orcamentoService.updateStatus(id, status);

      return success(res, orcamento, 'Status do orçamento atualizado com sucesso.');
    } catch (error) {
      next(error);
    }
  }

  async addServico(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = addServicoOrcamentoSchema.parse(req.body);

      const orcamento = await orcamentoService.addServico(id, data);

      return success(res, orcamento, 'Servico adicionado ao orçamento com sucesso.', 201);
    } catch (error) {
      next(error);
    }
  }

  async addProduto(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const data = addProdutoOrcamentoSchema.parse(req.body);

      const orcamento = await orcamentoService.addProduto(id, data);

      return success(res, orcamento, 'Produto adicionado ao orçamento com sucesso.', 201);
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

      const orcamento = await orcamentoService.removeServico(id, itemId);

      return success(res, orcamento, 'Serviço removido do orçamento com sucesso.');
    } catch (error) {
      next(error);
    }
  }

  async removeProduto(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const itemId = Number(req.params.itemId);

      if (!Number.isInteger(itemId) || itemId <= 0) {
        throw new AppError('ID do Produto inválido.', 400);
      }

      const orcamento = await orcamentoService.removeProduto(id, itemId);

      return success(res, orcamento, 'Produto removido do orçamento com sucesso.');
    } catch (error) {
      next(error);
    }
  }
}

export default new OrcamentoController();
