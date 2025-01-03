import { createContext, useContext, useState, useCallback } from 'react';
import { CourseSetupData, ChapterData } from '../services/courseSetup';

interface CourseSetupContextType {
  courseData: CourseSetupData | null;
  setCourseData: React.Dispatch<React.SetStateAction<CourseSetupData | null>>;
  updateChapter: (chapterId: string, data: Partial<ChapterData>) => void;
  addChapter: (chapter: ChapterData) => void;
  removeChapter: (chapterId: string) => void;
}

const CourseSetupContext = createContext<CourseSetupContextType | null>(null);

export function CourseSetupProvider({ children }: { children: React.ReactNode }) {
  const [courseData, setCourseData] = useState<CourseSetupData | null>(null);

  const updateChapter = useCallback((chapterId: string, data: Partial<ChapterData>) => {
    setCourseData(prev => {
      if (!prev?.chapters) return prev;
      return {
        ...prev,
        chapters: prev.chapters.map(chapter =>
          chapter.id === chapterId ? { ...chapter, ...data } : chapter
        )
      };
    });
  }, []);

  const addChapter = useCallback((chapter: ChapterData) => {
    setCourseData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        chapters: [...(prev.chapters || []), chapter]
      };
    });
  }, []);

  const removeChapter = useCallback((chapterId: string) => {
    setCourseData(prev => {
      if (!prev?.chapters) return prev;
      return {
        ...prev,
        chapters: prev.chapters.filter(chapter => chapter.id !== chapterId)
      };
    });
  }, []);

  return (
    <CourseSetupContext.Provider value={{
      courseData,
      setCourseData,
      updateChapter,
      addChapter,
      removeChapter
    }}>
      {children}
    </CourseSetupContext.Provider>
  );
}

export function useCourseSetup() {
  const context = useContext(CourseSetupContext);
  if (!context) {
    throw new Error('useCourseSetup must be used within a CourseSetupProvider');
  }
  return context;
}