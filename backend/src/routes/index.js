import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    name: 'AutoService API',
    version: '1.0.0',
    status: 'online',
  });
});

export default router;
