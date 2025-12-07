/**
 * Progress Tracking Functions
 *
 * Functions for tracking student progress through workbooks.
 * Handles page completion, time tracking, and progress queries.
 *
 * Table: progress-books (suffixed to avoid conflicts with other apps)
 */

import { supabase, isSupabaseConfigured } from './client';
import type { CompletionData } from './types';

// Define the progress row type inline for simplicity
interface ProgressRow {
  id: string;
  user_id: string;
  workbook_id: string;
  lesson_id: string;
  page_id: string;
  component_type: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completion_data: Record<string, unknown> | null;
  started_at: string | null;
  completed_at: string | null;
  time_spent_seconds: number;
  created_at: string;
  updated_at: string;
}

const TABLE_NAME = 'progress-books';

/**
 * Get progress for a specific page
 */
export async function getPageProgress(
  userId: string,
  workbookId: string,
  lessonId: string,
  pageId: string
): Promise<ProgressRow | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .eq('workbook_id', workbookId)
    .eq('lesson_id', lessonId)
    .eq('page_id', pageId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching page progress:', error);
  }

  return data as ProgressRow | null;
}

/**
 * Get all progress for a lesson
 */
export async function getLessonProgress(
  userId: string,
  workbookId: string,
  lessonId: string
): Promise<ProgressRow[]> {
  if (!isSupabaseConfigured() || !supabase) return [];

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .eq('workbook_id', workbookId)
    .eq('lesson_id', lessonId)
    .order('page_id');

  if (error) {
    console.error('Error fetching lesson progress:', error);
    return [];
  }

  return (data as ProgressRow[]) || [];
}

/**
 * Get all progress for a workbook
 */
export async function getWorkbookProgress(
  userId: string,
  workbookId: string
): Promise<ProgressRow[]> {
  if (!isSupabaseConfigured() || !supabase) return [];

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .eq('user_id', userId)
    .eq('workbook_id', workbookId)
    .order('lesson_id')
    .order('page_id');

  if (error) {
    console.error('Error fetching workbook progress:', error);
    return [];
  }

  return (data as ProgressRow[]) || [];
}

/**
 * Calculate workbook completion percentage
 */
export async function getWorkbookCompletionPercent(
  userId: string,
  workbookId: string,
  totalPages: number
): Promise<number> {
  if (!isSupabaseConfigured() || !supabase || totalPages === 0) return 0;

  const { count, error } = await supabase
    .from(TABLE_NAME)
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('workbook_id', workbookId)
    .eq('status', 'completed');

  if (error) {
    console.error('Error calculating completion:', error);
    return 0;
  }

  return Math.round(((count || 0) / totalPages) * 100);
}

/**
 * Start a page (mark as in_progress)
 */
export async function startPage(
  userId: string,
  workbookId: string,
  lessonId: string,
  pageId: string,
  componentType: string
): Promise<ProgressRow | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  const now = new Date().toISOString();

  const progressData = {
    user_id: userId,
    workbook_id: workbookId,
    lesson_id: lessonId,
    page_id: pageId,
    component_type: componentType,
    status: 'in_progress' as const,
    started_at: now,
    time_spent_seconds: 0,
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .upsert(progressData, {
      onConflict: 'user_id,workbook_id,lesson_id,page_id',
    })
    .select()
    .single();

  if (error) {
    console.error('Error starting page:', error);
    return null;
  }

  return data as ProgressRow | null;
}

/**
 * Complete a page
 */
export async function completePage(
  userId: string,
  workbookId: string,
  lessonId: string,
  pageId: string,
  componentType: string,
  completionData?: CompletionData,
  timeSpentSeconds?: number
): Promise<ProgressRow | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  const now = new Date().toISOString();

  const progressData = {
    user_id: userId,
    workbook_id: workbookId,
    lesson_id: lessonId,
    page_id: pageId,
    component_type: componentType,
    status: 'completed' as const,
    completed_at: now,
    completion_data: completionData as Record<string, unknown> | undefined,
    time_spent_seconds: timeSpentSeconds || 0,
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .upsert(progressData, {
      onConflict: 'user_id,workbook_id,lesson_id,page_id',
    })
    .select()
    .single();

  if (error) {
    console.error('Error completing page:', error);
    return null;
  }

  return data as ProgressRow | null;
}

/**
 * Update time spent on a page
 */
export async function updateTimeSpent(
  userId: string,
  workbookId: string,
  lessonId: string,
  pageId: string,
  additionalSeconds: number
): Promise<void> {
  if (!isSupabaseConfigured() || !supabase) return;

  // First get current time
  const { data: current } = await supabase
    .from(TABLE_NAME)
    .select('time_spent_seconds')
    .eq('user_id', userId)
    .eq('workbook_id', workbookId)
    .eq('lesson_id', lessonId)
    .eq('page_id', pageId)
    .single();

  if (!current) return;

  const currentData = current as { time_spent_seconds: number };
  const newTime = (currentData.time_spent_seconds || 0) + additionalSeconds;

  await supabase
    .from(TABLE_NAME)
    .update({ time_spent_seconds: newTime, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('workbook_id', workbookId)
    .eq('lesson_id', lessonId)
    .eq('page_id', pageId);
}

/**
 * Get total time spent in a workbook
 */
export async function getTotalTimeSpent(
  userId: string,
  workbookId: string
): Promise<number> {
  if (!isSupabaseConfigured() || !supabase) return 0;

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('time_spent_seconds')
    .eq('user_id', userId)
    .eq('workbook_id', workbookId);

  if (error || !data) return 0;

  return (data as { time_spent_seconds: number }[]).reduce(
    (total, row) => total + (row.time_spent_seconds || 0),
    0
  );
}

/**
 * Get progress summary for multiple workbooks
 */
export async function getWorkbooksProgressSummary(
  userId: string,
  workbookIds: string[]
): Promise<Record<string, { completed: number; total: number }>> {
  if (!isSupabaseConfigured() || !supabase) {
    return workbookIds.reduce((acc, id) => {
      acc[id] = { completed: 0, total: 0 };
      return acc;
    }, {} as Record<string, { completed: number; total: number }>);
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('workbook_id, status')
    .eq('user_id', userId)
    .in('workbook_id', workbookIds);

  if (error || !data) {
    return workbookIds.reduce((acc, id) => {
      acc[id] = { completed: 0, total: 0 };
      return acc;
    }, {} as Record<string, { completed: number; total: number }>);
  }

  // Group by workbook
  const progressData = data as { workbook_id: string; status: string }[];
  const summary: Record<string, { completed: number; total: number }> = {};

  for (const id of workbookIds) {
    const workbookProgress = progressData.filter((p) => p.workbook_id === id);
    summary[id] = {
      completed: workbookProgress.filter((p) => p.status === 'completed').length,
      total: workbookProgress.length,
    };
  }

  return summary;
}

// Re-export the type for use in other files
export type { ProgressRow as WorkbookProgress };
