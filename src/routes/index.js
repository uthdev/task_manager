import express from 'express';
import authRoutes from './auth.js';
import taskRoutes from './task.js';
import adminRoutes from './admin.js';
import reportRoutes from './report.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/admin', adminRoutes);
router.use('/', reportRoutes);

export default router;
