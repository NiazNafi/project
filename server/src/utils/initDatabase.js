import { config } from 'dotenv';
import { dbConnect } from '../config/database.js';
import { seedDatabase } from './seedData.js';

config();

async function initDatabase() {
  try {
    await dbConnect();
    console.log('Database connected successfully');
    
    await seedDatabase();
    console.log('Database initialization completed');
    
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initDatabase();