import { getUsers } from '../services/user.service.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getUsers(req.query);
    res.json(users);
  } catch (error) {
    next(error);
  }
};
