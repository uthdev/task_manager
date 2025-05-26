import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Example route (replace with your actual routes)
app.get('/', (req, res) => {
  res.send('API is running');
});

// TODO: Import and use your actual routes here
// import authRoutes from './routes/auth.js';
// app.use('/auth', authRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
function shutdown(error) {
  if (error) {
    console.error('Fatal error:', error);
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(error ? 1 : 0);
  });
}

process.on('uncaughtException', shutdown);
process.on('unhandledRejection', shutdown);
process.on('SIGTERM', () => shutdown());
process.on('SIGINT', () => shutdown());

export default app;
