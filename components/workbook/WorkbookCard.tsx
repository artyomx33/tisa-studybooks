'use client';

/**
 * WorkbookCard Component
 *
 * Displays a workbook in the catalog with:
 * - Cover image or generated cover
 * - Title and description
 * - Grade level indicator
 * - Progress bar
 * - Status badge
 */

import Link from 'next/link';
import { LEVEL_COLORS, FONTS, TISA_COLORS } from '@/config/design-tokens';
import type { WorkbookMeta } from '@/config/workbooks';

interface WorkbookCardProps {
  workbook: WorkbookMeta;
  progress?: number; // 0-100
}

export default function WorkbookCard({ workbook, progress = 0 }: WorkbookCardProps) {
  const levelColors = LEVEL_COLORS[workbook.gradeLevel];
  const statusColors = {
    ready: { bg: '#ECFDF5', text: '#059669', label: 'Ready' },
    in_progress: { bg: '#FEF3C7', text: '#D97706', label: 'In Progress' },
    not_started: { bg: '#F3F4F6', text: '#6B7280', label: 'Coming Soon' },
  };
  const status = statusColors[workbook.status];

  return (
    <Link
      href={`/workbooks/${workbook.id}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:scale-[1.02]"
      style={{ borderColor: levelColors.light }}
    >
      {/* Cover Section */}
      <div
        className="h-48 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${levelColors.primary}, ${levelColors.dark})`,
        }}
      >
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id={`pattern-${workbook.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="white" />
            </pattern>
            <rect width="100" height="100" fill={`url(#pattern-${workbook.id})`} />
          </svg>
        </div>

        {/* Grade Badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-semibold"
          style={{ backgroundColor: TISA_COLORS.purple }}
        >
          Grade {workbook.grade}
        </div>

        {/* Status Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium"
          style={{ backgroundColor: status.bg, color: status.text }}
        >
          {status.label}
        </div>

        {/* Book Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-80 group-hover:scale-110 transition-transform">
            {getWorkbookEmoji(workbook.grade)}
          </div>
        </div>

        {/* Page count */}
        <div className="absolute bottom-3 right-3 bg-black/30 text-white px-2 py-1 rounded text-xs">
          {workbook.totalPages} pages
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3
          className="font-bold text-lg mb-1 group-hover:text-opacity-80 transition-colors line-clamp-1"
          style={{ fontFamily: FONTS.display, color: levelColors.primary }}
        >
          {workbook.title}
        </h3>

        <p
          className="text-sm text-gray-600 mb-3 line-clamp-2"
          style={{ fontFamily: FONTS.body }}
        >
          {workbook.description}
        </p>

        {/* Lessons count */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <span>📚</span>
            {workbook.totalLessons} lessons
          </span>
        </div>

        {/* Progress Bar */}
        {workbook.status === 'ready' && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  backgroundColor: levelColors.primary,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function getWorkbookEmoji(grade: number): string {
  const emojis: Record<number, string> = {
    2: '🎨', // Creative beginnings
    3: '📖', // Story-based learning
    4: '💡', // Problem solving
    5: '🏢', // Business concepts
    6: '🔌', // Technology
    7: '🚀', // Entrepreneurship
  };
  return emojis[grade] || '📚';
}
