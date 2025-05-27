import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load config based on environment
const env = process.env.NODE_ENV || 'development';
const configModule = await import(pathToFileURL(path.join(__dirname, '../config/config.js')).href);
const config = configModule.default[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize.Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize.Sequelize(config.database, config.username, config.password, config);
}

// Read all model files except this one
const files = await fs.readdir(__dirname);
for (const file of files) {
  if (
    file !== 'index.js' &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  ) {
    const modelPath = pathToFileURL(path.join(__dirname, file)).href;
    const modelModule = await import(modelPath);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

// Run associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
