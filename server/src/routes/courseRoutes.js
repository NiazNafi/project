import express from 'express';
import { CourseController } from '../controllers/courseController.js';
import { authenticateUser } from '../middleware/auth.js';
import { validateProgress } from '../middleware/validators.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Public routes
router.get('/', asyncHandler(CourseController.getAllCourses));
router.get('/search', asyncHandler(CourseController.searchCourses));
router.get('/by-interest', asyncHandler(CourseController.getCoursesByInterest));

// Protected routes
router.use(authenticateUser);
router.get('/dashboard', asyncHandler(CourseController.getDashboardData));
router.put('/:courseId/progress', validateProgress, asyncHandler(CourseController.updateProgress));
router.post('/:courseId/enroll', asyncHandler(CourseController.enrollCourse));
// Add this route to the existing routes
router.get('/:courseId/details', asyncHandler(CourseController.getCourseDetails));
export default router;

