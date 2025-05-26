import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import userModel from './models/user.js';
import taskModel from './models/task.js';
import app from './index.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export async function bootstrap() {
  // Setup Sequelize instance
  const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  });

  // Initialize models
  userModel(sequelize, Sequelize.DataTypes);
  taskModel(sequelize, Sequelize.DataTypes);

  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
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
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1);
  }
}
