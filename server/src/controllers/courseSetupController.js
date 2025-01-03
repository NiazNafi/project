import { CourseSetupModel } from "../models/courseSetupModel.js";
import { InterestModel } from "../models/interestModel.js";
export const CourseSetupController = {
  getCourseDetails: async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseDetails = await CourseSetupModel.getCourseDetails(courseId);
      courseDetails.categories = await InterestModel.findAll();
      if (!courseDetails) {
        return res.status(404).json({
          success: false,
          error: { message: "Course not found" },
        });
      }

      res.json({
        success: true,
        data: courseDetails,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error fetching course details" },
      });
    }
  },

  updateCourseDetails: async (req, res) => {
    try {
      const { courseId } = req.params;
      const courseData = req.body;

      await CourseSetupModel.updateCourseDetails(courseId, courseData);

      res.json({
        success: true,
        message: "Course details updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error updating course details" },
      });
    }
  },

  publishCourse: async (req, res) => {
    try {
      const { courseId } = req.params;
      const { courseData, chapters } = req.body;

      // Update course details with published status
      await CourseSetupModel.updateCourseDetails(courseId, {
        ...courseData,
        status: "published",
      });

      // Update chapters if provided
      if (chapters && chapters.length > 0) {
        await CourseSetupModel.updateChapters(courseId, chapters);
      }

      res.json({
        success: true,
        message: "Course published successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error publishing course" },
      });
    }
  },

  updateChapterOrder: async (req, res) => {
    try {
      const { chapters } = req.body;
      await CourseSetupModel.updateChapterOrder(chapters);

      res.json({
        success: true,
        message: "Chapter order updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error updating chapter order" },
      });
    }
  },

  addChapter: async (req, res) => {
    try {
      const { courseId } = req.params;
      const chapterData = req.body;

      const chapterId = await CourseSetupModel.addChapter(
        courseId,
        chapterData
      );

      res.status(201).json({
        success: true,
        data: { id: chapterId },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error adding chapter" },
      });
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const { courseId } = req.params;
      const affectedRows = await CourseSetupModel.deleteCourse(courseId);

if (affectedRows === 0) {
  return res.status(404).json({
    success: false,
    error: { message: "Course not found or already deleted" },
  });
}

res.json({
  success: true,
  message: "Course deleted successfully",
});
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error deleting course" },
      });
    }
  },

  deleteChapter: async (req, res) => {
    try {
      const { chapterId } = req.params;
      await CourseSetupModel.deleteChapter(chapterId);

      res.json({
        success: true,
        message: "Chapter deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: "Error deleting chapter" },
      });
    }
  },
};
