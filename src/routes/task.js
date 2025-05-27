import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { create, getAll, update, remove } from '../controllers/task.controller.js';
import { taskIdSchema, taskQuerySchema, taskSchema, taskUpdateSchema } from '../validations/task.validation.js';
import { validateBody, validateQuery, validateParams,  } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post('/', authenticateToken, validateBody(taskSchema), create);
router.get('/', authenticateToken, validateQuery(taskQuerySchema), getAll);
router.put('/:id', authenticateToken, validateParams(taskIdSchema), validateBody(taskUpdateSchema), update);
router.delete('/:id', authenticateToken, validateParams(taskIdSchema), remove);

export default router;
