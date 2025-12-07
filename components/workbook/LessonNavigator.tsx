'use client';

/**
 * LessonNavigator Component
 *
 * Bottom navigation bar with:
 * - Previous/Next page buttons
 * - Keyboard shortcuts (Arrow keys)
 * - Progress indicator
 * - Page counter
 * - Quick actions (print, share)
 */

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LEVEL_COLORS, FONTS, TISA_COLORS } from '@/config/design-tokens';
import type { GradeLevel } from '@/config/design-tokens';

interface NavigationTarget {
  lessonId: string;
  pageId: string;
}

interface LessonNavigatorProps {
  workbookId: string;
  lessonId: string;
  currentPageId: string;
  prevPage: NavigationTarget | null;
  nextPage: NavigationTarget | null;
  totalPages: number;
  currentIndex: number;
  gradeLevel: GradeLevel;
}

export default function LessonNavigator({
  workbookId,
  lessonId: _lessonId,
  currentPageId: _currentPageId,
  prevPage,
  nextPage,
  totalPages,
  currentIndex,
  gradeLevel,
}: LessonNavigatorProps) {
  const router = useRouter();
  const levelColors = LEVEL_COLORS[gradeLevel];

  // Build URLs
  const prevUrl = prevPage
    ? `/workbooks/${workbookId}/${prevPage.lessonId}/${prevPage.pageId}`
    : null;
  const nextUrl = nextPage
    ? `/workbooks/${workbookId}/${nextPage.lessonId}/${nextPage.pageId}`
    : null;
  const tocUrl = `/workbooks/${workbookId}`;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          if (prevUrl) {
            event.preventDefault();
            router.push(prevUrl);
          }
          break;
        case 'ArrowRight':
          if (nextUrl) {
            event.preventDefault();
            router.push(nextUrl);
          }
          break;
        case 'Escape':
          event.preventDefault();
          router.push(tocUrl);
          break;
      }
    },
    [prevUrl, nextUrl, tocUrl, router]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Print handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50"
      style={{ borderTopColor: levelColors.light }}
    >
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Back to TOC */}
        <Link
          href={tocUrl}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-lg">📋</span>
          <span className="hidden sm:inline text-sm">Contents</span>
        </Link>

        {/* Center: Navigation controls */}
        <div className="flex items-center gap-4">
          {/* Previous Button */}
          {prevUrl ? (
            <Link
              href={prevUrl}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
              style={{
                backgroundColor: levelColors.light + '30',
                color: levelColors.primary,
              }}
            >
              <span>←</span>
              <span className="hidden sm:inline">Previous</span>
            </Link>
          ) : (
            <div className="px-4 py-2 text-gray-300 cursor-not-allowed">
              <span>←</span>
              <span className="hidden sm:inline ml-2">Previous</span>
            </div>
          )}

          {/* Page Counter */}
          <div className="flex items-center gap-2 px-4">
            <span
              className="font-bold text-lg"
              style={{ fontFamily: FONTS.display, color: levelColors.primary }}
            >
              {currentIndex}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{totalPages}</span>
          </div>

          {/* Next Button */}
          {nextUrl ? (
            <Link
              href={nextUrl}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:scale-105"
              style={{ backgroundColor: levelColors.primary }}
            >
              <span className="hidden sm:inline">Next</span>
              <span>→</span>
            </Link>
          ) : (
            <Link
              href={tocUrl}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:scale-105"
              style={{ backgroundColor: TISA_COLORS.gold }}
            >
              <span className="hidden sm:inline">Complete</span>
              <span>✓</span>
            </Link>
          )}
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            title="Print this page (Ctrl+P)"
          >
            <span className="text-lg">🖨️</span>
          </button>

          {/* Fullscreen toggle could go here */}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${(currentIndex / totalPages) * 100}%`,
            backgroundColor: levelColors.primary,
          }}
        />
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 hidden sm:block">
        <span className="bg-gray-100 px-2 py-0.5 rounded">← → to navigate</span>
        <span className="mx-2">•</span>
        <span className="bg-gray-100 px-2 py-0.5 rounded">Esc for contents</span>
      </div>
    </nav>
  );
}
