import { query } from '../config/database.js';

export const courseMiddleware = {
  validateCourseAccess: async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const { userId } = req.user;

      const enrollment = await query(
        'SELECT * FROM enrollment WHERE userId = ? AND courseId = ?',
        [userId, courseId]
      );

      if (!enrollment.length) {
        return res.status(403).json({
          success: false,
          error: { message: 'Not enrolled in this course' }
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  }
};