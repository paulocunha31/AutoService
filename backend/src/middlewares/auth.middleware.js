import jwt from 'jsonwebtoken';

import AppError from '../errors/AppError.js';

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token não informado.', 401);
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new AppError('Token inválido.', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Token inválido.', 401));
    }

    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expirado.', 401));
    }

    next(error);
  }
}
