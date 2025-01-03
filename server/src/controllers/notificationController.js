import { NotificationModel } from '../models/notificationModel.js';

export const NotificationController = {
  getNotifications: async (req, res) => {
    try {
      const { userId } = req.user;
      const notifications = await NotificationModel.findByUserId(userId);
      
      res.json({
        success: true,
        data: notifications
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error fetching notifications' }
      });
    }
  },

  markAsRead: async (req, res) => {
    try {
      const { userId } = req.user;
      const { notificationId } = req.params;

      await NotificationModel.markAsRead(notificationId, userId);
      
      res.json({
        success: true,
        message: 'Notification marked as read'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: { message: 'Error marking notification as read' }
      });
    }
  }
};