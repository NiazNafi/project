import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

export const InterestModel = {
  create: async (name) => {
    const id = uuidv4();
    const sql = 'INSERT INTO interest (id, name, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())';
    await query(sql, [id, name]);
    return id;
  },

  findAll: async () => {
    const sql = 'SELECT * FROM interest ORDER BY name';
    return query(sql);
  },

  findById: async (id) => {
    const sql = 'SELECT * FROM interest WHERE id = ?';
    const interests = await query(sql, [id]);
    return interests[0];
  },

  findByName: async (name) => {
    const sql = 'SELECT * FROM interest WHERE name = ?';
    const interests = await query(sql, [name]);
    return interests[0];
  }
};