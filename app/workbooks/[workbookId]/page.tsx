/**
 * Workbook Table of Contents Page
 *
 * Displays all lessons in a workbook with:
 * - Lesson list with progress indicators
 * - Workbook cover/header
 * - Navigation back to catalog
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWorkbookById } from '@/config/workbooks';
import { LEVEL_COLORS, FONTS, TISA_COLORS } from '@/config/design-tokens';
import TableOfContentsClient from '@/components/workbook/TableOfContentsClient';

interface WorkbookPageProps {
  params: Promise<{ workbookId: string }>;
}

export async function generateMetadata({ params }: WorkbookPageProps) {
  const { workbookId } = await params;
  const workbook = getWorkbookById(workbookId);

  if (!workbook) {
    return { title: 'Workbook Not Found' };
  }

  return {
    title: `${workbook.title} | TISAverse Studybooks`,
    description: workbook.description,
  };
}

export default async function WorkbookPage({ params }: WorkbookPageProps) {
  const { workbookId } = await params;
  const workbook = getWorkbookById(workbookId);

  if (!workbook) {
    notFound();
  }

  const levelColors = LEVEL_COLORS[workbook.gradeLevel];

  // Mock lessons data - in production, this would come from content loader
  const lessons = generateMockLessons(workbook.totalLessons);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="py-8 px-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${levelColors.primary}, ${levelColors.dark})`,
        }}
      >
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="header-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="white" />
            </pattern>
            <rect width="100" height="100" fill="url(#header-pattern)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back link */}
          <Link
            href="/workbooks"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <span>←</span>
            <span>Back to Catalog</span>
          </Link>

          <div className="flex items-start gap-6">
            {/* Workbook Icon */}
            <div
              className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl shadow-lg"
              style={{ backgroundColor: TISA_COLORS.gold }}
            >
              {getWorkbookEmoji(workbook.grade)}
            </div>

            <div className="flex-1">
              {/* Grade badge */}
              <div
                className="inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-2"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                Grade {workbook.grade}
              </div>

              <h1
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: FONTS.display }}
              >
                {workbook.title}
              </h1>

              <p className="text-white/80">{workbook.description}</p>

              {/* Stats */}
              <div className="flex gap-4 mt-4">
                <div className="bg-white/10 px-3 py-1 rounded-lg text-white text-sm">
                  {workbook.totalLessons} Lessons
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-lg text-white text-sm">
                  {workbook.totalPages} Pages
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <TableOfContentsClient
          workbookId={workbook.id}
          lessons={lessons}
          gradeLevel={workbook.gradeLevel}
        />
      </main>
    </div>
  );
}

function getWorkbookEmoji(grade: number): string {
  const emojis: Record<number, string> = {
    2: '🎨',
    3: '📖',
    4: '💡',
    5: '🏢',
    6: '🔌',
    7: '🚀',
  };
  return emojis[grade] || '📚';
}

// Mock function - in production, this would load from content files
// Progress is handled by TableOfContentsClient via Supabase
function generateMockLessons(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `lesson-${String(i + 1).padStart(2, '0')}`,
    number: i + 1,
    title: `Lesson ${i + 1}`,
    pages: [
      { id: '01-story', title: 'Kingdom Chronicle', type: 'story' as const },
      { id: '02-glossary', title: 'Wisdom Path', type: 'glossary' as const },
      { id: '03-task-remembery', title: 'Owl Remembery', type: 'task' as const },
      { id: '04-task-intellecta', title: 'Owl Intellecta', type: 'task' as const },
      { id: '05-test', title: 'Royal Checkpoint', type: 'test' as const },
    ],
  }));
}
