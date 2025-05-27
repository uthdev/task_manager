import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerUi, swaggerSpec } from './config/swagger.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Example route (replace with your actual routes)
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/v1', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Catch-all 404 route
app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});

// Centralized error handler
app.use(errorHandler);

export default app;
