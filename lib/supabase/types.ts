/**
 * Supabase Database Types
 *
 * Type definitions for the database tables used by Studybooks.
 * These extend the existing TISAverse tables.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Existing TISAverse table (read-only for us)
      users: {
        Row: {
          id: string;
          role: 'student' | 'teacher' | 'librarian' | 'parent';
          name: string;
          email: string;
          class: string | null;
          guild_id: string | null;
          xp_events: Json[] | null;
          badge_events: Json[] | null;
          coin_events: Json[] | null;
          quest_events: Json[] | null;
          legend_data: Json | null;
          created_at: string;
        };
        Insert: never; // We don't insert users from Studybooks
        Update: never; // We don't update users from Studybooks
      };

      // NEW: Workbook progress tracking (suffixed with -books to avoid conflicts)
      'progress-books': {
        Row: {
          id: string;
          user_id: string;
          workbook_id: string;
          lesson_id: string;
          page_id: string;
          component_type: string;
          status: 'not_started' | 'in_progress' | 'completed';
          completion_data: Json | null;
          started_at: string | null;
          completed_at: string | null;
          time_spent_seconds: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workbook_id: string;
          lesson_id: string;
          page_id: string;
          component_type: string;
          status?: 'not_started' | 'in_progress' | 'completed';
          completion_data?: Json | null;
          started_at?: string | null;
          completed_at?: string | null;
          time_spent_seconds?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          workbook_id?: string;
          lesson_id?: string;
          page_id?: string;
          component_type?: string;
          status?: 'not_started' | 'in_progress' | 'completed';
          completion_data?: Json | null;
          started_at?: string | null;
          completed_at?: string | null;
          time_spent_seconds?: number;
          created_at?: string;
          updated_at?: string;
        };
      };

      // NEW: Learning preferences (suffixed with -books)
      'preferences-books': {
        Row: {
          id: string;
          user_id: string;
          preferred_difficulty: 'easy' | 'medium' | 'hard' | null;
          preferred_owls: string[] | null;
          preferred_topics: string[] | null;
          reading_speed: 'slow' | 'medium' | 'fast' | null;
          learning_style: 'visual' | 'kinesthetic' | 'auditory' | 'reading' | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          preferred_difficulty?: 'easy' | 'medium' | 'hard' | null;
          preferred_owls?: string[] | null;
          preferred_topics?: string[] | null;
          reading_speed?: 'slow' | 'medium' | 'fast' | null;
          learning_style?: 'visual' | 'kinesthetic' | 'auditory' | 'reading' | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          preferred_difficulty?: 'easy' | 'medium' | 'hard' | null;
          preferred_owls?: string[] | null;
          preferred_topics?: string[] | null;
          reading_speed?: 'slow' | 'medium' | 'fast' | null;
          learning_style?: 'visual' | 'kinesthetic' | 'auditory' | 'reading' | null;
          updated_at?: string;
        };
      };

      // NEW: Workbook drawings (canvas saves, suffixed with -books)
      'drawings-books': {
        Row: {
          id: string;
          user_id: string;
          workbook_id: string;
          lesson_id: string;
          page_id: string;
          drawing_data: Json | null;
          thumbnail_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workbook_id: string;
          lesson_id: string;
          page_id: string;
          drawing_data?: Json | null;
          thumbnail_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          workbook_id?: string;
          lesson_id?: string;
          page_id?: string;
          drawing_data?: Json | null;
          thumbnail_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      // NEW: Sticker placements (suffixed with -books)
      'stickers-books': {
        Row: {
          id: string;
          user_id: string;
          workbook_id: string;
          sticker_id: string;
          placed_on_page: string | null;
          placed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          workbook_id: string;
          sticker_id: string;
          placed_on_page?: string | null;
          placed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          workbook_id?: string;
          sticker_id?: string;
          placed_on_page?: string | null;
          placed_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      // RPC function to append XP event (existing TISAverse function)
      append_xp_event: {
        Args: {
          user_id: string;
          event: Json;
        };
        Returns: void;
      };
    };
    Enums: Record<string, never>;
  };
}

// Convenience type aliases (using -books suffixed table names)
export type WorkbookProgress = Database['public']['Tables']['progress-books']['Row'];
export type WorkbookProgressInsert = Database['public']['Tables']['progress-books']['Insert'];
export type WorkbookProgressUpdate = Database['public']['Tables']['progress-books']['Update'];

export type LearningPreferences = Database['public']['Tables']['preferences-books']['Row'];
export type WorkbookDrawing = Database['public']['Tables']['drawings-books']['Row'];
export type WorkbookSticker = Database['public']['Tables']['stickers-books']['Row'];

export type User = Database['public']['Tables']['users']['Row'];

// Progress status type
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

// Completion data structure (stored as JSON)
export interface CompletionData {
  answers?: Record<string, unknown>;
  score?: number;
  maxScore?: number;
  attempts?: number;
  feedback?: string;
}
