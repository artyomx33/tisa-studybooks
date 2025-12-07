/**
 * Supabase Module Index
 *
 * Re-exports all Supabase-related functionality.
 */

// Client
export {
  supabase,
  isSupabaseConfigured,
  getSupabaseClient,
  getCurrentUser,
  getSession,
} from './client';

// Types
export type {
  Database,
  WorkbookProgress,
  WorkbookProgressInsert,
  WorkbookProgressUpdate,
  LearningPreferences,
  WorkbookDrawing,
  WorkbookSticker,
  User,
  ProgressStatus,
  CompletionData,
} from './types';

// Progress Tracking
export {
  getPageProgress,
  getLessonProgress,
  getWorkbookProgress,
  getWorkbookCompletionPercent,
  startPage,
  completePage,
  updateTimeSpent,
  getTotalTimeSpent,
  getWorkbooksProgressSummary,
} from './progress';

// XP Integration
export {
  XP_REWARDS,
  awardWorkbookXP,
  awardLessonCompletionXP,
  awardWorkbookCompletionXP,
  calculateLessonXP,
} from './xp-integration';
