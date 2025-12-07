'use client';

/**
 * AssessmentPage Component (Self-Assessment)
 *
 * Renders 5 different assessment formats:
 * - ladder: Innovator Ladder (vertical ladder graphic)
 * - orange-slices: Orange Slices (sentence completion circles)
 * - steps: Steps to Success (ladder with checkboxes)
 * - plus-arrow: Plus Arrow (peer feedback form)
 * - thermometer: Confidence Thermometer (0-5 scale with emoji)
 */

import { useState } from 'react';
import { FONTS, LEVEL_COLORS } from '@/config/design-tokens';
import type { ContentItem, AssessmentFrontmatter } from '@/types/content';
import type { GradeLevel } from '@/config/design-tokens';

interface AssessmentPageProps {
  content: ContentItem<AssessmentFrontmatter>;
  gradeLevel: GradeLevel;
  onComplete?: (data: Record<string, unknown>) => void;
}

export default function AssessmentPage({
  content,
  gradeLevel,
  onComplete: _onComplete,
}: AssessmentPageProps) {
  const { frontmatter, content: markdownContent } = content;
  const assessmentType = frontmatter.assessment_type;
  const levelColors = LEVEL_COLORS[gradeLevel];

  return (
    <div className="assessment-page h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-4 text-center">
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: FONTS.display, color: levelColors.primary }}
        >
          {frontmatter.title || 'Self-Assessment'}
        </h2>
        {frontmatter.instructions && (
          <p className="text-sm text-gray-600 mt-1">{frontmatter.instructions}</p>
        )}
      </div>

      {/* Assessment content */}
      <div className="flex-1 overflow-auto">
        {assessmentType === 'ladder' && (
          <InnovatorLadder levelColors={levelColors} content={markdownContent} />
        )}
        {assessmentType === 'orange-slices' && (
          <OrangeSlices levelColors={levelColors} content={markdownContent} />
        )}
        {assessmentType === 'steps' && (
          <StepsToSuccess levelColors={levelColors} content={markdownContent} />
        )}
        {assessmentType === 'plus-arrow' && (
          <PlusArrow levelColors={levelColors} content={markdownContent} />
        )}
        {assessmentType === 'thermometer' && (
          <ConfidenceThermometer
            levelColors={levelColors}
            scale={frontmatter.scale}
            content={markdownContent}
          />
        )}
      </div>
    </div>
  );
}

// Assessment Type Components

interface AssessmentComponentProps {
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
  content?: string;
  scale?: {
    min: number;
    max: number;
    labels?: string[];
  };
}

function InnovatorLadder({ levelColors, content: _content }: AssessmentComponentProps) {
  const [selectedRung, setSelectedRung] = useState<number | null>(null);
  const rungs = [
    { level: 5, label: 'Expert Innovator', emoji: '🏆' },
    { level: 4, label: 'Skilled Creator', emoji: '⭐' },
    { level: 3, label: 'Growing Learner', emoji: '🌱' },
    { level: 2, label: 'Curious Beginner', emoji: '🔍' },
    { level: 1, label: 'Just Starting', emoji: '👶' },
  ];

  return (
    <div className="innovator-ladder flex flex-col items-center py-4">
      <div className="relative">
        {/* Ladder rails */}
        <div className="absolute left-8 top-0 bottom-0 w-2 bg-amber-600 rounded-full" />
        <div className="absolute right-8 top-0 bottom-0 w-2 bg-amber-600 rounded-full" />

        {/* Rungs */}
        <div className="relative z-10 space-y-4 py-4">
          {rungs.map((rung) => (
            <button
              key={rung.level}
              onClick={() => setSelectedRung(rung.level)}
              className={`relative flex items-center gap-4 px-12 py-4 rounded-lg transition-all ${
                selectedRung === rung.level
                  ? 'scale-105 shadow-lg'
                  : 'hover:scale-102'
              }`}
              style={{
                backgroundColor: selectedRung === rung.level
                  ? levelColors.primary
                  : '#FEF3C7',
                color: selectedRung === rung.level ? 'white' : levelColors.dark,
              }}
            >
              <span className="text-2xl">{rung.emoji}</span>
              <div className="text-left">
                <div className="font-bold">Level {rung.level}</div>
                <div className="text-sm opacity-80">{rung.label}</div>
              </div>
              {/* Rung bar */}
              <div
                className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 -z-10"
                style={{ backgroundColor: '#92400E' }}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedRung && (
        <div
          className="mt-6 p-4 rounded-lg text-center"
          style={{ backgroundColor: levelColors.light + '20' }}
        >
          <p className="font-semibold" style={{ color: levelColors.primary }}>
            You selected Level {selectedRung}!
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {rungs.find(r => r.level === selectedRung)?.label}
          </p>
        </div>
      )}
    </div>
  );
}

function OrangeSlices({ levelColors, content: _content }: AssessmentComponentProps) {
  const [completions, setCompletions] = useState<Record<number, string>>({});
  const prompts = [
    'I learned that...',
    'I was surprised by...',
    'I want to know more about...',
    'I can use this knowledge to...',
  ];

  return (
    <div className="orange-slices grid grid-cols-2 gap-4 py-4">
      {prompts.map((prompt, index) => (
        <div
          key={index}
          className="relative aspect-square rounded-full p-6 flex flex-col items-center justify-center"
          style={{
            backgroundColor: `hsl(${30 + index * 5}, 90%, ${75 - index * 5}%)`,
            border: `3px solid hsl(${30 + index * 5}, 80%, 50%)`,
          }}
        >
          <div
            className="text-center text-sm font-semibold mb-2"
            style={{ color: levelColors.dark }}
          >
            {prompt}
          </div>
          <textarea
            value={completions[index] || ''}
            onChange={(e) => setCompletions(prev => ({ ...prev, [index]: e.target.value }))}
            className="w-full h-16 text-center text-sm bg-white/80 rounded-lg p-2 resize-none focus:outline-none"
            placeholder="Write here..."
          />
        </div>
      ))}
    </div>
  );
}

function StepsToSuccess({ levelColors, content: _content }: AssessmentComponentProps) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const steps = [
    'I understood the main concepts',
    'I completed all the tasks',
    'I can explain what I learned',
    'I know how to apply this knowledge',
    'I am ready for the next lesson',
  ];

  return (
    <div className="steps-to-success py-4">
      <div className="relative max-w-md mx-auto">
        {/* Ladder visual */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <label
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                checked[index] ? 'shadow-md' : ''
              }`}
              style={{
                backgroundColor: checked[index] ? levelColors.light + '30' : '#F9FAFB',
                borderLeft: `4px solid ${checked[index] ? levelColors.primary : '#E5E7EB'}`,
              }}
            >
              <input
                type="checkbox"
                checked={checked[index] || false}
                onChange={(e) => setChecked(prev => ({ ...prev, [index]: e.target.checked }))}
                className="w-5 h-5 rounded"
                style={{ accentColor: levelColors.primary }}
              />
              <div className="flex-1">
                <span className="font-medium">{step}</span>
              </div>
              <span className="text-xl">
                {checked[index] ? '✅' : '⬜'}
              </span>
            </label>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600">
            Completed: {Object.values(checked).filter(Boolean).length} / {steps.length}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                backgroundColor: levelColors.primary,
                width: `${(Object.values(checked).filter(Boolean).length / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlusArrow({ levelColors: _levelColors, content: _content }: AssessmentComponentProps) {
  const [feedback, setFeedback] = useState({
    plus: '',
    arrow: '',
  });

  return (
    <div className="plus-arrow py-4 max-w-lg mx-auto space-y-6">
      {/* Plus section */}
      <div
        className="rounded-lg p-6"
        style={{ backgroundColor: '#ECFDF5', border: '2px solid #10B981' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">➕</span>
          <h3 className="font-bold text-green-800">What went well?</h3>
        </div>
        <p className="text-sm text-green-700 mb-3">
          Share something positive about your peer's work
        </p>
        <textarea
          value={feedback.plus}
          onChange={(e) => setFeedback(prev => ({ ...prev, plus: e.target.value }))}
          rows={3}
          className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:border-green-500 resize-none"
          placeholder="I liked how you..."
        />
      </div>

      {/* Arrow section */}
      <div
        className="rounded-lg p-6"
        style={{ backgroundColor: '#FEF3C7', border: '2px solid #F59E0B' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">➡️</span>
          <h3 className="font-bold text-amber-800">Suggestion for improvement</h3>
        </div>
        <p className="text-sm text-amber-700 mb-3">
          Share a constructive suggestion
        </p>
        <textarea
          value={feedback.arrow}
          onChange={(e) => setFeedback(prev => ({ ...prev, arrow: e.target.value }))}
          rows={3}
          className="w-full p-3 rounded-lg border border-amber-300 focus:outline-none focus:border-amber-500 resize-none"
          placeholder="Next time, you could try..."
        />
      </div>
    </div>
  );
}

function ConfidenceThermometer({
  levelColors,
  scale,
  content: _content,
}: AssessmentComponentProps) {
  const [level, setLevel] = useState<number | null>(null);
  const min = scale?.min ?? 0;
  const max = scale?.max ?? 5;
  const levels = Array.from({ length: max - min + 1 }, (_, i) => max - i);

  const emojis = ['😕', '🙂', '😊', '😄', '🤩', '🏆'];
  const labels = scale?.labels || [
    'Not confident',
    'A little confident',
    'Somewhat confident',
    'Confident',
    'Very confident',
    'Super confident!',
  ];

  return (
    <div className="confidence-thermometer py-4 flex flex-col items-center">
      {/* Thermometer */}
      <div className="relative w-20">
        {/* Bulb */}
        <div
          className="w-24 h-24 rounded-full mx-auto -mb-4 flex items-center justify-center text-3xl"
          style={{
            backgroundColor: level !== null
              ? `hsl(${(level / max) * 120}, 70%, 50%)`
              : '#E5E7EB',
          }}
        >
          {level !== null ? emojis[Math.min(level, emojis.length - 1)] : '❓'}
        </div>

        {/* Tube */}
        <div className="relative bg-gray-200 rounded-t-full w-12 mx-auto">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              className={`w-full h-12 flex items-center justify-center transition-all ${
                level !== null && lvl <= level ? '' : ''
              }`}
              style={{
                backgroundColor: level !== null && lvl <= level
                  ? `hsl(${(lvl / max) * 120}, 70%, 50%)`
                  : 'transparent',
              }}
            >
              <span className="font-bold text-white drop-shadow">{lvl}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="mt-6 flex gap-2 flex-wrap justify-center">
        {levels.reverse().map((lvl) => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              level === lvl ? 'shadow-md scale-105' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              backgroundColor: level === lvl ? levelColors.primary : '#F3F4F6',
              color: level === lvl ? 'white' : '#374151',
            }}
          >
            <span className="mr-1">{emojis[lvl] || '🔹'}</span>
            {labels[lvl] || `Level ${lvl}`}
          </button>
        ))}
      </div>

      {/* Selected message */}
      {level !== null && (
        <div
          className="mt-6 p-4 rounded-lg text-center"
          style={{ backgroundColor: levelColors.light + '20' }}
        >
          <p className="font-semibold" style={{ color: levelColors.primary }}>
            Your confidence level: {level}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {labels[level] || `Level ${level}`}
          </p>
        </div>
      )}
    </div>
  );
}
