/**
 * Content Type Definitions
 *
 * Types for markdown content parsing, frontmatter, and page rendering.
 * Following NO FALLBACKS rule - all required fields must be present.
 */

import type { GradeLevel, OwlType, PageType, AssessmentType } from '@/config/design-tokens';

// Base frontmatter fields required for all pages
export interface BaseFrontmatter {
  component_type: PageType;
  component_number: number;
  block_name: string;
  page_template: string;
  lesson: {
    number: number;
    title: string;
  };
  workbook: {
    id: string;
    grade: GradeLevel;
    title: string;
  };
  page_numbers?: {
    start: number;
    end?: number;
  };
}

// Story page frontmatter
export interface StoryFrontmatter extends BaseFrontmatter {
  component_type: 'story';
  layout?: {
    pages: number;
    page_1?: string;
    page_2?: string;
  };
  illustration?: {
    src: string;
    alt: string;
    position?: 'left' | 'right' | 'center' | 'full';
  };
  characters?: Array<{
    name: string;
    role: string;
  }>;
}

// Glossary page frontmatter
export interface GlossaryFrontmatter extends BaseFrontmatter {
  component_type: 'glossary';
  terms: Array<{
    term: string;
    definition: string;
    icon?: string;
    example?: string;
  }>;
  path_style?: 'winding' | 'straight' | 'circular';
}

// Task page frontmatter (for all owl types)
export interface TaskFrontmatter extends BaseFrontmatter {
  component_type: 'task_remembery' | 'task_intellecta' | 'task_practica' | 'task_deducta' | 'task_critica' | 'task_creatica';
  owl_type: OwlType;
  tasks: Array<{
    number: number;
    instruction: string;
    type: TaskInteractionType;
    data?: Record<string, unknown>;
  }>;
  answer_key?: Array<{
    question: number;
    answer: string | string[];
  }>;
}

// Test page frontmatter
export interface TestFrontmatter extends BaseFrontmatter {
  component_type: 'test';
  questions: Array<{
    number: number;
    question: string;
    type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer';
    options?: string[];
    correct?: string | number;
  }>;
  answer_key?: Array<{
    question: number;
    answer: string | string[];
  }>;
  time_limit_minutes?: number;
}

// MindMap page frontmatter
export interface MindMapFrontmatter extends BaseFrontmatter {
  component_type: 'mindmap';
  central_topic: string;
  branches?: Array<{
    label: string;
    children?: string[];
  }>;
  editable: boolean;
}

// Homework page frontmatter
export interface HomeworkFrontmatter extends BaseFrontmatter {
  component_type: 'homework';
  mission_name: string;
  objectives: string[];
  due_date_relative?: string; // e.g., "next_lesson"
}

// Assessment page frontmatter
export interface AssessmentFrontmatter extends BaseFrontmatter {
  component_type: 'assessment';
  assessment_type: AssessmentType;
  title: string;
  instructions: string;
  scale?: {
    min: number;
    max: number;
    labels?: string[];
  };
}

// Sticker page frontmatter
export interface StickerFrontmatter extends BaseFrontmatter {
  component_type: 'sticker';
  stickers_needed: {
    sheet_id: string;
    stickers: Array<{
      id: string;
      label: string;
      image?: string;
    }>;
  };
}

// Union of all frontmatter types
export type ContentFrontmatter =
  | StoryFrontmatter
  | GlossaryFrontmatter
  | TaskFrontmatter
  | TestFrontmatter
  | MindMapFrontmatter
  | HomeworkFrontmatter
  | AssessmentFrontmatter
  | StickerFrontmatter;

// Parsed content item (frontmatter + markdown body)
export interface ContentItem<T extends ContentFrontmatter = ContentFrontmatter> {
  frontmatter: T;
  content: string;
  filePath: string;
  slug: string;
}

// Task interaction types for interactive components
export type TaskInteractionType =
  | 'multiple_choice'
  | 'fill_blank'
  | 'matching'
  | 'drag_drop'
  | 'drawing'
  | 'text_input'
  | 'crossword'
  | 'categorize'
  | 'ranking'
  | 'table_fill'
  | 'mind_map'
  | 'free_draw';

// Content loading options
export interface ContentLoadOptions {
  workbookId: string;
  lessonId: string;
  pageId?: string;
}

// Content validation result
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
