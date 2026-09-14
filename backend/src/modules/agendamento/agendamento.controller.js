import { success } from '../../helpers/response.js';
import {
  createAgendamentoSchema,
  updateAgendamentoSchema,
} from '../../validators/agendamento.validator.js';
import { idParamSchema } from '../../validators/id.validator.js';
import agendamentoService from './agendamento.service.js';

class AgendamentoController {
  async create(req, res, next) {
    try {
      const data = createAgendamentoSchema.parse(req.body);

      const agendamento = await agendamentoService.create(data);

      return success(res, agendamento, 201);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const agendamentos = await agendamentoService.findAll();

      return success(res, agendamentos);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const agendamento = await agendamentoService.findById(id);

      return success(res, agendamento);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = updateAgendamentoSchema.parse(req.body);

      const agendamento = await agendamentoService.update(id, data);

      return success(res, agendamento);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const agendamento = await agendamentoService.cancel(id);

      return success(res, agendamento);
    } catch (error) {
      next(error);
    }
  }
}

export default new AgendamentoController();
