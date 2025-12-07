'use client';

/**
 * TableOfContentsClient Component
 *
 * Client-side wrapper for TableOfContents that fetches
 * real progress data from Supabase and merges it with lesson data.
 */

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/supabase/client';
import { getWorkbookProgress } from '@/lib/supabase/progress';
import TableOfContents from './TableOfContents';
import type { GradeLevel } from '@/config/design-tokens';

interface PageMeta {
  id: string;
  title: string;
  type: 'story' | 'glossary' | 'task' | 'test' | 'assessment' | 'mindmap' | 'homework' | 'sticker';
  completed?: boolean;
}

interface LessonMeta {
  id: string;
  number: number;
  title: string;
  pages: PageMeta[];
  progress: number;
}

interface TableOfContentsClientProps {
  workbookId: string;
  lessons: Omit<LessonMeta, 'progress'>[];
  gradeLevel: GradeLevel;
}

export default function TableOfContentsClient({
  workbookId,
  lessons,
  gradeLevel,
}: TableOfContentsClientProps) {
  const [lessonsWithProgress, setLessonsWithProgress] = useState<LessonMeta[]>(
    lessons.map((l) => ({ ...l, progress: 0 }))
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const user = await getCurrentUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const progressData = await getWorkbookProgress(user.id, workbookId);

        // Create a map of completed pages
        const completedPages = new Set(
          progressData
            .filter((p) => p.status === 'completed')
            .map((p) => `${p.lesson_id}/${p.page_id}`)
        );

        // Update lessons with real progress
        const updatedLessons = lessons.map((lesson) => {
          const pagesWithCompletion = lesson.pages.map((page) => ({
            ...page,
            completed: completedPages.has(`${lesson.id}/${page.id}`),
          }));

          const completedCount = pagesWithCompletion.filter((p) => p.completed).length;
          const progress = lesson.pages.length > 0
            ? Math.round((completedCount / lesson.pages.length) * 100)
            : 0;

          return {
            ...lesson,
            pages: pagesWithCompletion,
            progress,
          };
        });

        setLessonsWithProgress(updatedLessons);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgress();
  }, [workbookId, lessons]);

  if (isLoading) {
    return <TableOfContentsSkeleton count={lessons.length} />;
  }

  return (
    <TableOfContents
      workbookId={workbookId}
      lessons={lessonsWithProgress}
      gradeLevel={gradeLevel}
    />
  );
}

function TableOfContentsSkeleton({ count }: { count: number }) {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gray-200" />
            <div className="flex-1">
              <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
