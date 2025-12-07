'use client';

/**
 * TableOfContents Component
 *
 * Displays lessons with expandable page lists:
 * - Lesson cards with progress
 * - Expandable page lists
 * - Progress indicators per page
 * - Links to individual pages
 */

import { useState } from 'react';
import Link from 'next/link';
import { LEVEL_COLORS, FONTS } from '@/config/design-tokens';
import type { GradeLevel } from '@/config/design-tokens';

interface PageMeta {
  id: string;
  title: string;
  type: 'story' | 'glossary' | 'task' | 'test' | 'assessment' | 'mindmap' | 'homework' | 'sticker';
  completed?: boolean;
}

interface LessonMeta {
  id: string;
  number: number;
  title: string;
  pages: PageMeta[];
  progress: number; // 0-100
}

interface TableOfContentsProps {
  workbookId: string;
  lessons: LessonMeta[];
  gradeLevel: GradeLevel;
}

export default function TableOfContents({
  workbookId,
  lessons,
  gradeLevel,
}: TableOfContentsProps) {
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const levelColors = LEVEL_COLORS[gradeLevel];

  const toggleLesson = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  return (
    <div className="space-y-4">
      <h2
        className="text-xl font-bold mb-6 flex items-center gap-2"
        style={{ fontFamily: FONTS.display, color: levelColors.primary }}
      >
        <span>📋</span>
        Table of Contents
      </h2>

      {lessons.map((lesson) => {
        const isExpanded = expandedLesson === lesson.id;

        return (
          <div
            key={lesson.id}
            className="bg-white rounded-xl shadow-sm border overflow-hidden transition-all"
            style={{ borderColor: isExpanded ? levelColors.primary : '#E5E7EB' }}
          >
            {/* Lesson Header */}
            <button
              onClick={() => toggleLesson(lesson.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Lesson Number */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: levelColors.primary }}
                >
                  {lesson.number}
                </div>

                <div className="text-left">
                  <h3
                    className="font-semibold"
                    style={{ fontFamily: FONTS.display, color: '#374151' }}
                  >
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {lesson.pages.length} pages
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Progress indicator */}
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${lesson.progress}%`,
                        backgroundColor: levelColors.primary,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-12">
                    {lesson.progress}%
                  </span>
                </div>

                {/* Expand/Collapse icon */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                  style={{
                    backgroundColor: levelColors.light + '20',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <span style={{ color: levelColors.primary }}>▼</span>
                </div>
              </div>
            </button>

            {/* Pages List (Expandable) */}
            {isExpanded && (
              <div className="border-t bg-gray-50 px-6 py-4">
                <div className="space-y-2">
                  {lesson.pages.map((page, pageIndex) => (
                    <Link
                      key={page.id}
                      href={`/workbooks/${workbookId}/${lesson.id}/${page.id}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all group"
                    >
                      {/* Completion indicator */}
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2"
                        style={{
                          borderColor: page.completed ? '#10B981' : '#D1D5DB',
                          backgroundColor: page.completed ? '#10B981' : 'transparent',
                          color: page.completed ? 'white' : '#9CA3AF',
                        }}
                      >
                        {page.completed ? '✓' : pageIndex + 1}
                      </div>

                      {/* Page icon */}
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                        style={{
                          backgroundColor: getPageTypeColor(page.type) + '20',
                        }}
                      >
                        {getPageTypeEmoji(page.type)}
                      </div>

                      {/* Page info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium group-hover:text-opacity-80 ${page.completed ? 'line-through text-gray-400' : ''}`}
                            style={{ color: page.completed ? '#9CA3AF' : '#374151' }}
                          >
                            {page.title}
                          </span>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: getPageTypeColor(page.type) + '20',
                            color: getPageTypeColor(page.type),
                          }}
                        >
                          {formatPageType(page.type)}
                        </span>
                      </div>

                      {/* Arrow */}
                      <span
                        className="text-gray-400 group-hover:translate-x-1 transition-transform"
                      >
                        →
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Quick Start button */}
                <Link
                  href={`/workbooks/${workbookId}/${lesson.id}/${lesson.pages[0].id}`}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: levelColors.primary }}
                >
                  <span>▶</span>
                  Start Lesson
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function getPageTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    story: '📖',
    glossary: '📚',
    task: '🦉',
    test: '👑',
    assessment: '📊',
    mindmap: '🧠',
    homework: '🌙',
    sticker: '🏷️',
  };
  return emojis[type] || '📄';
}

function getPageTypeColor(type: string): string {
  const colors: Record<string, string> = {
    story: '#3B82F6',
    glossary: '#10B981',
    task: '#8B5CF6',
    test: '#F59E0B',
    assessment: '#EC4899',
    mindmap: '#06B6D4',
    homework: '#6366F1',
    sticker: '#F97316',
  };
  return colors[type] || '#6B7280';
}

function formatPageType(type: string): string {
  const labels: Record<string, string> = {
    story: 'Story',
    glossary: 'Glossary',
    task: 'Task',
    test: 'Test',
    assessment: 'Assessment',
    mindmap: 'Mind Map',
    homework: 'Homework',
    sticker: 'Stickers',
  };
  return labels[type] || type;
}
