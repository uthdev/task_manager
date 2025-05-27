import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';
import { validateBody } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

export default router;