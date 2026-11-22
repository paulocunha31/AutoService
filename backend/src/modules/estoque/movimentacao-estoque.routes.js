import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import movimentacaoEstoqueController from './movimentacao-estoque.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', movimentacaoEstoqueController.findAll);

router.get('/:id', movimentacaoEstoqueController.findById);

export default router;
