import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from './docs/swagger.js';
import errorMiddleware from './middlewares/error.middleware.js';
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AutoService API está online.',
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);

app.use(errorMiddleware);

export default app;
