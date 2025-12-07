/**
 * Content Loader
 *
 * Loads and parses markdown content files with gray-matter for frontmatter.
 * Follows NO FALLBACKS rule - missing required fields will throw errors.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ContentItem, ContentFrontmatter, ContentLoadOptions, ValidationResult } from '@/types/content';
import { PAGE_TYPES } from '@/config/design-tokens';

// Content directory path (can be configured via env)
const CONTENT_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), 'content', 'workbooks');

/**
 * Load a single content file by path
 */
export async function loadContentFile(filePath: string): Promise<ContentItem> {
  const fullPath = path.isAbsolute(filePath) ? filePath : path.join(CONTENT_DIR, filePath);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content file not found: ${fullPath}`);
  }

  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Validate frontmatter
  const validation = validateFrontmatter(data, fullPath);
  if (!validation.valid) {
    throw new Error(`Invalid frontmatter in ${fullPath}:\n${validation.errors.join('\n')}`);
  }

  const slug = path.basename(filePath, path.extname(filePath));

  return {
    frontmatter: data as ContentFrontmatter,
    content,
    filePath: fullPath,
    slug,
  };
}

/**
 * Load all content files for a lesson
 */
export async function loadLessonContent(
  workbookId: string,
  lessonId: string
): Promise<ContentItem[]> {
  const lessonDir = path.join(CONTENT_DIR, workbookId, lessonId);

  if (!fs.existsSync(lessonDir)) {
    throw new Error(`Lesson directory not found: ${lessonDir}`);
  }

  const files = fs.readdirSync(lessonDir)
    .filter(file => file.endsWith('.md'))
    .sort((a, b) => {
      // Sort by component number (extracted from filename like "01-story.md")
      const numA = parseInt(a.split('-')[0], 10) || 0;
      const numB = parseInt(b.split('-')[0], 10) || 0;
      return numA - numB;
    });

  const contents: ContentItem[] = [];

  for (const file of files) {
    const filePath = path.join(lessonDir, file);
    const item = await loadContentFile(filePath);
    contents.push(item);
  }

  return contents;
}

/**
 * Load a specific page within a lesson
 */
export async function loadPageContent(options: ContentLoadOptions): Promise<ContentItem> {
  const { workbookId, lessonId, pageId } = options;

  if (!pageId) {
    throw new Error('pageId is required');
  }

  const lessonDir = path.join(CONTENT_DIR, workbookId, lessonId);

  if (!fs.existsSync(lessonDir)) {
    throw new Error(`Lesson directory not found: ${lessonDir}`);
  }

  // Find file matching pageId (e.g., "01-story" matches "01-story.md")
  const files = fs.readdirSync(lessonDir);
  const matchingFile = files.find(file =>
    file.startsWith(pageId) && file.endsWith('.md')
  );

  if (!matchingFile) {
    throw new Error(`Page not found: ${pageId} in ${lessonDir}`);
  }

  return loadContentFile(path.join(lessonDir, matchingFile));
}

/**
 * Get all workbook IDs available in content directory
 */
export function getWorkbookIds(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs.readdirSync(CONTENT_DIR)
    .filter(item => {
      const itemPath = path.join(CONTENT_DIR, item);
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
    });
}

/**
 * Get all lesson IDs for a workbook
 */
export function getLessonIds(workbookId: string): string[] {
  const workbookDir = path.join(CONTENT_DIR, workbookId);

  if (!fs.existsSync(workbookDir)) {
    throw new Error(`Workbook directory not found: ${workbookDir}`);
  }

  return fs.readdirSync(workbookDir)
    .filter(item => {
      const itemPath = path.join(workbookDir, item);
      return fs.statSync(itemPath).isDirectory() && item.startsWith('lesson-');
    })
    .sort((a, b) => {
      // Sort by lesson number
      const numA = parseInt(a.replace('lesson-', '').split('-')[0], 10) || 0;
      const numB = parseInt(b.replace('lesson-', '').split('-')[0], 10) || 0;
      return numA - numB;
    });
}

/**
 * Get all page IDs for a lesson
 */
export function getPageIds(workbookId: string, lessonId: string): string[] {
  const lessonDir = path.join(CONTENT_DIR, workbookId, lessonId);

  if (!fs.existsSync(lessonDir)) {
    throw new Error(`Lesson directory not found: ${lessonDir}`);
  }

  return fs.readdirSync(lessonDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[0], 10) || 0;
      const numB = parseInt(b.split('-')[0], 10) || 0;
      return numA - numB;
    });
}

/**
 * Validate frontmatter has all required fields
 * NO FALLBACKS: Missing required fields are errors, not warnings
 */
export function validateFrontmatter(
  data: Record<string, unknown>,
  _filename: string
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required base fields
  const requiredFields = ['component_type', 'component_number', 'block_name', 'lesson'];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate component_type is valid
  if (data.component_type && !PAGE_TYPES.includes(data.component_type as typeof PAGE_TYPES[number])) {
    errors.push(`Invalid component_type: ${data.component_type}. Must be one of: ${PAGE_TYPES.join(', ')}`);
  }

  // Validate lesson has required subfields
  if (data.lesson) {
    const lesson = data.lesson as Record<string, unknown>;
    if (lesson.number === undefined) {
      errors.push('Missing required field: lesson.number');
    }
    if (!lesson.title) {
      errors.push('Missing required field: lesson.title');
    }
  }

  // Component-specific validation
  if (data.component_type === 'glossary' && !data.terms) {
    warnings.push('Glossary page should have terms array');
  }

  if (data.component_type === 'test' && !data.questions) {
    warnings.push('Test page should have questions array');
  }

  if (data.component_type === 'assessment' && !data.assessment_type) {
    errors.push('Assessment page requires assessment_type');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Parse content for static generation
 */
export async function getStaticContentPaths(): Promise<Array<{
  workbookId: string;
  lessonId: string;
  pageId: string;
}>> {
  const paths: Array<{ workbookId: string; lessonId: string; pageId: string }> = [];

  const workbooks = getWorkbookIds();

  for (const workbookId of workbooks) {
    const lessons = getLessonIds(workbookId);

    for (const lessonId of lessons) {
      const pages = getPageIds(workbookId, lessonId);

      for (const pageId of pages) {
        paths.push({ workbookId, lessonId, pageId });
      }
    }
  }

  return paths;
}
