import db from '../models/index.js';

export async function createTask(user, data) {
  const { title, description, status } = data;
  const task = await db.Task.create({
    title,
    description,
    status: status || 'pending',
    userId: user.id,
  });
  return task;
}

export async function getTasks(user, query) {
  const { page = 1, limit = 10, status, taskId, userId } = query;
  const where = {};

  // If admin and userId is supplied, filter by userId; if not supplied, return all tasks
  if (user.role === 'admin') {
    if (userId) where.userId = userId;
  } else {
    // For regular users, only return their own tasks
    where.userId = user.id;
  }

  if (status) where.status = status;
  if (taskId) where.id = taskId;

  const tasks = await db.Task.findAndCountAll({
    where,
    offset: (page - 1) * limit,
    limit: Number(limit),
    order: [['createdAt', 'DESC']]
  });
  return {
    total: tasks.count,
    page: Number(page),
    limit: Number(limit),
    tasks: tasks.rows
  };
}

export async function updateTask(user, id, data) {
  const task = await db.Task.findOne({ where: { id, userId: user.id } });
  if (!task) {
    const error = new Error('Task not found or not owned by user.');
    error.status = 404;
    throw error;
  }
  const { title, description, status } = data;
    task.title = title;
    task.description = description;
    task.status = status;
  await task.save();
  return task;
}

export async function deleteTask(user, id) {
  const task = await db.Task.findOne({ where: { id, userId: user.id } });
  if (!task) {
    const error = new Error('Task not found or not owned by user.');
    error.status = 404;
    throw error;
  }
  await task.destroy();
}
