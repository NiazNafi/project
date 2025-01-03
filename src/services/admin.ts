import api from './api';
import { CourseStatus } from '../types/course';

export interface AdminCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  status: CourseStatus;
  unreadFeedback: number;
  createdAt: string;
}

export interface AdminResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
}

export const AdminService = {
  getCourses: async (search?: string): Promise<AdminResponse<AdminCourse[]>> => {
    try {
      const response = await api.get('/admin/courses', {
        params: { search }
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error fetching courses'
        }
      };
    }
  },

  createCourse: async (data: { title: string; description: string }): Promise<AdminResponse<{ id: string }>> => {
    try {
      const response = await api.post('/admin/courses', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error creating course'
        }
      };
    }
  },

  updateCourseStatus: async (courseId: string, status: CourseStatus): Promise<AdminResponse<void>> => {
    try {
      const response = await api.put(`/admin/courses/${courseId}/status`, { status });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error updating course status'
        }
      };
    }
  },

  getCourseFeedback: async (courseId: string): Promise<AdminResponse<any[]>> => {
    try {
      const response = await api.get(`/admin/courses/${courseId}/feedback`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error fetching course feedback'
        }
      };
    }
  }
};