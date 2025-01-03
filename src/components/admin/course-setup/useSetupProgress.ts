import { useState, useCallback } from 'react';

type SetupStep = 'details' | 'image' | 'chapters' | 'pricing' | 'resources';

export function useSetupProgress() {
  const [completedSteps, setCompletedSteps] = useState<Set<SetupStep>>(new Set());
  const totalSteps = 5;

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
    updateProgress
  };
}