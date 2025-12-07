/**
 * Workbook Table of Contents Page
 *
 * Displays all lessons in a workbook with:
 * - Lesson list with progress indicators
 * - Workbook cover/header
 * - Navigation back to catalog
 *
 * NO MOCK DATA - content must exist or page shows error.
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWorkbookById } from '@/config/workbooks';
import { LEVEL_COLORS, FONTS, TISA_COLORS } from '@/config/design-tokens';
import TableOfContentsClient from '@/components/workbook/TableOfContentsClient';
import { getLessonIds, getPageIds } from '@/lib/content/loader';

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

  // Load lessons from content folder - NO FALLBACKS
  const lessonIds = getLessonIds(workbook.contentPath);
  const lessons = lessonIds.map((lessonId) => {
    const pageIds = getPageIds(workbook.contentPath, lessonId);
    const lessonNumber = parseInt(lessonId.replace('lesson-', '').split('-')[0], 10) || 0;
    const lessonTitle = lessonId.replace('lesson-', '').split('-').slice(1).join('-');

    return {
      id: lessonId,
      number: lessonNumber,
      title: formatLessonTitle(lessonTitle, lessonNumber),
      pages: pageIds.map((pageId) => ({
        id: pageId,
        title: formatPageTitle(pageId),
        type: getPageType(pageId),
      })),
    };
  });

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
                  {lessons.length} Lessons
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-lg text-white text-sm">
                  {lessons.reduce((acc, l) => acc + l.pages.length, 0)} Pages
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

// Format lesson title from folder name
function formatLessonTitle(folderName: string, lessonNumber: number): string {
  const titleMap: Record<string, string> = {
    'money': 'Money',
    'production': 'Production',
    'consumption': 'Consumption',
    'trade-market': 'Trade & Market',
    'wealth': 'Wealth',
    'division-of-labour': 'Division of Labour',
    'insurance': 'Insurance',
    'entrepreneurship': 'Entrepreneurship',
    'finance': 'Finance',
  };

  return titleMap[folderName] || `Lesson ${lessonNumber}: ${folderName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`;
}

// Format page title from file name
function formatPageTitle(pageId: string): string {
  const titleMap: Record<string, string> = {
    'story': '🏰 Kingdom Chronicle',
    'glossary': '📚 Wisdom Path',
    'task-remembery': '🦉 Owl Remembery',
    'task-intellecta': '🦉 Owl Intellecta',
    'task-practica': '🦉 Owl Practica',
    'task-deducta': '🦉 Owl Deducta',
    'task-critica': '🦉 Owl Critica',
    'task-creatica': '🎨 Owl Creatica',
    'test': '✅ Royal Checkpoint',
    'mindmap': '🧠 Mind Map',
    'homework': '📝 Home Mission',
    'assessment': '📊 Self Assessment',
  };

  // Extract page type from filename (e.g., "01-story" -> "story")
  const pageType = pageId.replace(/^\d+-/, '');
  return titleMap[pageType] || pageType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Get page type from filename
function getPageType(pageId: string): 'story' | 'glossary' | 'task' | 'test' | 'assessment' {
  if (pageId.includes('story')) return 'story';
  if (pageId.includes('glossary')) return 'glossary';
  if (pageId.includes('task')) return 'task';
  if (pageId.includes('test')) return 'test';
  if (pageId.includes('assessment') || pageId.includes('mindmap') || pageId.includes('homework')) return 'assessment';
  return 'task';
}
