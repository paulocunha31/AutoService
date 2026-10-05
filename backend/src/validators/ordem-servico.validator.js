import { z } from 'zod';

export const createOrdemServicoSchema = z.object({
  clienteId: z.number().int().positive('Cliente inválido.'),

  veiculoId: z.number().int().positive('Veículo inválido.'),

  dataEntregaPrevista: z.coerce.date().optional(),

  problema: z.string().trim().min(1, 'Problema é obrigatório.'),

  diagnostico: z.string().trim().optional(),

  observacoes: z.string().trim().optional(),

  desconto: z.number().min(0, 'O desconto não pode ser negativo.').default(0),
});

export const updateOrdemServicoSchema = createOrdemServicoSchema.partial();

export const updateStatusOrdemServicoSchema = z.object({
  status: z.enum(['ABERTA', 'EM_ANDAMENTO', 'AGUARDANDO_PECAS', 'FINALIZADA', 'CANCELADA']),
});

export const addServicoOrdemServicoSchema = z.object({
  servicoId: z.number().int().positive('Serviço inválido.'),

  quantidade: z.number().int().positive('A quantidade deve ser maior que zero.'),
});

export const addProdutoOrdemServicoSchema = z.object({
  produtoId: z.number().int().positive('Produto inválido.'),

  quantidade: z.number().int().positive('A quantidade deve ser maior que zero.'),
});
