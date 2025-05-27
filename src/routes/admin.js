import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/rbac.middleware.js';
import { getAll } from '../controllers/task.controller.js';
import { validateQuery } from "../middlewares/validate.middleware.js";
import { taskQuerySchema } from "../validations/task.validation.js";
import { getAllUsers } from '../controllers/user.controller.js';
import { userQuerySchema } from '../validations/auth.validation.js';


const router = express.Router();

// Admin: Get all tasks for any user (with filtering)
router.get('/tasks', authenticateToken, requireRole('admin'), validateQuery(taskQuerySchema), getAll);

// Admin: Get all users (with filtering)
router.get('/users', authenticateToken, requireRole('admin'), validateQuery(userQuerySchema), getAllUsers);

export default router;
