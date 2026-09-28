import { z } from 'zod';

export const createUsuarioSchema = z.object({
  nome: z.string().trim().min(3, 'O nome deve ter pelo menos 3 caracteres.'),

  email: z.string().trim().email('E-mail inválido.'),

  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export const updateUsuarioSchema = z.object({
  nome: z.string().trim().min(3, 'O nome deve ter pelo menos 3 caracteres.').optional(),

  email: z.string().trim().email('E-mail inválido.').optional(),

  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.').optional(),
});
