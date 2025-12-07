'use client';

/**
 * PageProgressTracker Component
 *
 * Wraps page content to track:
 * - Page start time
 * - Page completion
 * - XP awards
 * - Time spent tracking
 */

import { useEffect, useState, useCallback } from 'react';
import { useWorkbookProgress } from '@/hooks/useWorkbookProgress';
import { TISA_COLORS } from '@/config/design-tokens';

interface PageProgressTrackerProps {
  workbookId: string;
  lessonId: string;
  pageId: string;
  componentType: string;
  children: React.ReactNode;
}

export default function PageProgressTracker({
  workbookId,
  lessonId,
  pageId,
  componentType,
  children,
}: PageProgressTrackerProps) {
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);

  const {
    userId,
    isLoading,
    isPageCompleted,
    isPageStarted,
    startCurrentPage,
    completeCurrentPage,
  } = useWorkbookProgress({
    workbookId,
    lessonId,
    pageId,
    componentType,
    autoTrackTime: true,
  });

  // Auto-start page when user views it
  useEffect(() => {
    if (!isLoading && userId && !isPageStarted) {
      startCurrentPage();
    }
  }, [isLoading, userId, isPageStarted, startCurrentPage]);

  // Track if page was already completed before this session
  useEffect(() => {
    if (!isLoading && isPageCompleted) {
      setHasCompletedOnce(true);
    }
  }, [isLoading, isPageCompleted]);

  const handleComplete = useCallback(async () => {
    if (isPageCompleted || !userId) return;

    const result = await completeCurrentPage();
    if (result.xpAwarded > 0) {
      setXpAmount(result.xpAwarded);
      setShowXpPopup(true);
      setHasCompletedOnce(true);
      setTimeout(() => setShowXpPopup(false), 3000);
    }
  }, [isPageCompleted, userId, completeCurrentPage]);

  return (
    <div className="relative">
      {/* Main content */}
      {children}

      {/* Completion Button - show only if not completed yet */}
      {userId && !isPageCompleted && !isLoading && (
        <div className="fixed bottom-24 right-6 print:hidden z-50">
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            style={{ backgroundColor: TISA_COLORS.purple }}
          >
            <span>✓</span>
            <span>Mark Complete</span>
          </button>
        </div>
      )}

      {/* Already Completed Badge */}
      {hasCompletedOnce && isPageCompleted && !isLoading && (
        <div className="fixed bottom-24 right-6 print:hidden z-50">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white font-medium shadow-lg">
            <span>✓</span>
            <span>Completed</span>
          </div>
        </div>
      )}

      {/* XP Award Popup */}
      {showXpPopup && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[100]">
          <div
            className="bg-white rounded-xl shadow-2xl p-6 text-center animate-bounce pointer-events-auto"
            style={{ border: `3px solid ${TISA_COLORS.gold}` }}
          >
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-2xl font-bold" style={{ color: TISA_COLORS.purple }}>
              +{xpAmount} XP
            </div>
            <div className="text-gray-600 text-sm mt-1">Page Complete!</div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed bottom-24 right-6 print:hidden z-50">
          <div className="px-4 py-2 rounded-full bg-gray-200 text-gray-500 font-medium">
            Loading...
          </div>
        </div>
      )}
    </div>
  );
}
