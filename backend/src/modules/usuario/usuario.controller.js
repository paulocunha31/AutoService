import { success } from '../../helpers/response.js';
import { idParamSchema } from '../../validators/id.validator.js';
import { createUsuarioSchema, updateUsuarioSchema } from '../../validators/usuario.validator.js';
import usuarioService from './usuario.service.js';

class UsuarioController {
  async create(req, res, next) {
    try {
      const data = createUsuarioSchema.parse(req.body);

      const usuario = await usuarioService.create(data);

      return success(res, usuario, 'Usuário cadastrado com sucesso.', 201);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const usuario = await usuarioService.findById(id);

      return success(res, usuario);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      const data = updateUsuarioSchema.parse(req.body);

      const usuario = await usuarioService.update(id, data);

      return success(res, usuario, 'Usuário atualizado com sucesso.');
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req, res, next) {
    try {
      const { id } = idParamSchema.parse(req.params);

      await usuarioService.deactivate(id);

      return success(res, null, 'Usuário desativado com sucesso.');
    } catch (error) {
      next(error);
    }
  }
}
export default new UsuarioController();
