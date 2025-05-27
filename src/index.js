import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerUi } from './config/swagger.js';
import fs from 'fs';
import yaml from 'js-yaml';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Example route (replace with your actual routes)
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/v1', router);

// Swagger UI setup
const swaggerDocument = yaml.load(
  fs.readFileSync('swagger.yaml', 'utf8')
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Catch-all 404 route
app.use((req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});

// Centralized error handler
app.use(errorHandler);

export default app;
