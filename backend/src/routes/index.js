import { Router } from 'express';

import clienteRoutes from '../modules/cliente/index.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    name: 'AutoService API',
    version: '1.0.0',
    status: 'online',
  });
});

router.use('/clientes', clienteRoutes);

export default router;
