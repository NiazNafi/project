import { DashboardModel } from '../models/dashboardModel.js';

export const DashboardController = {
  getDashboardData: async (req, res) => {
    try {
      const { userId } = req.user;

      const [
        continueLearning,
        recommended,
        exploreNewSkills
      ] = await Promise.all([
        DashboardModel.getContinueLearning(userId),
        DashboardModel.getRecommendedCourses(userId),
        DashboardModel.getExploreNewSkills(userId)
      ]);

      // Group recommended courses by interest
      const recommendedByInterest = recommended.reduce((acc, course) => {
        const interest = course.interestName;
        if (!acc[interest]) {
          acc[interest] = [];
        }
        acc[interest].push(course);
        return acc;
      }, {});

      res.json({
        success: true,
        data: {
          continueLearning,
          recommended: Object.entries(recommendedByInterest)
            .filter(([_, courses]) => courses.length >= 3)
            .flatMap(([_, courses]) => courses),
          exploreNewSkills
        }
      });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching dashboard data' }
      });
    }
  }
};