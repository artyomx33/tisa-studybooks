/**
 * Individual Page Renderer
 *
 * Renders a specific workbook page using the PageRenderer component.
 * Includes navigation controls and keyboard shortcuts.
 *
 * NO MOCK DATA - content must exist or page shows error.
 */

import { notFound } from 'next/navigation';
import { getWorkbookById } from '@/config/workbooks';
import PageRenderer from '@/lib/rendering/page-renderer';
import LessonNavigator from '@/components/workbook/LessonNavigator';
import PageProgressTracker from '@/components/workbook/PageProgressTracker';
import { loadPageContent, getPageIds } from '@/lib/content/loader';
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

  // Load content - NO FALLBACKS, content must exist
  const content = await loadPageContent({
    workbookId: workbook.contentPath,
    lessonId,
    pageId,
  });

  // Get navigation from content folder
  const pages = getPageIds(workbook.contentPath, lessonId);
  const currentIndex = pages.findIndex(p => p.startsWith(pageId.split('-')[0]));

  const navigation = {
    prev: currentIndex > 0 ? { lessonId, pageId: pages[currentIndex - 1] } : null,
    next: currentIndex < pages.length - 1 ? { lessonId, pageId: pages[currentIndex + 1] } : null,
    total: pages.length,
    current: currentIndex + 1,
  };

  const componentType = content.frontmatter.component_type as PageType;

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
