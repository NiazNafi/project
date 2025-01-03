import { query } from "../config/database.js";
import { logger } from "../utils/logger.js";
import { v4 as uuidv4 } from "uuid";

export const CourseSetupModel = {
  getCourseDetails: async (courseId) => {
    const courseSql = `
      SELECT 
        c.id, 
        c.title, 
        c.description, 
        c.imageUrl, 
        c.instructor, 
        c.duration, 
        c.level, 
        c.status,
        ci.interestId,
        i.id as category
      FROM course c
      LEFT JOIN courses_interests ci ON c.id = ci.courseId
      LEFT JOIN interest i ON i.id = ci.interestId
      WHERE c.id = ?
    `;
    const courses = await query(courseSql, [courseId]);

    const chaptersSql = `
      SELECT id, title, video_link, text_note, \`order\`
      FROM chapter
      WHERE course_id = ?
      ORDER BY \`order\` ASC
    `;
    const chapters = await query(chaptersSql, [courseId]);

    const courseDetails = courses[0];
    if (courseDetails) {
      courseDetails.chapters = chapters;
    }

    return courseDetails;
  },

  updateCourseDetails: async (courseId, courseData) => {
    const { title, description, imageUrl, status, categories, category } =
      courseData;

    try {
      const courseSql = `
        UPDATE course
        SET title = ?, description = ?, imageUrl = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      await query(courseSql, [title, description, imageUrl, status, courseId]);

      if (categories && categories.length > 0) {
        const existingInterestsSql = `
          SELECT name FROM interest
        `;
        const existingInterests = await query(existingInterestsSql, []);
        const existingInterestNames = existingInterests.map((i) => i.name);

        const newInterests = categories.filter(
          (category) => !existingInterestNames.includes(category.name)
        );

        if (newInterests.length > 0) {
          const insertInterestSql = `
            INSERT INTO interest (id, name, createdAt, updatedAt, icon)
            VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)
          `;
          for (const interest of newInterests) {
            await query(insertInterestSql, [
              interest.id,
              interest.name,
              interest.icon,
            ]);
          }
        }

        const deleteSql = `
          DELETE FROM courses_interests 
          WHERE courseId = ?
        `;
        await query(deleteSql, [courseId]);

        const insertMappingSql = `
          INSERT INTO courses_interests (courseId, interestId)
          VALUES (?, ?)
        `;
        await query(insertMappingSql, [courseId, category]);
      }
    } catch (error) {
      logger.error(
        `Error updating course details for courseId ${courseId}: ${error.message}`
      );
      throw error;
    }
  },

  updateChapters: async (courseId, chapters) => {
    const updateSql = `
      UPDATE chapter
      SET title = ?, video_link = ?, text_note = ?, \`order\` = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE course_id = ? AND id = ?
    `;

    const insertSql = `
      INSERT INTO chapter (id, course_id, title, video_link, text_note, \`order\`, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    try {
      for (const chapter of chapters) {
        const { id, title, video_link, text_note, order } = chapter;

        const safeTitle = title !== undefined ? title : null;
        const safeVideoLink = video_link !== undefined ? video_link : null;
        const safeTextNote = text_note !== undefined ? text_note : null;
        const safeOrder = order !== undefined ? order : null;

        const checkSql = `SELECT COUNT(*) as count FROM chapter WHERE course_id = ? AND id = ?`;
        const result = await query(checkSql, [courseId, id]);

        if (result[0].count > 0) {
          logger.info(
            `Updating chapter with id ${id} for courseId ${courseId}`
          );
          await query(updateSql, [
            safeTitle,
            safeVideoLink,
            safeTextNote,
            safeOrder,
            courseId,
            id,
          ]);
        } else {
          logger.info(
            `Inserting new chapter with id ${id} for courseId ${courseId}`
          );
          await query(insertSql, [
            id,
            courseId,
            safeTitle,
            safeVideoLink,
            safeTextNote,
            safeOrder,
          ]);
        }
      }
    } catch (error) {
      logger.error(
        `Error updating chapters for courseId ${courseId}: ${error.message}`
      );
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const deleteCourseSql = `
      DELETE FROM course WHERE id = ?
    `;
    const result = await query(deleteCourseSql, [courseId]); // Assuming `query` returns an object with affected rows

    // Log the number of rows affected
    if (result.affectedRows > 0) {
      logger.info(`Course with id ${courseId} deleted successfully`);
    } else {
      logger.warn(`No course found with id ${courseId} to delete`);
    }

    return result.affectedRows; // Return the number of affected rows
    } catch (error) {
      logger.error(
        `Error deleting course with id ${courseId}: ${error.message}`
      );
      throw error;
    }
  },
};
