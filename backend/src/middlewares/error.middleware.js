import { ZodError } from 'zod';

import AppError from '../errors/AppError.js';

export default function errorMiddleware(err, req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação.',
      errors: err.issues.map((issue) => {
        const chaveNaoReconhecida = issue.message.match(/Unrecognized key: "([^"]+)"/);

        if (chaveNaoReconhecida && ['clienteId', 'veiculoId'].includes(chaveNaoReconhecida[1])) {
          return {
            field: chaveNaoReconhecida[1],
            message: 'Não é permitido alterar o cliente ou o veículo de uma ordem de serviço.',
          };
        }

        return {
          field: issue.path.join('.'),
          message: issue.message,
        };
      }),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: 'Erro interno do servidor.',
  });
}
