import db from '../models/index.js';

export async function getUsers(query) {
  const { page = 1, limit = 10, role } = query;
  const where = {};
  if (role) where.role = role;
  const users = await db.User.findAndCountAll({
    where,
    offset: (page - 1) * limit,
    limit: Number(limit),
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['password'] }
  });
  return {
    total: users.count,
    page: Number(page),
    limit: Number(limit),
    users: users.rows
  };
}
