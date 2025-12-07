'use client';

/**
 * PageHeader Component
 *
 * Level-colored header that appears at the top of workbook pages.
 * Height: 35mm (132px on screen).
 */

import { LEVEL_COLORS, PAGE_DIMENSIONS, FONTS } from '@/config/design-tokens';
import type { GradeLevel } from '@/config/design-tokens';

interface PageHeaderProps {
  gradeLevel: GradeLevel;
  lessonNumber: number;
  lessonTitle: string;
  blockName: string;
  componentNumber?: number;
  className?: string;
}

export default function PageHeader({
  gradeLevel,
  lessonNumber,
  lessonTitle,
  blockName,
  componentNumber,
  className = '',
}: PageHeaderProps) {
  const levelColors = LEVEL_COLORS[gradeLevel];

  // NO FALLBACKS: gradeLevel must be valid
  if (!levelColors) {
    throw new Error(`Invalid gradeLevel: ${gradeLevel}. Must be one of: ${Object.keys(LEVEL_COLORS).join(', ')}`);
  }

  const baseClasses = [
    'page-header',
    'rounded-lg',
    'px-6',
    'py-4',
    'flex',
    'items-center',
    'justify-between',
    'mb-4',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={baseClasses}
      style={{
        backgroundColor: levelColors.primary,
        minHeight: PAGE_DIMENSIONS.screenHeaderHeight,
      }}
    >
      <div className="flex flex-col text-white">
        <div
          className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1"
          style={{ fontFamily: FONTS.body }}
        >
          Lesson {lessonNumber}
        </div>

        <h1
          className="text-2xl font-bold leading-tight"
          style={{ fontFamily: FONTS.display }}
        >
          {lessonTitle}
        </h1>

        <div
          className="text-sm mt-1 opacity-90"
          style={{ fontFamily: FONTS.body }}
        >
          {blockName}
        </div>
      </div>

      {componentNumber !== undefined && (
        <div
          className="flex items-center justify-center w-12 h-12 rounded-full text-xl font-bold"
          style={{
            backgroundColor: levelColors.accent,
            color: levelColors.dark,
            fontFamily: FONTS.display,
          }}
        >
          {componentNumber}
        </div>
      )}
    </div>
  );
}
