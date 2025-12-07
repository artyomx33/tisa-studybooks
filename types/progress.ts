/**
 * Progress Tracking Type Definitions
 *
 * Types for student progress, completion status, and XP awards.
 */

import type { PageType } from '@/config/design-tokens';

// Progress status for a single page
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

// Workbook progress record (matches Supabase table)
export interface WorkbookProgress {
  id: string;
  user_id: string;
  workbook_id: string;
  lesson_id: string;
  page_id: string;
  component_type: PageType;
  status: ProgressStatus;
  completion_data: CompletionData | null;
  started_at: string | null;
  completed_at: string | null;
  time_spent_seconds: number;
  created_at: string;
  updated_at: string;
}

// Completion data varies by component type
export interface CompletionData {
  answers?: Record<string, unknown>;
  drawings?: string[];
  reflections?: string[];
  score?: number;
  maxScore?: number;
}

// Learning preferences (matches Supabase table)
export interface LearningPreferences {
  id: string;
  user_id: string;
  preferred_difficulty: 'easy' | 'medium' | 'hard';
  preferred_owls: string[];
  preferred_topics: string[];
  reading_speed: 'slow' | 'medium' | 'fast';
  learning_style: 'visual' | 'kinesthetic' | 'auditory' | 'reading';
  updated_at: string;
}

// Drawing record (matches Supabase table)
export interface WorkbookDrawing {
  id: string;
  user_id: string;
  workbook_id: string;
  lesson_id: string;
  page_id: string;
  drawing_data: DrawingData;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

// Drawing data from react-sketch-canvas
export interface DrawingData {
  paths: Array<{
    drawMode: boolean;
    strokeColor: string;
    strokeWidth: number;
    paths: Array<{ x: number; y: number }>;
  }>;
  width: number;
  height: number;
}

// Sticker placement record (matches Supabase table)
export interface WorkbookSticker {
  id: string;
  user_id: string;
  workbook_id: string;
  sticker_id: string;
  placed_on_page: string | null;
  placed_at: string | null;
  created_at: string;
}

// XP Event (from TISAverse)
export interface XPEvent {
  amount: number;
  source: 'workbook' | 'quest' | 'badge' | 'bonus';
  source_id: string;
  note: string;
  created_by: string;
  created_at: string;
}

// Progress summary for a lesson
export interface LessonProgressSummary {
  lessonId: string;
  totalPages: number;
  completedPages: number;
  inProgressPages: number;
  percentComplete: number;
  totalTimeSpent: number;
  xpEarned: number;
}

// Progress summary for a workbook
export interface WorkbookProgressSummary {
  workbookId: string;
  totalLessons: number;
  completedLessons: number;
  totalPages: number;
  completedPages: number;
  percentComplete: number;
  totalTimeSpent: number;
  xpEarned: number;
  lessons: LessonProgressSummary[];
}

// Progress update payload
export interface ProgressUpdatePayload {
  userId: string;
  workbookId: string;
  lessonId: string;
  pageId: string;
  componentType: PageType;
  status: ProgressStatus;
  completionData?: CompletionData;
  timeSpentSeconds?: number;
}

// Award XP payload
export interface AwardXPPayload {
  userId: string;
  pageId: string;
  componentType: PageType;
  amount?: number; // Optional override of default XP
}
