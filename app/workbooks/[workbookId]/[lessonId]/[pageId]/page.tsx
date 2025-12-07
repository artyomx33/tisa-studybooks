/**
 * Individual Page Renderer
 *
 * Renders a specific workbook page using the PageRenderer component.
 * Includes navigation controls and keyboard shortcuts.
 */

import { notFound } from 'next/navigation';
import { getWorkbookById } from '@/config/workbooks';
import PageRenderer from '@/lib/rendering/page-renderer';
import LessonNavigator from '@/components/workbook/LessonNavigator';
import PageProgressTracker from '@/components/workbook/PageProgressTracker';
import { loadPageContent, getPageIds } from '@/lib/content/loader';
import type { ContentItem } from '@/types/content';
import type { PageType } from '@/config/design-tokens';

interface PageRouteProps {
  params: Promise<{
    workbookId: string;
    lessonId: string;
    pageId: string;
  }>;
  searchParams: Promise<{ mode?: string }>;
}

export async function generateMetadata({ params }: PageRouteProps) {
  const { workbookId, lessonId, pageId } = await params;
  const workbook = getWorkbookById(workbookId);

  if (!workbook) {
    return { title: 'Page Not Found' };
  }

  return {
    title: `${pageId} | ${workbook.title}`,
    description: `${lessonId} - ${pageId}`,
  };
}

export default async function PageRoute({ params, searchParams }: PageRouteProps) {
  const { workbookId, lessonId, pageId } = await params;
  const { mode } = await searchParams;
  const workbook = getWorkbookById(workbookId);

  if (!workbook) {
    notFound();
  }

  const isTeacherMode = mode === 'teacher';

  // Try to load real content, fall back to mock if not available
  let content: ContentItem;
  let navigation: ReturnType<typeof generateMockNavigation>;

  try {
    // Load real content from markdown files
    content = await loadPageContent({
      workbookId: workbook.contentPath,
      lessonId,
      pageId,
    });

    // Get real navigation from content folder
    const pages = getPageIds(workbook.contentPath, lessonId);
    const currentIndex = pages.findIndex(p => p.startsWith(pageId.split('-')[0]));
    navigation = {
      prev: currentIndex > 0 ? { lessonId, pageId: pages[currentIndex - 1] } : null,
      next: currentIndex < pages.length - 1 ? { lessonId, pageId: pages[currentIndex + 1] } : null,
      total: pages.length,
      current: currentIndex + 1,
    };
  } catch {
    // Fall back to mock content if real content not found
    content = generateMockContent(workbookId, lessonId, pageId);
    navigation = generateMockNavigation(lessonId, pageId);
  }

  const componentType = (content.frontmatter.component_type || getComponentTypeFromPageId(pageId)) as PageType;

  return (
    <PageProgressTracker
      workbookId={workbookId}
      lessonId={lessonId}
      pageId={pageId}
      componentType={componentType}
    >
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Page Content */}
        <main className="flex-1 flex items-center justify-center p-4 print:p-0">
          <div className="w-full max-w-[210mm] print:max-w-none">
            <PageRenderer
              content={content}
              gradeLevel={workbook.gradeLevel}
              isTeacherMode={isTeacherMode}
            />
          </div>
        </main>

        {/* Navigation Footer */}
        <div className="print:hidden">
          <LessonNavigator
            workbookId={workbookId}
            lessonId={lessonId}
            currentPageId={pageId}
            prevPage={navigation.prev}
            nextPage={navigation.next}
            totalPages={navigation.total}
            currentIndex={navigation.current}
            gradeLevel={workbook.gradeLevel}
          />
        </div>
      </div>
    </PageProgressTracker>
  );
}

// Mock content generator - replace with actual content loader
function generateMockContent(
  workbookId: string,
  lessonId: string,
  pageId: string
): ContentItem {
  const componentType = getComponentTypeFromPageId(pageId);

  const baseFrontmatter = {
    component_type: componentType,
    lesson: {
      number: parseInt(lessonId.split('-')[1]) || 1,
      title: `Lesson ${lessonId}`,
    },
    block_name: 'Demo Block',
    component_number: 1,
    page_template: 'default',
    page_numbers: { start: 1 },
    workbook: {
      id: workbookId,
      grade: 'grade_3' as const,
      title: 'Demo Workbook',
    },
  };

  // Add component-specific frontmatter
  const frontmatter = addComponentSpecificFrontmatter(componentType, baseFrontmatter);

  return {
    frontmatter: frontmatter as ContentItem['frontmatter'],
    content: 'This is demo content for the page.',
    filePath: `/content/${workbookId}/${lessonId}/${pageId}.md`,
    slug: pageId,
  };
}

function getComponentTypeFromPageId(pageId: string): PageType {
  if (pageId.includes('story')) return 'story';
  if (pageId.includes('glossary')) return 'glossary';
  if (pageId.includes('remembery')) return 'task_remembery';
  if (pageId.includes('intellecta')) return 'task_intellecta';
  if (pageId.includes('practica')) return 'task_practica';
  if (pageId.includes('deducta')) return 'task_deducta';
  if (pageId.includes('critica')) return 'task_critica';
  if (pageId.includes('creatica')) return 'task_creatica';
  if (pageId.includes('test')) return 'test';
  if (pageId.includes('assessment')) return 'assessment';
  if (pageId.includes('mindmap')) return 'mindmap';
  if (pageId.includes('homework')) return 'homework';
  if (pageId.includes('sticker')) return 'sticker';
  return 'story';
}

function addComponentSpecificFrontmatter(componentType: PageType, base: Record<string, unknown>) {
  switch (componentType) {
    case 'story':
      return {
        ...base,
        layout: { style: 'letter-scroll' as const },
        story_elements: {
          setting: 'A magical kingdom',
          characters: ['King Moneybags', 'Princess Pennywise'],
          problem: 'The kingdom needs to learn about money',
        },
      };

    case 'glossary':
      return {
        ...base,
        path_style: 'winding' as const,
        terms: [
          { term: 'Money', definition: 'Something used to buy things', icon: '💰' },
          { term: 'Bank', definition: 'A place to keep money safe', icon: '🏦' },
          { term: 'Savings', definition: 'Money kept for later', icon: '🐷' },
        ],
      };

    case 'test':
      return {
        ...base,
        questions: [
          {
            number: 1,
            question: 'What is money used for?',
            type: 'multiple_choice' as const,
            options: ['Buying things', 'Eating', 'Sleeping', 'Dancing'],
          },
          {
            number: 2,
            question: 'Banks keep money safe.',
            type: 'true_false' as const,
          },
        ],
        answer_key: [
          { question: 1, answer: 'Buying things' },
          { question: 2, answer: 'true' },
        ],
      };

    case 'assessment':
      return {
        ...base,
        assessment_type: 'ladder' as const,
        scale_labels: ['Beginner', 'Learning', 'Practicing', 'Mastering', 'Expert'],
      };

    case 'mindmap':
      return {
        ...base,
        central_topic: 'Money Concepts',
        branches: [
          { label: 'Earning', children: ['Jobs', 'Allowance'] },
          { label: 'Spending', children: ['Needs', 'Wants'] },
          { label: 'Saving', children: ['Piggy Bank', 'Bank Account'] },
        ],
        editable: true,
      };

    case 'homework':
      return {
        ...base,
        mission_name: 'Money Explorer',
        objectives: [
          'Count the coins in your piggy bank',
          'Ask a parent about their job',
          'Draw something you want to save for',
        ],
        due_date_relative: 'next_lesson',
      };

    case 'sticker':
      return {
        ...base,
        stickers_needed: {
          sheet_id: 'money-basics',
          stickers: [
            { id: 'money', label: 'Money' },
            { id: 'bank', label: 'Bank' },
            { id: 'savings', label: 'Savings' },
          ],
        },
      };

    default:
      // Task types
      return {
        ...base,
        tasks: [
          {
            number: 1,
            instruction: 'Complete this activity',
            type: 'multiple_choice',
            options: ['Option A', 'Option B', 'Option C'],
          },
        ],
      };
  }
}

function generateMockNavigation(lessonId: string, pageId: string) {
  const pages = [
    '01-story',
    '02-glossary',
    '03-task-remembery',
    '04-task-intellecta',
    '05-test',
  ];

  const currentIndex = pages.indexOf(pageId);
  const current = currentIndex >= 0 ? currentIndex : 0;

  return {
    prev: current > 0 ? { lessonId, pageId: pages[current - 1] } : null,
    next: current < pages.length - 1 ? { lessonId, pageId: pages[current + 1] } : null,
    total: pages.length,
    current: current + 1,
  };
}
