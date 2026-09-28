import { success } from '../../helpers/response.js';
import { loginSchema } from '../../validators/auth.validator.js';
import authService from './auth.service.js';

class AuthController {
  async login(req, res, next) {
    try {
      const data = loginSchema.parse(req.body);

      const resultado = await authService.login(data.email, data.senha);

      return success(res, resultado, 'Login realizado com sucesso.');
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
