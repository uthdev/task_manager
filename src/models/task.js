'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Task belongs to a User (1:1 relationship)
      Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      // Uncomment the following line if you want to add the reverse association
      // User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};