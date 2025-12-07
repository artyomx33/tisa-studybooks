/**
 * Workbooks Registry
 *
 * Complete list of all 10 TISA MBA workbooks with metadata.
 * Colors match the grade-level design tokens.
 */

import type { GradeLevel } from './design-tokens';

export interface WorkbookMeta {
  id: string;
  grade: number;
  gradeLevel: GradeLevel;
  title: string;
  titleRu: string;
  description: string;
  totalPages: number;
  totalLessons: number;
  status: 'ready' | 'in_progress' | 'not_started';
  coverImage?: string;
  contentPath: string; // Path to content folder
}

export const WORKBOOKS: WorkbookMeta[] = [
  {
    id: 'wb-001',
    grade: 2,
    gradeLevel: 'grade_2',
    title: 'My First Project',
    titleRu: 'Мой первый проект',
    description: 'Introduction to project-based learning for young students',
    totalPages: 70,
    totalLessons: 8,
    status: 'ready',
    contentPath: 'my-first-project',
  },
  {
    id: 'wb-002',
    grade: 3,
    gradeLevel: 'grade_3',
    title: 'Economics through Fairy Tales',
    titleRu: 'Экономика через сказки',
    description: 'Learn economic concepts through engaging fairy tale narratives',
    totalPages: 138,
    totalLessons: 10,
    status: 'ready',
    contentPath: 'economics-fairy-tales',
  },
  {
    id: 'wb-003',
    grade: 3,
    gradeLevel: 'grade_3',
    title: 'Financial Literacy',
    titleRu: 'Финансовая грамотность',
    description: 'Essential money management skills for young learners',
    totalPages: 150,
    totalLessons: 12,
    status: 'ready',
    contentPath: 'financial-literacy',
  },
  {
    id: 'wb-004',
    grade: 4,
    gradeLevel: 'grade_4',
    title: 'Creative Problem-Solving',
    titleRu: 'Креативное решение проблем',
    description: 'Develop creative thinking and problem-solving skills',
    totalPages: 210,
    totalLessons: 15,
    status: 'in_progress',
    contentPath: 'creative-problem-solving',
  },
  {
    id: 'wb-005',
    grade: 4,
    gradeLevel: 'grade_4',
    title: 'SMART-City Management',
    titleRu: 'Управление SMART-городом',
    description: 'Learn about smart city concepts and urban management',
    totalPages: 170,
    totalLessons: 12,
    status: 'ready',
    contentPath: 'smart-city-management',
  },
  {
    id: 'wb-006',
    grade: 5,
    gradeLevel: 'grade_5',
    title: 'My Company',
    titleRu: 'Моя компания',
    description: 'Introduction to business and entrepreneurship',
    totalPages: 165,
    totalLessons: 12,
    status: 'in_progress',
    contentPath: 'my-company',
  },
  {
    id: 'wb-007',
    grade: 5,
    gradeLevel: 'grade_5',
    title: 'Customer Development',
    titleRu: 'Развитие клиентов',
    description: 'Understanding customers and market research',
    totalPages: 180,
    totalLessons: 14,
    status: 'in_progress',
    contentPath: 'customer-development',
  },
  {
    id: 'wb-008',
    grade: 6,
    gradeLevel: 'grade_6',
    title: 'Internet of Things',
    titleRu: 'Интернет вещей',
    description: 'Explore IoT concepts and connected devices',
    totalPages: 150,
    totalLessons: 10,
    status: 'in_progress',
    contentPath: 'internet-of-things',
  },
  {
    id: 'wb-009',
    grade: 6,
    gradeLevel: 'grade_6',
    title: 'My First App',
    titleRu: 'Моё первое приложение',
    description: 'Introduction to app development and design',
    totalPages: 150,
    totalLessons: 10,
    status: 'not_started',
    contentPath: 'my-first-app',
  },
  {
    id: 'wb-010',
    grade: 7,
    gradeLevel: 'grade_7',
    title: 'Fundamentals of Entrepreneurship',
    titleRu: 'Основы предпринимательства',
    description: 'Advanced entrepreneurship concepts and business planning',
    totalPages: 170,
    totalLessons: 12,
    status: 'in_progress',
    contentPath: 'fundamentals-entrepreneurship',
  },
];

/**
 * Get workbook by ID
 */
export function getWorkbookById(id: string): WorkbookMeta | undefined {
  return WORKBOOKS.find((wb) => wb.id === id);
}

/**
 * Get workbooks by grade level
 */
export function getWorkbooksByGrade(grade: number): WorkbookMeta[] {
  return WORKBOOKS.filter((wb) => wb.grade === grade);
}

/**
 * Get all ready workbooks
 */
export function getReadyWorkbooks(): WorkbookMeta[] {
  return WORKBOOKS.filter((wb) => wb.status === 'ready');
}

/**
 * Grade display names
 */
export const GRADE_NAMES: Record<number, string> = {
  2: 'Grade 2',
  3: 'Grade 3',
  4: 'Grade 4',
  5: 'Grade 5',
  6: 'Grade 6',
  7: 'Grade 7',
};
