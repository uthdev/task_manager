import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { requireRole } from '../middlewares/rbac.middleware.js';
import { getAll } from '../controllers/task.controller.js';

const router = express.Router();

// Admin: Get all tasks for any user (with filtering)
router.get('/tasks', authenticateToken, requireRole('admin'), validateQuery(taskQuerySchema), getAll);

export default router;
