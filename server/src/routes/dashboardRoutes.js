import express from 'express';
import { DashboardController } from '../controllers/dashboardController.js';
import { authenticateUser } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.use(authenticateUser);
router.get('/', asyncHandler(DashboardController.getDashboardData));

export default router;