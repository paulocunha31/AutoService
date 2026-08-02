import { z } from 'zod';

export const createVeiculoSchema = z.object({
  placa: z.string().trim().min(7, 'Placa inválida.').max(8, 'Placa inválida.'),

  marca: z.string().trim().min(2, 'A marca deve ter pelo menos 2 caracteres.'),

  modelo: z.string().trim().min(2, 'O modelo deve ter pelo menos 2 caracteres.'),

  ano: z.number().int('O ano deve ser um número inteiro.').min(1900, 'ano inválido.'),

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
