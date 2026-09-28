import bcrypt from 'bcrypt';

import AppError from '../../errors/AppError.js';
import usuarioRepository from './usuario.repository.js';

class UsuarioService {
  formatarUsuario(usuario) {
    const { senha, ...usuarioSemSenha } = usuario;

    return usuarioSemSenha;
  }

  async create(data) {
    const usuarioExistente = await usuarioRepository.findByEmail(data.email);

    if (usuarioExistente) {
      throw new AppError('E-mail já cadastrado.', 409);
    }

    const senhaHash = await bcrypt.hash(data.senha, 10);

    const usuario = await usuarioRepository.create({ ...data, senha: senhaHash });

    return this.formatarUsuario(usuario);
  }

  async findById(id) {
    const usuario = await usuarioRepository.findById(id);

    if (!usuario || !usuario.ativo) {
      throw new AppError('Usuário não encontrado.', 404);
    }
    return this.formatarUsuario(usuario);
  }

  async update(id, data) {
    const usuario = await this.findById(id);

    if (data.email && data.email !== usuario.email) {
      const usuarioExistente = await usuarioRepository.findByEmail(data.email);

      if (usuarioExistente) {
        throw new AppError('E-mail já cadastrado.', 409);
      }
    }

    const dadosAtualizacao = { ...data };

    if (data.senha) {
      dadosAtualizacao.senha = await bcrypt.hash(data.senha, 10);
    }

    const usuarioAtualizado = await usuarioRepository.update(id, dadosAtualizacao);

    return this.formatarUsuario(usuarioAtualizado);
  }

  async deactivate(id) {
    await this.findById(id);

    return usuarioRepository.deactivate(id);
  }
}

export default new UsuarioService();
