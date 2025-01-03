import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const AdminCourseModel = {
  findAllWithStats: async (searchQuery = '') => {
    const sql = `
      SELECT 
        c.*,
        COUNT(DISTINCT f.id) as unreadFeedback
      FROM course c
      LEFT JOIN feedback f ON c.id = f.courseId AND f.isRead = false
      WHERE 
        c.title LIKE ? OR
        c.description LIKE ? OR
        c.instructor LIKE ?
      GROUP BY c.id
      ORDER BY c.createdAt DESC
    `;
    const searchTerm = `%${searchQuery}%`;
    return query(sql, [searchTerm, searchTerm, searchTerm]);
  },

  updateCourseStatus: async (courseId, status) => {
    const sql = 'UPDATE course SET status = ? WHERE id = ?';
    return query(sql, [status, courseId]);
  },

  getCourseFeedback: async (courseId) => {
    const sql = `
      SELECT f.*, u.firstName, u.lastName
      FROM feedback f
      JOIN user u ON f.userId = u.id
      WHERE f.courseId = ?
      ORDER BY f.createdAt DESC
    `;
    return query(sql, [courseId]);
  },

  createCourse: async ({ title, description }) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO course (
        id, 
        title, 
        description, 
        status,
        instructor,
        imageUrl,
        duration,
        level,
        rating,
        students,
        createdAt,
        updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    await query(sql, [
      id,
      title,
      description,
      'draft',
      '', // instructor
      '', // imageUrl
      '', // duration
      'BEGINNER', // default level
      0, // initial rating
      0  // initial students
    ]);

    return id;
  }
};