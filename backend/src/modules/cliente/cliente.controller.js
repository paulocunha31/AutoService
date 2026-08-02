import { success } from '../../helpers/response.js';
import { createClienteSchema } from '../../validators/cliente.validator.js';
import { idParamSchema } from '../../validators/id.validator.js';
import clienteService from './cliente.service.js';

class ClienteController {
  async create(req, res, next) {
    try {
      const data = createClienteSchema.parse(req.body);

      const cliente = await clienteService.create(data);

      return success(res, cliente, 'Cliente cadastrado com sucesso.', 201);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const clientes = await clienteService.findAll();

      return success(res, clientes);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const cliente = await clienteService.findById(id);

      return success(res, cliente);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = createClienteSchema.parse(req.body);

      const cliente = await clienteService.update(id, data);

      return success(res, cliente, 'Cliente atualizado com sucesso.');
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      await clienteService.deactivate(id);

      return success(res, null, 'Cliente desativado com sucesso.');
    } catch (error) {
      next(error);
    }
  }
}

export default new ClienteController();
