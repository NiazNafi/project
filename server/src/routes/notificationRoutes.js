import express from 'express';
import { NotificationController } from '../controllers/notificationController.js';
import { authenticateUser } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.use(authenticateUser);
router.get('/', asyncHandler(NotificationController.getNotifications));
router.put('/:notificationId/read', asyncHandler(NotificationController.markAsRead));

export default router;