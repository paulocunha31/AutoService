import { z } from 'zod';

export const movimentacaoEstoqueSchema = z
  .object({
    produtoId: z.coerce
      .number()
      .int('O ID do produto deve ser um número inteiro.')
      .positive('ID do produto inválido.')
      .optional(),

    usuarioId: z.coerce
      .number()
      .int('O ID do usuário deve ser um número inteiro.')
      .positive('ID do usuário inválido.')
      .optional(),

    ordemServicoId: z.coerce
      .number()
      .int('O ID da OS deve ser um número inteiro.')
      .positive('ID da OS inválido.')
      .optional(),

    tipo: z
      .enum(['ENTRADA', 'SAIDA'], {
        error: 'O tipo deve ser ENTRADA ou SAIDA.',
      })
      .optional(),

    dataInicial: z.coerce
      .date({
        error: 'A data inicial é inválida.',
      })
      .optional(),

    dataFinal: z.coerce
      .date({
        error: 'A data final é inválida.',
      })
      .optional(),
  })
  .refine((data) => !data.dataInicial || !data.dataFinal || data.dataInicial <= data.dataFinal, {
    message: 'A data inicial não pode ser maior que a data final.',
    path: ['dataInicial'],
  });
