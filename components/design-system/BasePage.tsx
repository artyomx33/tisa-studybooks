'use client';

/**
 * BasePage Component
 *
 * A4 container component (210mm x 297mm) that provides the foundational
 * layout structure for all workbook pages. Includes zones for:
 * - PageHeader (35mm) - Level-colored header
 * - Content Zone (variable) - Main content area
 * - PurpleBar (18mm) - Always-present TISA purple footer
 */

import { ReactNode } from 'react';
import { LEVEL_COLORS, PAGE_DIMENSIONS, TISA_COLORS } from '@/config/design-tokens';
import type { GradeLevel } from '@/config/design-tokens';
import PurpleBar from './PurpleBar';

interface BasePageProps {
  children: ReactNode;
  gradeLevel: GradeLevel;
  pageNumber?: number;
  workbookTitle?: string;
  showPurpleBar?: boolean;
  className?: string;
  printMode?: boolean;
}

export default function BasePage({
  children,
  gradeLevel,
  pageNumber,
  workbookTitle,
  showPurpleBar = true,
  className = '',
  printMode = false,
}: BasePageProps) {
  const levelColors = LEVEL_COLORS[gradeLevel];

  // NO FALLBACKS: gradeLevel must be valid
  if (!levelColors) {
    throw new Error(`Invalid gradeLevel: ${gradeLevel}. Must be one of: ${Object.keys(LEVEL_COLORS).join(', ')}`);
  }

  const baseClasses = [
    'base-page',
    'relative',
    'bg-white',
    'shadow-lg',
    'mx-auto',
    'overflow-hidden',
    'flex',
    'flex-col',
    printMode ? 'print-mode' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={baseClasses}
      style={{
        width: PAGE_DIMENSIONS.screenWidth,
        minHeight: PAGE_DIMENSIONS.screenHeight,
        ['--level-primary' as string]: levelColors.primary,
        ['--level-light' as string]: levelColors.light,
        ['--level-dark' as string]: levelColors.dark,
        ['--level-accent' as string]: levelColors.accent,
        ['--tisa-purple' as string]: TISA_COLORS.purple,
        ['--page-margin' as string]: PAGE_DIMENSIONS.screenMargin,
      }}
    >
      <div
        className="flex-1 flex flex-col"
        style={{
          padding: PAGE_DIMENSIONS.screenMargin,
          paddingBottom: showPurpleBar ? '0' : PAGE_DIMENSIONS.screenMargin,
        }}
      >
        {children}
      </div>

      {showPurpleBar && (
        <PurpleBar
          pageNumber={pageNumber}
          workbookTitle={workbookTitle}
        />
      )}
    </div>
  );
}

export function useLevelColors(gradeLevel: GradeLevel) {
  const colors = LEVEL_COLORS[gradeLevel];
  if (!colors) {
    throw new Error(`Invalid gradeLevel: ${gradeLevel}`);
  }
  return colors;
}
