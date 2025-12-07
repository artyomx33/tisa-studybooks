'use client';

/**
 * TestPage Component (Royal Checkpoint)
 *
 * Renders test/quiz content with:
 * - Multiple question types (multiple choice, true/false, fill blank, short answer)
 * - Score tracking
 * - Answer key visibility (teacher mode)
 * - Time limit display (optional)
 */

import { useState } from 'react';
import { FONTS, LEVEL_COLORS, TISA_COLORS } from '@/config/design-tokens';
import type { ContentItem, TestFrontmatter } from '@/types/content';
import type { GradeLevel } from '@/config/design-tokens';

interface TestPageProps {
  content: ContentItem<TestFrontmatter>;
  gradeLevel: GradeLevel;
  isTeacherMode?: boolean;
  onComplete?: () => void;
  onSubmit?: (answers: Record<number, unknown>) => void;
}

export default function TestPage({
  content,
  gradeLevel,
  isTeacherMode = false,
  onComplete: _onComplete,
  onSubmit: _onSubmit,
}: TestPageProps) {
  const { frontmatter } = content;
  const questions = frontmatter.questions || [];
  const answerKey = frontmatter.answer_key;
  const timeLimit = frontmatter.time_limit_minutes;
  const levelColors = LEVEL_COLORS[gradeLevel];

  const [answers, setAnswers] = useState<Record<number, unknown>>({});

  const handleAnswerChange = (questionNum: number, value: unknown) => {
    setAnswers(prev => ({ ...prev, [questionNum]: value }));
  };

  return (
    <div className="test-page h-full flex flex-col p-4">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-4 p-4 rounded-lg"
        style={{ backgroundColor: levelColors.light + '20' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: TISA_COLORS.gold }}
          >
            👑
          </div>
          <div>
            <h2
              className="font-bold text-lg"
              style={{ fontFamily: FONTS.display, color: levelColors.primary }}
            >
              Royal Checkpoint
            </h2>
            <p className="text-sm text-gray-600">
              {questions.length} questions
              {timeLimit && ` • ${timeLimit} minutes`}
            </p>
          </div>
        </div>

        {/* Teacher mode badge */}
        {isTeacherMode && (
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            👁️ Teacher Mode
          </div>
        )}
      </div>

      {/* Questions */}
      <div className="flex-1 space-y-6 overflow-auto">
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            index={index}
            levelColors={levelColors}
            isTeacherMode={isTeacherMode}
            answer={answerKey?.find(a => a.question === question.number)?.answer}
            userAnswer={answers[question.number]}
            onAnswerChange={(value) => handleAnswerChange(question.number, value)}
          />
        ))}
      </div>

      {/* Submit button */}
      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Answered: {Object.keys(answers).length} / {questions.length}
        </div>
        <button
          className="px-6 py-2 rounded-lg font-semibold text-white transition-colors"
          style={{ backgroundColor: levelColors.primary }}
        >
          Submit Test
        </button>
      </div>
    </div>
  );
}

interface QuestionCardProps {
  question: {
    number: number;
    question: string;
    type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer';
    options?: string[];
    correct?: string | number;
  };
  index: number;
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
  isTeacherMode: boolean;
  answer?: string | string[];
  userAnswer?: unknown;
  onAnswerChange: (value: unknown) => void;
}

function QuestionCard({
  question,
  index,
  levelColors,
  isTeacherMode,
  answer,
  userAnswer,
  onAnswerChange,
}: QuestionCardProps) {
  return (
    <div className="question-card bg-white rounded-lg shadow-sm border p-4">
      {/* Question header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
          style={{ backgroundColor: levelColors.primary }}
        >
          {index + 1}
        </div>
        <p
          className="text-gray-800 font-medium leading-relaxed"
          style={{ fontFamily: FONTS.body }}
        >
          {question.question}
        </p>
      </div>

      {/* Answer section based on type */}
      <div className="ml-11">
        {question.type === 'multiple_choice' && (
          <MultipleChoiceQuestion
            options={question.options || []}
            levelColors={levelColors}
            value={userAnswer as string}
            onChange={onAnswerChange}
          />
        )}

        {question.type === 'true_false' && (
          <TrueFalseQuestion
            levelColors={levelColors}
            value={userAnswer as boolean}
            onChange={onAnswerChange}
          />
        )}

        {question.type === 'fill_blank' && (
          <FillBlankQuestion
            levelColors={levelColors}
            value={userAnswer as string}
            onChange={onAnswerChange}
          />
        )}

        {question.type === 'short_answer' && (
          <ShortAnswerQuestion
            levelColors={levelColors}
            value={userAnswer as string}
            onChange={onAnswerChange}
          />
        )}

        {/* Answer key (teacher mode) */}
        {isTeacherMode && answer && (
          <div
            className="mt-3 p-3 rounded-lg border-l-4 text-sm"
            style={{
              backgroundColor: '#ECFDF5',
              borderLeftColor: '#10B981',
            }}
          >
            <span className="font-semibold text-green-800">✓ Correct Answer: </span>
            <span className="text-green-700">
              {Array.isArray(answer) ? answer.join(', ') : String(answer)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function MultipleChoiceQuestion({
  options,
  levelColors,
  value,
  onChange,
}: {
  options: string[];
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <label
          key={index}
          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
            value === option ? 'border-2' : ''
          }`}
          style={{
            borderColor: value === option ? levelColors.primary : '#E5E7EB',
            backgroundColor: value === option ? levelColors.light + '10' : 'white',
          }}
        >
          <input
            type="radio"
            name={`question-${index}`}
            checked={value === option}
            onChange={() => onChange(option)}
            className="w-4 h-4"
            style={{ accentColor: levelColors.primary }}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function TrueFalseQuestion({
  levelColors,
  value,
  onChange,
}: {
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
  value?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex gap-4">
      {[
        { label: 'True', val: true, icon: '✓' },
        { label: 'False', val: false, icon: '✗' },
      ].map((option) => (
        <button
          key={option.label}
          onClick={() => onChange(option.val)}
          className={`flex-1 p-4 rounded-lg border-2 font-semibold transition-all ${
            value === option.val ? '' : 'hover:bg-gray-50'
          }`}
          style={{
            borderColor: value === option.val ? levelColors.primary : '#E5E7EB',
            backgroundColor: value === option.val ? levelColors.light + '20' : 'white',
            color: value === option.val ? levelColors.primary : '#6B7280',
          }}
        >
          <span className="text-xl mr-2">{option.icon}</span>
          {option.label}
        </button>
      ))}
    </div>
  );
}

function FillBlankQuestion({
  levelColors,
  value,
  onChange,
}: {
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer..."
      className="w-full p-3 rounded-lg border-2 focus:outline-none transition-colors"
      style={{
        borderColor: value ? levelColors.primary : '#E5E7EB',
      }}
    />
  );
}

function ShortAnswerQuestion({
  levelColors,
  value,
  onChange,
}: {
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      placeholder="Write your answer here..."
      className="w-full p-3 rounded-lg border-2 focus:outline-none resize-none transition-colors"
      style={{
        borderColor: value ? levelColors.primary : '#E5E7EB',
      }}
    />
  );
}
