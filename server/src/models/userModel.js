import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const UserModel = {
  create: async (userData) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO user (id, email, firstName, lastName, password, isAdmin, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    await query(sql, [
      id, 
      userData.email, 
      userData.firstName, 
      userData.lastName, 
      userData.password,
      userData.isAdmin || false
    ]);
    return id;
  },

  findByEmail: async (email) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    const users = await query(sql, [email]);
    return users[0];
  },

  findById: async (id) => {
    const sql = 'SELECT id, email, firstName, lastName, isAdmin, createdAt FROM user WHERE id = ?';
    const users = await query(sql, [id]);
    return users[0];
  },

  updateInterests: async (userId, interestIds) => {
    await query('DELETE FROM user_interests WHERE userId = ?', [userId]);
    
    for (const interestId of interestIds) {
      await query(
        'INSERT INTO user_interests (userId, interestId) VALUES (?, ?)',
        [userId, interestId]
      );
    }
  },

  getStudentCount: async () => {
    const sql = 'SELECT COUNT(*) as count FROM user WHERE isAdmin = false';
    const result = await query(sql);
    return result[0].count;
  }
};