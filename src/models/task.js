'use strict';
import { Model, DataTypes } from 'sequelize';
export default (sequelize) => {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending',
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};