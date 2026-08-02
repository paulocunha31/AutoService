import { Router } from 'express';

import categoriaRoutes from '../modules/categoria/categoria.routes.js';
import clienteRoutes from '../modules/cliente/index.js';
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

export default router;
