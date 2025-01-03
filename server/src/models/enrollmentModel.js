import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const EnrollmentModel = {
  create: async (userId, courseId) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO enrollment (id, userId, courseId, progress, lastAccesed)
      VALUES (?, ?, ?, 0, NOW())
    `;
    await query(sql, [id, userId, courseId]);
    return id;
  },

  findByUserAndCourse: async (userId, courseId) => {
    const sql = 'SELECT * FROM enrollment WHERE userId = ? AND courseId = ?';
    const enrollments = await query(sql, [userId, courseId]);
    return enrollments[0];
  },

  updateProgress: async (userId, courseId, progress) => {
    const sql = `
      UPDATE enrollment 
      SET progress = ?, lastAccesed = NOW() 
      WHERE userId = ? AND courseId = ?
    `;
    await query(sql, [progress, userId, courseId]);
  },

  getUserEnrollments: async (userId) => {
    const sql = `
      SELECT e.*, c.title, c.imageUrl, c.instructor, c.level,
             i.name as interestName
      FROM enrollment e
      JOIN course c ON e.courseId = c.id
      JOIN courses_interests ci ON c.id = ci.courseId
      JOIN interest i ON ci.interestId = i.id
      WHERE e.userId = ?
      ORDER BY e.lastAccesed DESC
    `;
    return query(sql, [userId]);
  }
};