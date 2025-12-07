'use client';

/**
 * GlossaryPage Component (Wisdom Path)
 *
 * Renders glossary terms with:
 * - Winding SVG path connecting terms
 * - Term cards with definitions
 * - Visual flow from term to term
 * - Optional examples for each term
 */

import { FONTS, LEVEL_COLORS } from '@/config/design-tokens';
import type { ContentItem, GlossaryFrontmatter } from '@/types/content';
import type { GradeLevel } from '@/config/design-tokens';

interface GlossaryPageProps {
  content: ContentItem<GlossaryFrontmatter>;
  gradeLevel: GradeLevel;
  onComplete?: () => void;
}

export default function GlossaryPage({
  content,
  gradeLevel,
  onComplete: _onComplete,
}: GlossaryPageProps) {
  const { frontmatter } = content;
  const terms = frontmatter.terms || [];
  const levelColors = LEVEL_COLORS[gradeLevel];
  const pathStyle = frontmatter.path_style || 'winding';

  return (
    <div className="glossary-page h-full flex flex-col p-4">
      {/* Path Header */}
      <div className="text-center mb-6">
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: FONTS.display, color: levelColors.primary }}
        >
          Follow the Wisdom Path
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Learn these key terms to unlock your knowledge!
        </p>
      </div>

      {/* Terms with Path */}
      <div className="flex-1 relative">
        {pathStyle === 'winding' ? (
          <WindingPath terms={terms} levelColors={levelColors} />
        ) : pathStyle === 'circular' ? (
          <CircularPath terms={terms} levelColors={levelColors} />
        ) : (
          <StraightPath terms={terms} levelColors={levelColors} />
        )}
      </div>
    </div>
  );
}

interface PathProps {
  terms: Array<{ term: string; definition: string; example?: string }>;
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
}

function WindingPath({ terms, levelColors }: PathProps) {
  return (
    <div className="winding-path relative">
      {/* SVG Path Background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 600 800"
        preserveAspectRatio="none"
      >
        <path
          d={generateWindingPath(terms.length)}
          fill="none"
          stroke={levelColors.light}
          strokeWidth="4"
          strokeDasharray="10 5"
          opacity="0.5"
        />
      </svg>

      {/* Term Cards */}
      <div className="relative z-10 space-y-4">
        {terms.map((item, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <TermCard
              term={item.term}
              definition={item.definition}
              example={item.example}
              index={index + 1}
              levelColors={levelColors}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CircularPath({ terms, levelColors }: PathProps) {
  return (
    <div className="circular-path flex flex-wrap justify-center gap-4">
      {terms.map((item, index) => (
        <div key={index} className="w-[45%]">
          <TermCard
            term={item.term}
            definition={item.definition}
            example={item.example}
            index={index + 1}
            levelColors={levelColors}
          />
        </div>
      ))}
    </div>
  );
}

function StraightPath({ terms, levelColors }: PathProps) {
  return (
    <div className="straight-path space-y-4">
      {terms.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          {/* Connector line */}
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: levelColors.primary }}
            >
              {index + 1}
            </div>
            {index < terms.length - 1 && (
              <div
                className="w-1 flex-1 min-h-[20px]"
                style={{ backgroundColor: levelColors.light }}
              />
            )}
          </div>

          {/* Term card */}
          <div className="flex-1">
            <TermCard
              term={item.term}
              definition={item.definition}
              example={item.example}
              index={index + 1}
              levelColors={levelColors}
              showNumber={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface TermCardProps {
  term: string;
  definition: string;
  example?: string;
  index: number;
  levelColors: typeof LEVEL_COLORS[keyof typeof LEVEL_COLORS];
  showNumber?: boolean;
}

function TermCard({
  term,
  definition,
  example,
  index,
  levelColors,
  showNumber = true,
}: TermCardProps) {
  return (
    <div
      className="term-card bg-white rounded-lg shadow-md p-4 max-w-[280px] border-l-4"
      style={{ borderLeftColor: levelColors.primary }}
    >
      {/* Term header */}
      <div className="flex items-start gap-2 mb-2">
        {showNumber && (
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ backgroundColor: levelColors.accent }}
          >
            {index}
          </span>
        )}
        <h3
          className="font-bold text-lg"
          style={{ fontFamily: FONTS.display, color: levelColors.primary }}
        >
          {term}
        </h3>
      </div>

      {/* Definition */}
      <p
        className="text-sm text-gray-700 leading-relaxed"
        style={{ fontFamily: FONTS.body }}
      >
        {definition}
      </p>

      {/* Example if provided */}
      {example && (
        <div
          className="mt-3 p-2 rounded text-sm italic"
          style={{
            backgroundColor: levelColors.light + '20',
            color: levelColors.dark,
          }}
        >
          <span className="font-semibold">Example: </span>
          {example}
        </div>
      )}
    </div>
  );
}

/**
 * Generate SVG path for winding effect
 */
function generateWindingPath(termCount: number): string {
  const segments: string[] = ['M 50 50'];
  const height = 800;
  const segmentHeight = height / (termCount + 1);

  for (let i = 0; i < termCount; i++) {
    const y = segmentHeight * (i + 1);
    const x = i % 2 === 0 ? 550 : 50;
    const cx1 = i % 2 === 0 ? 300 : 300;
    const cy1 = y - segmentHeight / 2;

    segments.push(`Q ${cx1} ${cy1} ${x} ${y}`);
  }

  return segments.join(' ');
}
