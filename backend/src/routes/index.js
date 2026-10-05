import { Router } from 'express';

import agendamentoRoutes from '../modules/agendamento/index.js';
import authRoutes from '../modules/auth/index.js';
import categoriaRoutes from '../modules/categoria/index.js';
import clienteRoutes from '../modules/cliente/index.js';
import ordemServicoRoutes from '../modules/ordem-servico/index.js';
import produtoRoutes from '../modules/produto/index.js';
import servicoRoutes from '../modules/servico/index.js';
import usuarioRoutes from '../modules/usuario/index.js';
import veiculoRoutes from '../modules/veiculo/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    name: 'AutoService API',
    version: '1.0.0',
    status: 'online',
  });
});

router.use('/clientes', clienteRoutes);
router.use('/veiculos', veiculoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/servicos', servicoRoutes);
router.use('/produtos', produtoRoutes);
router.use('/agendamentos', agendamentoRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/auth', authRoutes);
router.use('/ordens-servico', ordemServicoRoutes);

export default router;
