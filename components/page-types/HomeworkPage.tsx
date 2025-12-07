'use client';

/**
 * HomeworkPage Component (Moonlight Mission)
 *
 * Renders homework assignments with:
 * - Mission name and objectives
 * - Checklist of tasks
 * - Notes section
 * - Due date indicator
 */

import { useState } from 'react';
import { FONTS, LEVEL_COLORS } from '@/config/design-tokens';
import type { ContentItem, HomeworkFrontmatter } from '@/types/content';
import type { GradeLevel } from '@/config/design-tokens';

interface HomeworkPageProps {
  content: ContentItem<HomeworkFrontmatter>;
  gradeLevel: GradeLevel;
  onComplete?: () => void;
}

export default function HomeworkPage({
  content,
  gradeLevel,
  onComplete: _onComplete,
}: HomeworkPageProps) {
  const { frontmatter, content: markdownContent } = content;
  const missionName = frontmatter.mission_name || 'Moonlight Mission';
  const objectives = frontmatter.objectives || [];
  const dueDate = frontmatter.due_date_relative;
  const levelColors = LEVEL_COLORS[gradeLevel];

  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [notes, setNotes] = useState('');

  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = objectives.length > 0 ? (completedCount / objectives.length) * 100 : 0;

  return (
    <div className="homework-page h-full flex flex-col p-4">
      {/* Mission Header */}
      <div
        className="rounded-lg p-6 mb-4 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${levelColors.dark}, ${levelColors.primary})`,
        }}
      >
        {/* Stars decoration */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 10 + 5}px`,
              }}
            >
              ✦
            </span>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center text-3xl shadow-lg">
            🌙
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold" style={{ fontFamily: FONTS.display }}>
              {missionName}
            </h2>
            {dueDate && (
              <p className="text-sm opacity-80 mt-1">
                Due: {formatDueDate(dueDate)}
              </p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mt-4">
          <div className="flex justify-between text-sm text-white mb-1">
            <span>Mission Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-300 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Instructions */}
      {markdownContent && (
        <div
          className="mb-4 p-4 bg-gray-50 rounded-lg"
          style={{ fontFamily: FONTS.body }}
        >
          <div className="whitespace-pre-wrap text-gray-700">{markdownContent}</div>
        </div>
      )}

      {/* Objectives Checklist */}
      <div className="flex-1 overflow-auto">
        <h3
          className="font-bold mb-3 flex items-center gap-2"
          style={{ fontFamily: FONTS.display, color: levelColors.primary }}
        >
          <span>🎯</span> Mission Objectives
        </h3>

        <div className="space-y-2 mb-4">
          {objectives.map((objective, index) => (
            <label
              key={index}
              className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all ${
                completed[index]
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white hover:bg-gray-50 border-gray-200'
              } border`}
            >
              <input
                type="checkbox"
                checked={completed[index] || false}
                onChange={(e) =>
                  setCompleted((prev) => ({ ...prev, [index]: e.target.checked }))
                }
                className="w-5 h-5 mt-0.5 rounded"
                style={{ accentColor: levelColors.primary }}
              />
              <div className="flex-1">
                <span
                  className={`${completed[index] ? 'line-through text-gray-500' : ''}`}
                >
                  {objective}
                </span>
              </div>
              {completed[index] && (
                <span className="text-green-500 text-xl">✓</span>
              )}
            </label>
          ))}

          {objectives.length === 0 && (
            <div className="text-gray-500 italic p-4 bg-gray-50 rounded-lg">
              No specific objectives listed
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="mb-4">
          <h3
            className="font-bold mb-2 flex items-center gap-2"
            style={{ fontFamily: FONTS.display, color: levelColors.primary }}
          >
            <span>📝</span> Your Notes
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Write any notes or questions here..."
            className="w-full p-3 rounded-lg border-2 focus:outline-none resize-none"
            style={{ borderColor: levelColors.light }}
          />
        </div>
      </div>

      {/* Completion Message */}
      {progress === 100 && (
        <div
          className="p-4 rounded-lg text-center mt-4"
          style={{ backgroundColor: '#ECFDF5', border: '2px solid #10B981' }}
        >
          <span className="text-3xl">🎉</span>
          <p className="font-bold text-green-800 mt-2">Mission Complete!</p>
          <p className="text-sm text-green-600">
            Great work! You've completed all objectives.
          </p>
        </div>
      )}
    </div>
  );
}

function formatDueDate(relative: string): string {
  switch (relative) {
    case 'next_lesson':
      return 'Next Lesson';
    case 'next_week':
      return 'Next Week';
    case 'tomorrow':
      return 'Tomorrow';
    default:
      return relative;
  }
}
