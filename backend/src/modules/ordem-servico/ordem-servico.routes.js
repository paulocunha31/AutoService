import { Router } from 'express';

import authMiddleware from '../../middlewares/auth.middleware.js';
import OrdemServicoController from './ordem-servico.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', OrdemServicoController.create);

router.get('/', OrdemServicoController.findAll);

router.get('/:id', OrdemServicoController.findById);

router.put('/:id', OrdemServicoController.update);

router.patch('/:id/status', OrdemServicoController.updateStatus);

router.post('/:id/servicos', OrdemServicoController.addServico);

router.post('/:id/produtos', OrdemServicoController.addProduto);

router.delete('/:id/servicos/:itemId', OrdemServicoController.removeServico);

router.delete('/:id/produtos/:itemId', OrdemServicoController.removeProduto);

export default router;
