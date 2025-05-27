import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { reportTime, reportCompletion } from '../controllers/report.controller.js';

const router = express.Router();

router.get('/report-time', authenticateToken, reportTime);
router.get('/report', authenticateToken, reportCompletion);

export default router;
