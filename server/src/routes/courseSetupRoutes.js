import express from 'express';
import { CourseSetupController } from '../controllers/courseSetupController.js';
import { adminAuth } from '../middleware/adminAuth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.use(adminAuth);

// Course details routes
router.get('/:courseId', asyncHandler(CourseSetupController.getCourseDetails));
router.put('/:courseId', asyncHandler(CourseSetupController.updateCourseDetails));
router.delete('/:courseId', asyncHandler(CourseSetupController.deleteCourse));

// Chapter management routes
router.post('/:courseId/chapters', asyncHandler(CourseSetupController.addChapter));
router.put('/chapters/order', asyncHandler(CourseSetupController.updateChapterOrder));
router.delete('/chapters/:chapterId', asyncHandler(CourseSetupController.deleteChapter));

// Publishing route
router.put('/:courseId/publish', asyncHandler(CourseSetupController.publishCourse));

export default router;