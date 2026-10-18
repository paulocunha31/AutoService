import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import OrcamentoController from './orcamento.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', OrcamentoController.create);

router.get('/', OrcamentoController.findAll);

router.get('/:id', OrcamentoController.findById);

router.put('/:id', OrcamentoController.update);

router.patch('/:id/status', OrcamentoController.updateStatus);

router.post('/:id/servicos', OrcamentoController.addServico);

router.post('/:id/produtos', OrcamentoController.addProduto);

router.delete('/:id/servicos/:itemId', OrcamentoController.removeServico);

router.delete('/:id/produtos/:itemId', OrcamentoController.removeProduto);

export default router;
