'use client';

/**
 * TaskPage Component (Base for all Owl Task Types)
 *
 * Unified task page that renders different interactive elements
 * based on the owl type (Remembery, Intellecta, Practica, Deducta, Critica, Creatica).
 *
 * Each owl type has its own color scheme and interaction patterns.
 */

import { FONTS, OWL_COLORS } from '@/config/design-tokens';
import type { ContentItem, TaskFrontmatter } from '@/types/content';
import type { GradeLevel, OwlType } from '@/config/design-tokens';

interface TaskPageProps {
  content: ContentItem<TaskFrontmatter>;
  gradeLevel: GradeLevel;
  owlType: OwlType;
  isTeacherMode?: boolean;
  onComplete?: () => void;
  onTaskComplete?: (taskNumber: number, answer: unknown) => void;
}

export default function TaskPage({
  content,
  gradeLevel: _gradeLevel,
  owlType,
  isTeacherMode = false,
  onComplete: _onComplete,
  onTaskComplete: _onTaskComplete,
}: TaskPageProps) {
  const { frontmatter, content: markdownContent } = content;
  const owlConfig = OWL_COLORS[owlType];
  const tasks = frontmatter.tasks || [];
  const answerKey = frontmatter.answer_key;

  return (
    <div className="task-page h-full flex flex-col p-4">
      {/* Owl Badge Header */}
      <div
        className="flex items-center gap-3 mb-4 p-3 rounded-lg"
        style={{ backgroundColor: owlConfig.bg }}
      >
        <OwlAvatar owlType={owlType} />
        <div>
          <h2
            className="font-bold text-lg"
            style={{ fontFamily: FONTS.display, color: owlConfig.color }}
          >
            {owlConfig.name} Challenge
          </h2>
          <p className="text-sm text-gray-600">{owlConfig.description}</p>
        </div>
      </div>

      {/* Teacher Mode Indicator */}
      {isTeacherMode && answerKey && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-yellow-800 font-semibold text-sm">
            <span>👁️</span> Teacher Mode - Answer Key Visible
          </div>
        </div>
      )}

      {/* Instructions from markdown */}
      {markdownContent && (
        <div
          className="mb-4 p-4 bg-gray-50 rounded-lg text-gray-700"
          style={{ fontFamily: FONTS.body }}
        >
          <div className="whitespace-pre-wrap">{markdownContent}</div>
        </div>
      )}

      {/* Tasks */}
      <div className="flex-1 space-y-4 overflow-auto">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            owlType={owlType}
            owlConfig={owlConfig}
            isTeacherMode={isTeacherMode}
            answer={answerKey?.find(a => a.question === task.number)?.answer}
          />
        ))}
      </div>
    </div>
  );
}

interface TaskItemProps {
  task: {
    number: number;
    instruction: string;
    type: string;
    data?: Record<string, unknown>;
  };
  owlType: OwlType;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
  isTeacherMode: boolean;
  answer?: string | string[];
}

function TaskItem({ task, owlType, owlConfig, isTeacherMode, answer }: TaskItemProps) {
  return (
    <div
      className="task-item bg-white rounded-lg shadow-sm border p-4"
      style={{ borderColor: owlConfig.color + '40' }}
    >
      {/* Task header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
          style={{ backgroundColor: owlConfig.color }}
        >
          {task.number}
        </div>
        <p
          className="text-gray-800 leading-relaxed"
          style={{ fontFamily: FONTS.body }}
        >
          {task.instruction}
        </p>
      </div>

      {/* Interactive element based on task type */}
      <div className="ml-11">
        <TaskInteraction
          type={task.type}
          data={task.data}
          owlType={owlType}
          owlConfig={owlConfig}
        />

        {/* Answer key (teacher mode) */}
        {isTeacherMode && answer && (
          <div
            className="mt-3 p-2 rounded border-l-4 text-sm"
            style={{
              backgroundColor: '#FEF3C7',
              borderLeftColor: '#F59E0B',
            }}
          >
            <span className="font-semibold">Answer: </span>
            {Array.isArray(answer) ? answer.join(', ') : answer}
          </div>
        )}
      </div>
    </div>
  );
}

interface TaskInteractionProps {
  type: string;
  data?: Record<string, unknown>;
  owlType: OwlType;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}

function TaskInteraction({ type, data, owlType, owlConfig }: TaskInteractionProps) {
  switch (type) {
    case 'multiple_choice':
      return <MultipleChoiceInteraction data={data} owlConfig={owlConfig} />;

    case 'fill_blank':
      return <FillBlankInteraction data={data} owlConfig={owlConfig} />;

    case 'matching':
      return <MatchingInteraction data={data} owlConfig={owlConfig} />;

    case 'text_input':
      return <TextInputInteraction data={data} owlConfig={owlConfig} />;

    case 'drawing':
      return <DrawingInteraction owlConfig={owlConfig} />;

    case 'table_fill':
      return <TableFillInteraction data={data} owlConfig={owlConfig} />;

    case 'ranking':
      return <RankingInteraction data={data} owlConfig={owlConfig} />;

    case 'categorize':
      return <CategorizeInteraction data={data} owlConfig={owlConfig} />;

    default:
      return (
        <div
          className="p-4 rounded-lg border-2 border-dashed text-center text-gray-500"
          style={{ borderColor: owlConfig.color + '40' }}
        >
          Interactive element: {type}
          <br />
          <span className="text-xs">({owlType} task)</span>
        </div>
      );
  }
}

// Interactive component implementations

function MultipleChoiceInteraction({
  data,
  owlConfig,
}: {
  data?: Record<string, unknown>;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}) {
  const options = (data?.options as string[]) || ['Option A', 'Option B', 'Option C'];

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <label
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
          style={{ borderColor: owlConfig.color + '30' }}
        >
          <input
            type="radio"
            name="choice"
            className="w-4 h-4"
            style={{ accentColor: owlConfig.color }}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function FillBlankInteraction({
  data,
  owlConfig,
}: {
  data?: Record<string, unknown>;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}) {
  const blanks = (data?.blanks as number) || 1;

  return (
    <div className="space-y-3">
      {Array.from({ length: blanks }).map((_, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Answer ${index + 1}...`}
          className="w-full p-3 rounded-lg border-2 focus:outline-none transition-colors"
          style={{
            borderColor: owlConfig.color + '40',
          }}
        />
      ))}
    </div>
  );
}

function MatchingInteraction({
  data,
  owlConfig,
}: {
  data?: Record<string, unknown>;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}) {
  const leftItems = (data?.left as string[]) || ['Term 1', 'Term 2', 'Term 3'];
  const rightItems = (data?.right as string[]) || ['Definition A', 'Definition B', 'Definition C'];

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-2">
        {leftItems.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-lg text-center font-medium"
            style={{ backgroundColor: owlConfig.bg, color: owlConfig.color }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2">
        {rightItems.map((item, index) => (
          <div
            key={index}
            className="p-3 rounded-lg border-2 border-dashed text-center"
            style={{ borderColor: owlConfig.color + '40' }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function TextInputInteraction({
  data,
  owlConfig,
}: {
  data?: Record<string, unknown>;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}) {
  const rows = (data?.rows as number) || 4;

  return (
    <textarea
      rows={rows}
      placeholder="Write your answer here..."
      className="w-full p-3 rounded-lg border-2 focus:outline-none resize-none transition-colors"
      style={{ borderColor: owlConfig.color + '40' }}
    />
  );
}

function DrawingInteraction({
  owlConfig,
}: {
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}) {
  return (
    <div
      className="h-48 rounded-lg border-2 border-dashed flex items-center justify-center"
      style={{
        borderColor: owlConfig.color,
        backgroundColor: owlConfig.bg,
      }}
    >
      <div className="text-center text-gray-500">
        <span className="text-3xl">🎨</span>
        <p className="mt-2">Drawing canvas</p>
        <p className="text-xs">(Full implementation with react-sketch-canvas)</p>
      </div>
    </div>
  );
}

function TableFillInteraction({
  data,
  owlConfig,
}: {
  data?: Record<string, unknown>;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}) {
  const columns = (data?.columns as string[]) || ['Column 1', 'Column 2'];
  const rows = (data?.rows as number) || 3;

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={index}
              className="p-2 text-left font-semibold text-white"
              style={{ backgroundColor: owlConfig.color }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((_, colIndex) => (
              <td
                key={colIndex}
                className="p-2 border"
                style={{ borderColor: owlConfig.color + '40' }}
              >
                <input
                  type="text"
                  className="w-full p-1 bg-transparent focus:outline-none"
                  placeholder="..."
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function RankingInteraction({
  data,
  owlConfig,
}: {
  data?: Record<string, unknown>;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}) {
  const items = (data?.items as string[]) || ['Item 1', 'Item 2', 'Item 3'];

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg border cursor-move"
          style={{ borderColor: owlConfig.color + '40' }}
        >
          <span
            className="w-6 h-6 rounded flex items-center justify-center text-sm font-bold text-white"
            style={{ backgroundColor: owlConfig.color }}
          >
            {index + 1}
          </span>
          <span>{item}</span>
          <span className="ml-auto text-gray-400">⋮⋮</span>
        </div>
      ))}
    </div>
  );
}

function CategorizeInteraction({
  data,
  owlConfig,
}: {
  data?: Record<string, unknown>;
  owlConfig: typeof OWL_COLORS[keyof typeof OWL_COLORS];
}) {
  const categories = (data?.categories as string[]) || ['Category A', 'Category B'];

  return (
    <div className="flex gap-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex-1 p-4 rounded-lg border-2 border-dashed min-h-[120px]"
          style={{
            borderColor: owlConfig.color,
            backgroundColor: owlConfig.bg,
          }}
        >
          <div
            className="font-semibold text-center mb-2 pb-2 border-b"
            style={{ borderColor: owlConfig.color + '40' }}
          >
            {category}
          </div>
          <div className="text-center text-gray-400 text-sm">
            Drop items here
          </div>
        </div>
      ))}
    </div>
  );
}

// Owl Avatar Component
function OwlAvatar({ owlType }: { owlType: OwlType }) {
  const owlEmojis: Record<OwlType, string> = {
    remembery: '🦉',
    intellecta: '🧠',
    practica: '🔧',
    deducta: '🔍',
    critica: '⚖️',
    creatica: '🎨',
  };

  const config = OWL_COLORS[owlType];

  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
      style={{
        backgroundColor: config.bg,
        border: `2px solid ${config.color}`,
      }}
    >
      {owlEmojis[owlType]}
    </div>
  );
}
