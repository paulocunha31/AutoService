import { z } from 'zod';

export const createAgendamentoSchema = z.object({
  clienteId: z
    .number()
    .int('O ID do cliente deve ser um número inteiro.')
    .positive('ID do cliente inválido.'),

  veiculoId: z
    .number()
    .int('O ID do veículo deve ser um número inteiro.')
    .positive('ID do veículo inválido.'),

  servicoId: z
    .number()
    .int('O ID do serviço deve ser um número inteiro.')
    .positive('ID do serviço inválido.'),

  data: z.coerce.date({
    message: 'Data do agendamento inválida.',
  }),

  observacoes: z.string().trim().optional(),
});

export const updateAgendamentoSchema = z.object({
  clienteId: z
    .number()
    .int('O ID do cliente deve ser um número inteiro.')
    .positive('ID do cliente inválido.')
    .optional(),

  veiculoId: z
    .number()
    .int('O ID do veículo deve ser um número inteiro.')
    .positive('ID do veículo inválido.')
    .optional(),

  servicoId: z
    .number()
    .int('O ID do serviço deve ser um número inteiro.')
    .positive('ID do serviço inválido.')
    .optional(),

  data: z.coerce
    .date({
      message: 'Data do agendamento inválida.',
    })
    .optional(),

  observacoes: z.string().trim().nullish(),
});
