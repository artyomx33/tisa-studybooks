'use client';

/**
 * StoryPage Component (Kingdom Chronicle)
 *
 * Renders story content with:
 * - Letter scroll styling for King's letters
 * - Illustration placement (left/right/center/full)
 * - Multi-page support for longer stories
 * - Narrative typography (Crimson Text)
 */

import { FONTS, OWL_COLORS, TISA_COLORS } from '@/config/design-tokens';
import type { ContentItem, StoryFrontmatter } from '@/types/content';
import type { GradeLevel } from '@/config/design-tokens';

interface StoryPageProps {
  content: ContentItem<StoryFrontmatter>;
  gradeLevel: GradeLevel;
  onComplete?: () => void;
}

export default function StoryPage({
  content,
  gradeLevel: _gradeLevel,
  onComplete: _onComplete,
}: StoryPageProps) {
  const { frontmatter, content: markdownContent } = content;
  const isLetterStyle = frontmatter.page_template === 'letter-scroll' ||
                        frontmatter.layout?.page_1 === 'letter-scroll';

  return (
    <div className="story-page h-full flex flex-col">
      {isLetterStyle ? (
        <LetterScrollContent
          content={markdownContent}
          characters={frontmatter.characters}
        />
      ) : (
        <StandardStoryContent
          content={markdownContent}
          illustration={frontmatter.illustration}
        />
      )}
    </div>
  );
}

interface LetterScrollContentProps {
  content: string;
  characters?: Array<{ name: string; role: string }>;
}

function LetterScrollContent({ content, characters }: LetterScrollContentProps) {
  // Parse content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <div className="letter-scroll flex-1 p-4">
      {/* Scroll container with parchment styling */}
      <div
        className="relative rounded-lg p-8 shadow-inner"
        style={{
          backgroundColor: '#FDF8E8',
          backgroundImage: `
            linear-gradient(to right, rgba(139, 90, 43, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 90, 43, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          border: '3px solid #D4A574',
          boxShadow: 'inset 0 0 30px rgba(139, 90, 43, 0.1)',
        }}
      >
        {/* Decorative scroll edges */}
        <div
          className="absolute top-0 left-0 right-0 h-4"
          style={{
            background: 'linear-gradient(to bottom, #D4A574, transparent)',
            opacity: 0.3,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-4"
          style={{
            background: 'linear-gradient(to top, #D4A574, transparent)',
            opacity: 0.3,
          }}
        />

        {/* Royal seal at top */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{
              backgroundColor: TISA_COLORS.gold,
              color: TISA_COLORS.charcoal,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            👑
          </div>
        </div>

        {/* Story content */}
        <div
          className="space-y-4 text-lg leading-relaxed"
          style={{
            fontFamily: FONTS.story,
            color: '#4A3728',
          }}
        >
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-justify first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Characters list if provided */}
        {characters && characters.length > 0 && (
          <div className="mt-8 pt-4 border-t border-amber-300">
            <div
              className="text-sm font-bold mb-2"
              style={{ fontFamily: FONTS.display, color: '#8B5A2B' }}
            >
              Characters in this story:
            </div>
            <div className="flex flex-wrap gap-3">
              {characters.map((char, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: 'rgba(212, 165, 116, 0.3)',
                    fontFamily: FONTS.body,
                  }}
                >
                  <span className="font-bold">{char.name}</span>
                  <span className="text-gray-600"> - {char.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Royal signature */}
        <div className="mt-8 text-right">
          <div
            className="inline-block px-4 py-2"
            style={{
              fontFamily: FONTS.accent,
              fontSize: '1.5rem',
              color: '#8B5A2B',
            }}
          >
            ~ The Royal Chronicler
          </div>
        </div>
      </div>
    </div>
  );
}

interface StandardStoryContentProps {
  content: string;
  illustration?: {
    src: string;
    alt: string;
    position?: 'left' | 'right' | 'center' | 'full';
  };
}

function StandardStoryContent({ content, illustration }: StandardStoryContentProps) {
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  const position = illustration?.position || 'right';

  return (
    <div className="standard-story flex-1 p-4">
      {/* Full-width illustration */}
      {illustration && position === 'full' && (
        <div className="mb-6 rounded-lg overflow-hidden shadow-md">
          <div
            className="w-full h-48 bg-gray-200 flex items-center justify-center"
            style={{ backgroundColor: OWL_COLORS.creatica.bg }}
          >
            <span className="text-gray-500 text-sm">
              [Illustration: {illustration.alt}]
            </span>
          </div>
        </div>
      )}

      {/* Content with side illustration */}
      <div className={`flex gap-6 ${position === 'left' ? 'flex-row-reverse' : ''}`}>
        {/* Text content */}
        <div className="flex-1">
          <div
            className="space-y-4 text-lg leading-relaxed"
            style={{
              fontFamily: FONTS.story,
              color: TISA_COLORS.charcoal,
            }}
          >
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Side illustration */}
        {illustration && (position === 'left' || position === 'right') && (
          <div className="w-1/3 flex-shrink-0">
            <div
              className="rounded-lg overflow-hidden shadow-md h-full min-h-[200px] flex items-center justify-center"
              style={{ backgroundColor: OWL_COLORS.creatica.bg }}
            >
              <span className="text-gray-500 text-sm text-center p-4">
                [Illustration: {illustration.alt}]
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Center illustration */}
      {illustration && position === 'center' && (
        <div className="mt-6 flex justify-center">
          <div
            className="w-2/3 rounded-lg overflow-hidden shadow-md h-48 flex items-center justify-center"
            style={{ backgroundColor: OWL_COLORS.creatica.bg }}
          >
            <span className="text-gray-500 text-sm">
              [Illustration: {illustration.alt}]
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
