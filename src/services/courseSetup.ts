import api from './api';

export interface CourseSetupData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  duration: string;
  level: string;
  status: string;
  category?: string;
  chapters?: ChapterData[];
}

export interface ChapterData {
  id: string;
  title: string;
  video_link: string;
  text_note: string;
  order: number;
}

export interface CourseSetupResponse {
  success: boolean;
  data?: CourseSetupData;
  error?: {
    message: string;
  };
}

export const CourseSetupService = {
  getCourseDetails: async (courseId: string): Promise<CourseSetupResponse> => {
    try {
      const response = await api.get(`/course-setup/${courseId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error fetching course details'
        }
      };
    }
  },
  deleteCourse: async (courseId: string): Promise<CourseSetupResponse> => {
    try {
      const response = await api.delete(`/course-setup/${courseId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error deleting course'
        }
      };
    }
  },
  



  publishCourse: async (courseId: string, data: { courseData: Partial<CourseSetupData>, chapters: ChapterData[] }): Promise<CourseSetupResponse> => {
    try {
      const response = await api.put(`/course-setup/${courseId}/publish`, data);
      return response.data;
    } catch (error: any) {
      console.error('Error details:', error);
      return {
        success: false,
        error: {
          message: error.response?.data?.error?.message || 'Error publishing course'
        }
      };
    }
  }
};