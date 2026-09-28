import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AppError from '../../errors/AppError.js';
import usuarioRepository from '../usuario/usuario.repository.js';

class AuthService {
  async login(email, senha) {
    const usuario = await usuarioRepository.findByEmail(email);

    if (!usuario || !usuario.ativo) {
      throw new AppError('E-mail ou senha inválidos.', 401);
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new AppError('E-mail ou senha inválidos.', 401);
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return { token };
  }
}

export default new AuthService();
