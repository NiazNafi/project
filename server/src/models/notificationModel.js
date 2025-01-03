import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const NotificationModel = {
  findByUserId: async (userId) => {
    const sql = `
      SELECT * FROM notification 
      WHERE userId = ? 
      ORDER BY createdAt DESC 
      LIMIT 10
    `;
    return query(sql, [userId]);
  },

  markAsRead: async (notificationId, userId) => {
    const sql = 'UPDATE notification SET isRead = true WHERE id = ? AND userId = ?';
    return query(sql, [notificationId, userId]);
  },

  create: async (data) => {
    const id = uuidv4();
    const sql = `
      INSERT INTO notification (id, userId, title, message, type)
      VALUES (?, ?, ?, ?, ?)
    `;
    await query(sql, [id, data.userId, data.title, data.message, data.type]);
    return id;
  },

  getUnreadCount: async (userId) => {
    const sql = 'SELECT COUNT(*) as count FROM notification WHERE userId = ? AND isRead = false';
    const result = await query(sql, [userId]);
    return result[0].count;
  }
};