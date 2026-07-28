import { z } from 'zod';

export const idParamSchema = z.object({
  id: z.coerce
    .number()
    .int('O ID deve ser um número inteiro.')
    .positive('O ID deve ser maior que zero.'),
});
