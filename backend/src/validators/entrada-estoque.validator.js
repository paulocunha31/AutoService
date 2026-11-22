import { z } from 'zod';

export const entradaEstoqueSchema = z.object({
  quantidade: z
    .number()
    .int('A quantidade deve ser um número inteiro.')
    .positive('A quantidade deve ser maior que zero.'),

  observacao: z.string().trim().optional(),
});
