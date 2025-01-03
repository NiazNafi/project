import { CourseModel } from '../models/courseModel.js';
import { EnrollmentModel } from '../models/enrollmentModel.js';

export const CourseController = {
  getAllCourses: async (req, res) => {
    try {
      const courses = await CourseModel.findAllWithInterests();
      res.json({
        success: true,
        data: courses
      });
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching courses' }
      });
    }
  },
// Add this method to the CourseController
getCourseDetails: async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseDetails = await CourseModel.findCourseWithChapters(courseId);
    
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        error: { message: 'Course not found' }
      });
    }

    res.json({
      success: true,
      data: courseDetails
    });
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching course details' }
    });
  }
},
  getCoursesByInterest: async (req, res) => {
    try {
      const { interestIds } = req.query;
      const courses = await CourseModel.findByInterests(interestIds.split(','));
      res.json({
        success: true,
        data: courses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching courses by interest' }
      });
    }
  },

  searchCourses: async (req, res) => {
    try {
      const { query } = req.query;
      const courses = await CourseModel.findBySearch(query);
      res.json({
        success: true,
        data: courses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error searching courses' }
      });
    }
  },

  getDashboardData: async (req, res) => {
    try {
      const { userId } = req.user;
      
      const [continueLearning, recommended, exploreNewSkills] = await Promise.all([
        CourseModel.findContinueLearning(userId),
        CourseModel.findRecommended(userId),
        CourseModel.findExploreNewSkills(userId)
      ]);

      res.json({
        success: true,
        data: {
          continueLearning,
          recommended,
          exploreNewSkills
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching dashboard data' }
      });
    }
  },

  updateProgress: async (req, res) => {
    try {
      const { userId } = req.user;
      const { courseId } = req.params;
      const { progress } = req.body;

      await EnrollmentModel.updateProgress(userId, courseId, progress);
      
      res.json({
        success: true,
        message: 'Progress updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error updating progress' }
      });
    }
  },
 
  enrollCourse: async (req, res) => {
    try {
      const { userId } = req.user;
      const { courseId } = req.params;

      const existingEnrollment = await EnrollmentModel.findByUserAndCourse(userId, courseId);
      if (existingEnrollment) {
        return res.status(400).json({
          success: false,
          error: { message: 'Already enrolled in this course' }
        });
      }

      const enrollmentId = await EnrollmentModel.create(userId, courseId);

      res.status(201).json({
        success: true,
        data: { enrollmentId }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error enrolling in course' }
      });
    }
  }
};