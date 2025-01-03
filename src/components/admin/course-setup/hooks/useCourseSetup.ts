import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CourseSetupService, CourseSetupData } from '../../../../services/courseSetup';

export function useCourseSetup(courseId: string | undefined) {
  const [courseData, setCourseData] = useState<CourseSetupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      loadCourseData();
    } else {
      setIsLoading(false);
    }
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      const response = await CourseSetupService.getCourseDetails(courseId!);
      if (response.success && response.data) {
        setCourseData(response.data);
      } else {
        toast.error(response.error?.message || 'Failed to load course details');
      }
    } catch (error) {
      toast.error('An error occurred while loading course details');
    } finally {
      setIsLoading(false);
    }
  };

  const updateCourseData = async (updates: Partial<CourseSetupData>) => {
    if (!courseId) return false;

    try {
      const response = await CourseSetupService.updateCourseDetails(courseId, updates);
      if (response.success) {
        setCourseData(prev => prev ? { ...prev, ...updates } : null);
        toast.success('Course updated successfully');
        return true;
      } else {
        toast.error(response.error?.message || 'Failed to update course');
        return false;
      }
    } catch (error) {
      toast.error('An error occurred while updating the course');
      return false;
    }
  };

  return {
    courseData,
    isLoading,
    updateCourseData
  };
}