import { z } from 'zod';

export const createProdutoSchema = z.object({
  nome: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres.'),

  descricao: z.string().trim().optional(),

  preco: z.number().positive('O preço deve ser maior que zero.'),

  estoque: z
    .number()
    .int('O estoque deve ser um número inteiro.')
    .min(0, 'O estoque não pode ser negativo.')
    .default(0),

  fotoUrl: z.string().trim().url('A URL da foto é inválida.').optional(),

  categoriaId: z
    .number()
    .int('O ID da categoria deve ser um número inteiro.')
    .positive('ID da categoria inválido.'),
});

export const updateProdutoSchema = z.object({
  nome: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres.').optional(),

  descricao: z.string().trim().optional(),

  preco: z.number().positive('O preço deve ser maior que zero.').optional(),

  estoque: z
    .number()
    .int('O estoque deve ser um número inteiro.')
    .min(0, 'O estoque não pode ser negativo.')
    .optional(),

  fotoUrl: z.string().trim().url('A URL da foto é inválida.').optional(),

  categoriaId: z
    .number()
    .int('O ID da categoria deve ser um número inteiro.')
    .positive('ID da categoria inválido.')
    .optional(),
});
