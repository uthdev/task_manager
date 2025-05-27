import { createTask, getTasks, updateTask, deleteTask } from '../services/task.service.js';

export const create = async (req, res, next) => {
  try {
    const task = await createTask(req.user, req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const tasks = await getTasks(req.user, req.query);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const task = await updateTask(req.user, req.params.id, req.body);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await deleteTask(req.user, req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
