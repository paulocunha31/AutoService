import { z } from 'zod';

export const createCategoriaSchema = z.object({
  nome: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres.'),

  descricao: z.string().trim().optional(),
});

export const updateCategoriaSchema = z.object({
  nome: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres.').optional(),

  descricao: z.string().trim().optional(),
});
