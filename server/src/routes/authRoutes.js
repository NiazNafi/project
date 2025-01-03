import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { validateRegistration, validateLogin } from '../middleware/validators.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.post('/register', validateRegistration, asyncHandler(AuthController.register));
router.post('/login', validateLogin, asyncHandler(AuthController.login));

export default router;