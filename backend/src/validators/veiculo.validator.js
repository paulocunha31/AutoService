import { z } from 'zod';

export const createVeiculoSchema = z.object({
  placa: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida.'),

  marca: z.string().trim().min(2, 'A marca deve ter pelo menos 2 caracteres.'),

  modelo: z.string().trim().min(2, 'O modelo deve ter pelo menos 2 caracteres.'),

  ano: z.number().int('O ano deve ser um número inteiro.').min(1900, 'Ano inválido.'),

  cor: z.string().trim().optional(),

  combustivel: z.string().trim().optional(),

  quilometragem: z
    .number()
    .int('A quilometragem deve ser um número inteiro.')
    .min(0, 'A quilometragem não pode ser negativa.')
    .optional(),

  clienteId: z
    .number()
    .int('O ID do cliente deve ser um número inteiro.')
    .positive('ID do cliente inválido.'),
});

export const updateVeiculoSchema = z.object({
  placa: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/, 'Placa inválida.')
    .optional(),

  marca: z.string().trim().min(2, 'A marca deve ter pelo menos 2 caracteres.').optional(),

  modelo: z.string().trim().min(2, 'O modelo deve ter pelo menos 2 caracteres.').optional(),

  ano: z.number().int('O ano deve ser um número inteiro.').min(1900, 'Ano inválido.').optional(),

  cor: z.string().trim().optional(),

  combustivel: z.string().trim().optional(),

  quilometragem: z
    .number()
    .int('A quilometragem deve ser um número inteiro.')
    .min(0, 'A quilometragem não pode ser negativa.')
    .optional(),

  clienteId: z
    .number()
    .int('O ID do cliente deve ser um número inteiro.')
    .positive('ID do cliente inválido.')
    .optional(),
});
