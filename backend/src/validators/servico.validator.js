import { z } from 'zod';

export const createServicoSchema = z.object({
  nome: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres.'),

  descricao: z.string().trim().optional(),

  preco: z.number().positive('O preço deve ser maior que zero.'),

  categoriaId: z
    .number()
    .int('O ID da categoria deve ser um número inteiro.')
    .positive('ID da categoria inválido.'),
});

export const updateServicoSchema = z.object({
  nome: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres.').optional(),

  descricao: z.string().trim().optional(),

  preco: z.number().positive('O preço deve ser maior que zero.').optional(),

  categoriaId: z
    .number()
    .int('O ID da categoria deve ser um número inteiro.')
    .positive('ID da categoria inválido.')
    .optional(),
});
