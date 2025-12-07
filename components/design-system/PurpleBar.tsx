'use client';

/**
 * PurpleBar Component
 *
 * The ever-present TISA purple footer bar that appears at the bottom
 * of every workbook page. Height: 18mm (68px on screen).
 */

import { TISA_COLORS, PAGE_DIMENSIONS } from '@/config/design-tokens';

interface PurpleBarProps {
  pageNumber?: number;
  workbookTitle?: string;
  className?: string;
}

export default function PurpleBar({
  pageNumber,
  workbookTitle,
  className = '',
}: PurpleBarProps) {
  const baseClasses = [
    'purple-bar',
    'flex',
    'items-center',
    'justify-between',
    'px-6',
    'text-white',
    'font-medium',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={baseClasses}
      style={{
        backgroundColor: TISA_COLORS.purple,
        height: PAGE_DIMENSIONS.screenPurpleBarHeight,
        minHeight: PAGE_DIMENSIONS.screenPurpleBarHeight,
      }}
    >
      <div className="text-sm opacity-90 truncate max-w-[60%]">
        {workbookTitle && (
          <span className="font-display">{workbookTitle}</span>
        )}
      </div>

      <div className="text-sm font-bold">
        {pageNumber !== undefined && (
          <span>{pageNumber}</span>
        )}
      </div>
    </div>
  );
}
