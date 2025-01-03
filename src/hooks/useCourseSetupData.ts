import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CourseSetupService, CourseSetupData, ChapterData } from '../services/courseSetup';
import { useCourseSetup } from '../contexts/CourseSetupContext';
import { useLocation } from 'react-router-dom';

const createEmptyCourseSetupData = (courseId: string): CourseSetupData => ({
    id: courseId,
    title: '',
    description: '',
    imageUrl: '',
    instructor: '',
    duration: '',
    level: '',
    status: '',
    category: '',
    chapters: []
  });

export function useCourseSetupData(courseId: string | undefined) {
  const [isLoading, setIsLoading] = useState(true);
  const { courseData, setCourseData, updateChapter, addChapter, removeChapter } = useCourseSetup();
  const location = useLocation();
  useEffect(() => {
    // Check if the navigation is from the edit button or new course
    const fromEditButton = location.state?.fromEditButton;
    const fromNewCourse = location.state?.fromNewCourse;
    if (courseId && (fromEditButton || fromNewCourse)) {
      loadCourseData();
    } else {
      setIsLoading(false);
    }
  }, [courseId, location.state]);

  const loadCourseData = async () => {
    try {
      const response = await CourseSetupService.getCourseDetails(courseId!);
      if (response.success && response.data) {
        setCourseData(response.data); // Save to global state
      } else {
        toast.error(response.error?.message || 'Failed to load course details');
      }
    } catch (error) {
      toast.error('An error occurred while loading course details');
    } finally {
      setIsLoading(false);
    }
  };

  const saveChapter = (chapterId: string, chapterData: Partial<ChapterData>) => {
    if (!courseData) {
      toast.error('Course data is not available');
      return false;
    }

    updateChapter(chapterId, chapterData);
    toast.success('Chapter saved successfully in global state');
    return true;
  };

  const handleAddChapter = (chapter: ChapterData) => {
    addChapter(chapter);
    toast.success('Chapter added successfully');
  };

  const handleRemoveChapter = (chapterId: string) => {
    removeChapter(chapterId);
    toast.success('Chapter removed successfully');
  };
  const updateCourseDetails = async (details: Partial<CourseSetupData>) => {
    setCourseData(prev => prev ? { ...prev, ...details } : null);
    toast.success('Course details updated successfully in global state');
    return true;
  };

  return {
    courseData,
    isLoading,
    updateCourseDetails,
    saveChapter,
    updateChapter,
    addChapter: handleAddChapter,
    removeChapter: handleRemoveChapter
  };
}