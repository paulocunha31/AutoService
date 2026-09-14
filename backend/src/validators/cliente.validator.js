import { z } from 'zod';

export const createClienteSchema = z.object({
  nome: z.string().trim().min(3, 'O nome deve ter pelo menos 3 caracteres.'),

  tipoPessoa: z.enum(['FISICA', 'JURIDICA']),

  cpfCnpj: z.string().nullish(),

  rgInscricaoEstadual: z.string().nullish(),

  celular: z.string().trim().min(10, 'Celular inválido.'),

  telefone: z.string().nullish(),

  email: z.string().email('E-mail inválido.').nullish(),

  cep: z.string().nullish(),
  logradouro: z.string().nullish(),
  numero: z.string().nullish(),
  complemento: z.string().nullish(),
  bairro: z.string().nullish(),
  cidade: z.string().nullish(),
  estado: z.string().nullish(),

  observacoes: z.string().nullish(),
});
export const updateClienteSchema = z.object({
  nome: z.string().trim().min(3, 'O nome deve ter pelo menos 3 caracteres.').optional(),

  tipoPessoa: z.enum(['FISICA', 'JURIDICA']).optional(),

  cpfCnpj: z.string().nullish(),

  rgInscricaoEstadual: z.string().nullish(),

  celular: z.string().trim().min(10, 'Celular inválido.'),

  telefone: z.string().nullish(),

  email: z.string().email('E-mail inválido.').nullish(),

  cep: z.string().nullish(),
  logradouro: z.string().nullish(),
  numero: z.string().nullish(),
  complemento: z.string().nullish(),
  bairro: z.string().nullish(),
  cidade: z.string().nullish(),
  estado: z.string().nullish(),

  observacoes: z.string().nullish(),
});
