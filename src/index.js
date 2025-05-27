import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Example route (replace with your actual routes)
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/v1', router);

// Centralized error handler
app.use(errorHandler);

export default app;
