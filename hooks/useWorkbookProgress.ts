'use client';

/**
 * useWorkbookProgress Hook
 *
 * React hook for tracking and updating workbook progress.
 * Provides:
 * - Current progress state
 * - Methods to start/complete pages
 * - Automatic XP awarding
 * - Time tracking
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getCurrentUser } from '@/lib/supabase/client';
import {
  getWorkbookProgress,
  getLessonProgress,
  getPageProgress,
  startPage,
  completePage,
  updateTimeSpent,
} from '@/lib/supabase/progress';
import { awardWorkbookXP } from '@/lib/supabase/xp-integration';
import type { WorkbookProgress } from '@/lib/supabase/progress';
import type { CompletionData } from '@/lib/supabase/types';

interface UseWorkbookProgressOptions {
  workbookId: string;
  lessonId?: string;
  pageId?: string;
  componentType?: string;
  autoTrackTime?: boolean;
}

interface UseWorkbookProgressReturn {
  // State
  userId: string | null;
  isLoading: boolean;
  progress: WorkbookProgress[];
  currentPageProgress: WorkbookProgress | null;

  // Computed
  completedPages: number;
  totalTrackedPages: number;
  isPageCompleted: boolean;
  isPageStarted: boolean;

  // Actions
  startCurrentPage: () => Promise<void>;
  completeCurrentPage: (data?: CompletionData) => Promise<{ xpAwarded: number }>;
  refreshProgress: () => Promise<void>;
}

export function useWorkbookProgress({
  workbookId,
  lessonId,
  pageId,
  componentType,
  autoTrackTime = true,
}: UseWorkbookProgressOptions): UseWorkbookProgressReturn {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<WorkbookProgress[]>([]);
  const [currentPageProgress, setCurrentPageProgress] = useState<WorkbookProgress | null>(null);

  // Time tracking
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch user on mount
  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setUserId(user?.id || null);
    }
    fetchUser();
  }, []);

  // Fetch progress when user/workbook changes
  useEffect(() => {
    async function fetchProgress() {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        if (lessonId) {
          const lessonProgress = await getLessonProgress(userId, workbookId, lessonId);
          setProgress(lessonProgress);
        } else {
          const workbookProgressData = await getWorkbookProgress(userId, workbookId);
          setProgress(workbookProgressData);
        }

        if (pageId && lessonId) {
          const pageProgress = await getPageProgress(userId, workbookId, lessonId, pageId);
          setCurrentPageProgress(pageProgress);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgress();
  }, [userId, workbookId, lessonId, pageId]);

  // Auto time tracking
  useEffect(() => {
    if (!autoTrackTime || !userId || !pageId || !lessonId) return;

    startTimeRef.current = Date.now();

    // Update time every 30 seconds
    intervalRef.current = setInterval(async () => {
      const secondsElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (secondsElapsed >= 30) {
        await updateTimeSpent(userId, workbookId, lessonId, pageId, 30);
        startTimeRef.current = Date.now();
      }
    }, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Save remaining time on unmount
      const secondsElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (secondsElapsed > 0 && userId) {
        updateTimeSpent(userId, workbookId, lessonId, pageId, secondsElapsed);
      }
    };
  }, [autoTrackTime, userId, workbookId, lessonId, pageId]);

  // Computed values
  const completedPages = progress.filter((p) => p.status === 'completed').length;
  const totalTrackedPages = progress.length;
  const isPageCompleted = currentPageProgress?.status === 'completed';
  const isPageStarted = currentPageProgress?.status === 'in_progress' || isPageCompleted;

  // Start current page
  const startCurrentPage = useCallback(async () => {
    if (!userId || !lessonId || !pageId || !componentType) return;

    const result = await startPage(userId, workbookId, lessonId, pageId, componentType);
    if (result) {
      setCurrentPageProgress(result);
    }
  }, [userId, workbookId, lessonId, pageId, componentType]);

  // Complete current page
  const completeCurrentPage = useCallback(
    async (data?: CompletionData): Promise<{ xpAwarded: number }> => {
      if (!userId || !lessonId || !pageId || !componentType) {
        return { xpAwarded: 0 };
      }

      // Calculate time spent
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);

      const result = await completePage(
        userId,
        workbookId,
        lessonId,
        pageId,
        componentType,
        data,
        timeSpent
      );

      if (result) {
        setCurrentPageProgress(result);

        // Award XP
        const xpResult = await awardWorkbookXP(
          userId,
          workbookId,
          lessonId,
          pageId,
          componentType
        );

        return { xpAwarded: xpResult.xpAwarded };
      }

      return { xpAwarded: 0 };
    },
    [userId, workbookId, lessonId, pageId, componentType]
  );

  // Refresh progress
  const refreshProgress = useCallback(async () => {
    if (!userId) return;

    if (lessonId) {
      const lessonProgress = await getLessonProgress(userId, workbookId, lessonId);
      setProgress(lessonProgress);
    } else {
      const workbookProgressData = await getWorkbookProgress(userId, workbookId);
      setProgress(workbookProgressData);
    }

    if (pageId && lessonId) {
      const pageProgress = await getPageProgress(userId, workbookId, lessonId, pageId);
      setCurrentPageProgress(pageProgress);
    }
  }, [userId, workbookId, lessonId, pageId]);

  return {
    userId,
    isLoading,
    progress,
    currentPageProgress,
    completedPages,
    totalTrackedPages,
    isPageCompleted,
    isPageStarted,
    startCurrentPage,
    completeCurrentPage,
    refreshProgress,
  };
}

/**
 * Simplified hook for just getting workbook completion percentage
 */
export function useWorkbookCompletion(workbookId: string, totalPages: number) {
  const [userId, setUserId] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const user = await getCurrentUser();
      setUserId(user?.id || null);

      if (user?.id) {
        const progress = await getWorkbookProgress(user.id, workbookId);
        setCompletedCount(progress.filter((p) => p.status === 'completed').length);
      }

      setIsLoading(false);
    }
    fetch();
  }, [workbookId]);

  const percentage = totalPages > 0 ? Math.round((completedCount / totalPages) * 100) : 0;

  return { userId, isLoading, completedCount, percentage };
}
