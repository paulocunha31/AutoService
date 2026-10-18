import { z } from 'zod';

export const createOrcamentoSchema = z.object({
  clienteId: z.number().int().positive('Cliente inválido'),
  veiculoId: z.number().int().positive('Veículo inválido'),
  validade: z.coerce.date().optional().nullable(),
  observacoes: z.string().trim().optional().nullable(),
});

export const updateOrcamentoSchema = z
  .object({
    validade: z.coerce.date().optional().nullable(),
    observacoes: z.string().trim().optional().nullable(),
    desconto: z.number().min(0, 'O desconto não pode ser negativo.').optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe ao menos um campo para atualizar.',
  });

export const itemOrcamentoSchema = z.object({
  quantidade: z.number().int().positive('A quantidade deve ser maior que zero.'),
});

export const addServicoOrcamentoSchema = itemOrcamentoSchema.extend({
  servicoId: z.number().int().positive('Serviço inválido'),
});

export const addProdutoOrcamentoSchema = itemOrcamentoSchema.extend({
  produtoId: z.number().int().positive('Produto inválido'),
});

export const updateStatusOrcamentoSchema = z.object({
  status: z.enum(['APROVADO', 'REJEITADO', 'EXPIRADO']),
});
