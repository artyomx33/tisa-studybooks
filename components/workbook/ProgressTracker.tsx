'use client';

/**
 * ProgressTracker Component
 *
 * Visual progress indicator with:
 * - Circular progress ring
 * - Page completion dots
 * - XP earned display
 * - Completion celebration
 */

import { LEVEL_COLORS, FONTS, TISA_COLORS } from '@/config/design-tokens';
import type { GradeLevel } from '@/config/design-tokens';

interface PageProgress {
  id: string;
  title: string;
  completed: boolean;
}

interface ProgressTrackerProps {
  pages: PageProgress[];
  gradeLevel: GradeLevel;
  xpEarned?: number;
  compact?: boolean;
}

export default function ProgressTracker({
  pages,
  gradeLevel,
  xpEarned = 0,
  compact = false,
}: ProgressTrackerProps) {
  const levelColors = LEVEL_COLORS[gradeLevel];
  const completedCount = pages.filter((p) => p.completed).length;
  const totalCount = pages.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = progressPercent === 100;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {/* Mini progress dots */}
        <div className="flex gap-1">
          {pages.map((page) => (
            <div
              key={page.id}
              className="w-2 h-2 rounded-full transition-colors"
              style={{
                backgroundColor: page.completed ? levelColors.primary : '#E5E7EB',
              }}
              title={page.title}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {completedCount}/{totalCount}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center gap-6">
        {/* Circular Progress */}
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke={isComplete ? TISA_COLORS.gold : levelColors.primary}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progressPercent * 2.51} 251`}
              className="transition-all duration-500"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {isComplete ? (
              <span className="text-3xl">🏆</span>
            ) : (
              <>
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: FONTS.display, color: levelColors.primary }}
                >
                  {Math.round(progressPercent)}%
                </span>
              </>
            )}
          </div>
        </div>

        {/* Progress Details */}
        <div className="flex-1">
          <h3
            className="font-bold text-lg mb-2"
            style={{ fontFamily: FONTS.display, color: '#374151' }}
          >
            {isComplete ? 'Lesson Complete!' : 'Your Progress'}
          </h3>

          {/* Page progress dots */}
          <div className="flex flex-wrap gap-2 mb-3">
            {pages.map((page) => (
              <div
                key={page.id}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                style={{
                  backgroundColor: page.completed
                    ? levelColors.light + '30'
                    : '#F3F4F6',
                  color: page.completed ? levelColors.primary : '#9CA3AF',
                }}
              >
                <span>{page.completed ? '✓' : '○'}</span>
                <span>{page.title}</span>
              </div>
            ))}
          </div>

          {/* XP Earned */}
          {xpEarned > 0 && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
              style={{ backgroundColor: TISA_COLORS.gold + '20' }}
            >
              <span>⭐</span>
              <span
                className="font-semibold"
                style={{ color: '#B45309' }}
              >
                +{xpEarned} XP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Completion celebration */}
      {isComplete && (
        <div
          className="mt-4 p-4 rounded-lg text-center"
          style={{ backgroundColor: '#ECFDF5' }}
        >
          <p className="text-green-800 font-medium">
            🎉 Congratulations! You've completed this lesson!
          </p>
          <p className="text-sm text-green-600 mt-1">
            Your progress has been saved.
          </p>
        </div>
      )}
    </div>
  );
}
