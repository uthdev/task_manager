import express from 'express';
import { register } from '../controllers/auth.controller.js';
import { registerSchema } from '../validations/auth.validation.js';
import { validateBody } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);

export default router;