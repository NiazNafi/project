import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'Authentication required' }
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await UserModel.findById(decoded.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        error: { message: 'Admin access required' }
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: { message: 'Invalid or expired token' }
    });
  }
};