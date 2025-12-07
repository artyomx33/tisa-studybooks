/**
 * Page Component Type Definitions
 *
 * Types for page rendering, layout, and component props.
 */

import type { ReactNode } from 'react';
import type { GradeLevel, OwlType } from '@/config/design-tokens';
import type { ContentFrontmatter } from './content';

// Base page props shared by all page type components
export interface BasePageProps {
  pageNumber?: number;
  gradeLevel: GradeLevel;
  showPurpleBar?: boolean;
  showHeader?: boolean;
  className?: string;
  children: ReactNode;
}

// Page header props
export interface PageHeaderProps {
  gradeLevel: GradeLevel;
  lessonNumber: number;
  lessonTitle: string;
  blockName: string;
  componentNumber: number;
}

// Purple bar props
export interface PurpleBarProps {
  pageNumber?: number;
  workbookTitle?: string;
}

// Page type component props
export interface PageTypeProps<T extends ContentFrontmatter = ContentFrontmatter> {
  frontmatter: T;
  content: string;
  gradeLevel: GradeLevel;
  onComplete?: () => void;
  isTeacherMode?: boolean;
}

// Story page specific props
export interface StoryPageProps extends PageTypeProps {
  illustrationUrl?: string;
  showLetterScroll?: boolean;
}

// Glossary page specific props
export interface GlossaryPageProps extends PageTypeProps {
  pathStyle?: 'winding' | 'straight' | 'circular';
}

// Task page specific props
export interface TaskPageProps extends PageTypeProps {
  owlType: OwlType;
  onTaskComplete?: (taskNumber: number, answer: unknown) => void;
}

// Test page specific props
export interface TestPageProps extends PageTypeProps {
  showAnswerKey?: boolean;
  onSubmit?: (answers: Record<number, unknown>) => void;
}

// Assessment page specific props
export interface AssessmentPageProps extends PageTypeProps {
  assessmentType: 'ladder' | 'orange-slices' | 'steps' | 'plus-arrow' | 'thermometer';
  onAssessmentComplete?: (data: Record<string, unknown>) => void;
}

// Drawing canvas specific props
export interface DrawingCanvasProps {
  width?: number | string;
  height?: number | string;
  brushColor?: string;
  brushSize?: number;
  onSave?: (data: string) => void;
  initialData?: string;
  readOnly?: boolean;
}

// Interactive component base props
export interface InteractiveComponentProps {
  id: string;
  disabled?: boolean;
  readOnly?: boolean;
  onComplete?: (value: unknown) => void;
  initialValue?: unknown;
}

// Multiple choice props
export interface MultipleChoiceProps extends InteractiveComponentProps {
  question: string;
  options: string[];
  correctAnswer?: number | number[];
  allowMultiple?: boolean;
}

// Fill in blank props
export interface FillInBlankProps extends InteractiveComponentProps {
  template: string; // e.g., "The capital of France is ___."
  blanks: Array<{
    id: string;
    answer?: string;
  }>;
}

// Drag and drop props
export interface DragDropProps extends InteractiveComponentProps {
  items: Array<{
    id: string;
    content: string;
    group?: string;
  }>;
  targets: Array<{
    id: string;
    label: string;
    acceptedItems?: string[];
  }>;
}

// Page layout configuration
export interface PageLayout {
  headerHeight: string;
  contentHeight: string;
  footerHeight: string;
  margin: string;
  columns?: number;
  gap?: string;
}

// Page navigation state
export interface PageNavigationState {
  currentPage: number;
  totalPages: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  lessonId: string;
  workbookId: string;
}
