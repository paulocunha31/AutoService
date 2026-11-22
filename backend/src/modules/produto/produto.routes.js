import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import ProdutoController from './produto.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', ProdutoController.create);

router.get('/', ProdutoController.findAll);

router.get('/:id', ProdutoController.findById);

router.put('/:id', ProdutoController.update);

router.post('/:id/entrada-estoque', ProdutoController.adicionarEstoque);

router.delete('/:id', ProdutoController.deactivate);

export default router;
