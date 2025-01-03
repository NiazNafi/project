import { query } from "../config/database.js";
import { logger } from "../utils/logger.js";
import { v4 as uuidv4 } from "uuid";

export const CourseSetupModel = {
  getCourseDetails: async (courseId) => {
    // First get course details
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
        i.name as category
      FROM course c
      LEFT JOIN courses_interests ci ON c.id = ci.courseId
      LEFT JOIN interest i ON i.id = ci.interestId
      WHERE c.id = ?
    `;
    const courses = await query(courseSql, [courseId]);

    // Then get chapters
    const chaptersSql = `
      SELECT id, title, video_link, text_note, \`order\`
      FROM chapter
      WHERE course_id = ?
      ORDER BY \`order\` ASC
    `;
    const chapters = await query(chaptersSql, [courseId]);

    // Combine the results
    const courseDetails = courses[0];
    if (courseDetails) {
      courseDetails.chapters = chapters;
    }

    return courseDetails;
  },
  updateCourseDetails: async (courseId, courseData) => {
    const { title, description, imageUrl, status, categories } = courseData;

    try {
      // Update course details
      const courseSql = `
        UPDATE course
        SET title = ?, description = ?, imageUrl = ?, status = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      await query(courseSql, [title, description, imageUrl, status, courseId]);

      if (categories && categories.length > 0) {
        // Step 1: Retrieve existing interests
        const existingInterestsSql = `
          SELECT name FROM interest
        `;
        const existingInterests = await query(existingInterestsSql, []);
        const existingInterestNames = existingInterests.map((i) => i.name);

        // Step 2: Find new interests
        const newInterests = categories.filter(
          (category) => !existingInterestNames.includes(category.name)
        );

        // Step 3: Insert new interests
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

        // Step 4: Update course-interest mapping
        const deleteSql = `
          DELETE FROM courses_interests 
          WHERE courseId = ?
        `;
        await query(deleteSql, [courseId]);

        const insertMappingSql = `
          INSERT INTO courses_interests (courseId, interestId)
          SELECT ?, id FROM interest WHERE name = ?
        `;
        for (const category of categories) {
          await query(insertMappingSql, [courseId, category.id]);
        }
      }
    } catch (error) {
      logger.error(
        `Error updating course details for courseId ${courseId}: ${error.message}`
      );
      throw error;
    }
  },

  // Method to update chapters
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

        // Ensure no undefined values are passed
        const safeTitle = title !== undefined ? title : null;
        const safeVideoLink = video_link !== undefined ? video_link : null;
        const safeTextNote = text_note !== undefined ? text_note : null;
        const safeOrder = order !== undefined ? order : null;

        // Check if chapter exists
        const checkSql = `SELECT COUNT(*) as count FROM chapter WHERE course_id = ? AND id = ?`;
        const result = await query(checkSql, [courseId, id]);

        if (result[0].count > 0) {
          // Update existing chapter
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
          // Insert new chapter
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
        `Error updating chapters for title ${title} courseId ${courseId}: ${error.message}`
      );
      throw error;
    }
  },
};
