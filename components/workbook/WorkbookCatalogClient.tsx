'use client';

/**
 * WorkbookCatalogClient Component
 *
 * Client-side wrapper for the workbook catalog that fetches
 * real progress data from Supabase for each workbook.
 */

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/supabase/client';
import { getWorkbooksProgressSummary } from '@/lib/supabase/progress';
import WorkbookCard from './WorkbookCard';
import type { WorkbookMeta } from '@/config/workbooks';

interface WorkbookCatalogClientProps {
  workbooks: WorkbookMeta[];
}

export default function WorkbookCatalogClient({ workbooks }: WorkbookCatalogClientProps) {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const user = await getCurrentUser();
        if (!user) {
          setIsLoading(false);
          return;
        }

        const workbookIds = workbooks.map((w) => w.id);
        const summary = await getWorkbooksProgressSummary(user.id, workbookIds);

        // Calculate percentages based on completed pages vs total pages
        const percentages: Record<string, number> = {};
        for (const wb of workbooks) {
          const data = summary[wb.id];
          if (data && wb.totalPages > 0) {
            percentages[wb.id] = Math.round((data.completed / wb.totalPages) * 100);
          } else {
            percentages[wb.id] = 0;
          }
        }

        setProgressMap(percentages);
      } catch (error) {
        console.error('Error fetching workbook progress:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgress();
  }, [workbooks]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workbooks.map((workbook) => (
          <WorkbookCardSkeleton key={workbook.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workbooks.map((workbook) => (
        <WorkbookCard
          key={workbook.id}
          workbook={workbook}
          progress={progressMap[workbook.id] || 0}
        />
      ))}
    </div>
  );
}

function WorkbookCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200 animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-2 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
}
