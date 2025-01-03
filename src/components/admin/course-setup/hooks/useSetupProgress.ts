import { useState, useCallback, useEffect } from 'react';
import { CourseSetupData } from '../../../../services/courseSetup';

export type SetupStep = 'details' | 'image' | 'category' | 'chapters';

interface UseSetupProgressProps {
  courseData: CourseSetupData | null;
}

export function useSetupProgress({ courseData }: UseSetupProgressProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<SetupStep>>(new Set());
  const totalSteps = 4;

  useEffect(() => {
    const completed = new Set<SetupStep>();
    
    if (courseData) {
      if (courseData.title && courseData.description) completed.add('details');
      if (courseData.imageUrl) completed.add('image');
      if (courseData.category) completed.add('category');
      if (courseData.chapters && courseData.chapters.length > 0) completed.add('chapters');
      // Add logic for chapters when implemented
    }
    
    setCompletedSteps(completed);
  }, [courseData]);

  const updateProgress = useCallback((step: SetupStep) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.add(step);
      return next;
    });
  }, []);

  return {
    progress: completedSteps.size,
    totalSteps,
    isComplete: completedSteps.size === totalSteps,
    updateProgress,
    completedSteps
  };
}