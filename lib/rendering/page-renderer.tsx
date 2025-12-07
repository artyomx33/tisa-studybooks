'use client';

/**
 * Page Renderer
 *
 * Dynamic component router that renders the appropriate page type component
 * based on the frontmatter's component_type field.
 *
 * NO FALLBACKS: Unknown component types will throw errors.
 */

import { ReactNode } from 'react';
import type { ContentItem, StoryFrontmatter, GlossaryFrontmatter, TaskFrontmatter, TestFrontmatter, MindMapFrontmatter, HomeworkFrontmatter, AssessmentFrontmatter, StickerFrontmatter } from '@/types/content';
import type { GradeLevel } from '@/config/design-tokens';
import { BasePage, PageHeader } from '@/components/design-system';
import {
  StoryPage,
  GlossaryPage,
  TaskPage,
  TestPage,
  AssessmentPage,
  MindMapPage,
  HomeworkPage,
  StickerPage,
} from '@/components/page-types';

interface PageRendererProps {
  content: ContentItem;
  gradeLevel: GradeLevel;
  isTeacherMode?: boolean;
  onComplete?: () => void;
}

/**
 * Main page renderer component
 */
export default function PageRenderer({
  content,
  gradeLevel,
  isTeacherMode = false,
  onComplete,
}: PageRendererProps) {
  const { frontmatter } = content;

  return (
    <BasePage
      gradeLevel={gradeLevel}
      pageNumber={frontmatter.page_numbers?.start}
      workbookTitle={frontmatter.workbook?.title}
    >
      <PageHeader
        gradeLevel={gradeLevel}
        lessonNumber={frontmatter.lesson.number}
        lessonTitle={frontmatter.lesson.title}
        blockName={frontmatter.block_name}
        componentNumber={frontmatter.component_number}
      />

      <div className="flex-1 overflow-auto">
        {renderPageContent(content, gradeLevel, isTeacherMode, onComplete)}
      </div>
    </BasePage>
  );
}

/**
 * Render the appropriate page content based on component_type
 */
function renderPageContent(
  content: ContentItem,
  gradeLevel: GradeLevel,
  isTeacherMode: boolean,
  onComplete?: () => void
): ReactNode {
  const { frontmatter } = content;

  switch (frontmatter.component_type) {
    case 'story':
      return (
        <StoryPage
          content={content as ContentItem<StoryFrontmatter>}
          gradeLevel={gradeLevel}
          onComplete={onComplete}
        />
      );

    case 'glossary':
      return (
        <GlossaryPage
          content={content as ContentItem<GlossaryFrontmatter>}
          gradeLevel={gradeLevel}
          onComplete={onComplete}
        />
      );

    case 'task_remembery':
      return (
        <TaskPage
          content={content as ContentItem<TaskFrontmatter>}
          gradeLevel={gradeLevel}
          owlType="remembery"
          isTeacherMode={isTeacherMode}
          onComplete={onComplete}
        />
      );

    case 'task_intellecta':
      return (
        <TaskPage
          content={content as ContentItem<TaskFrontmatter>}
          gradeLevel={gradeLevel}
          owlType="intellecta"
          isTeacherMode={isTeacherMode}
          onComplete={onComplete}
        />
      );

    case 'task_practica':
      return (
        <TaskPage
          content={content as ContentItem<TaskFrontmatter>}
          gradeLevel={gradeLevel}
          owlType="practica"
          isTeacherMode={isTeacherMode}
          onComplete={onComplete}
        />
      );

    case 'task_deducta':
      return (
        <TaskPage
          content={content as ContentItem<TaskFrontmatter>}
          gradeLevel={gradeLevel}
          owlType="deducta"
          isTeacherMode={isTeacherMode}
          onComplete={onComplete}
        />
      );

    case 'task_critica':
      return (
        <TaskPage
          content={content as ContentItem<TaskFrontmatter>}
          gradeLevel={gradeLevel}
          owlType="critica"
          isTeacherMode={isTeacherMode}
          onComplete={onComplete}
        />
      );

    case 'task_creatica':
      return (
        <TaskPage
          content={content as ContentItem<TaskFrontmatter>}
          gradeLevel={gradeLevel}
          owlType="creatica"
          isTeacherMode={isTeacherMode}
          onComplete={onComplete}
        />
      );

    case 'test':
      return (
        <TestPage
          content={content as ContentItem<TestFrontmatter>}
          gradeLevel={gradeLevel}
          isTeacherMode={isTeacherMode}
          onComplete={onComplete}
        />
      );

    case 'mindmap':
      return (
        <MindMapPage
          content={content as ContentItem<MindMapFrontmatter>}
          gradeLevel={gradeLevel}
          onComplete={onComplete}
        />
      );

    case 'homework':
      return (
        <HomeworkPage
          content={content as ContentItem<HomeworkFrontmatter>}
          gradeLevel={gradeLevel}
          onComplete={onComplete}
        />
      );

    case 'assessment':
      return (
        <AssessmentPage
          content={content as ContentItem<AssessmentFrontmatter>}
          gradeLevel={gradeLevel}
          onComplete={onComplete}
        />
      );

    case 'sticker':
      return (
        <StickerPage
          content={content as ContentItem<StickerFrontmatter>}
          gradeLevel={gradeLevel}
          onComplete={onComplete}
        />
      );

    default: {
      // NO FALLBACKS: Unknown component types are errors
      const unknownType = (frontmatter as { component_type: string }).component_type;
      throw new Error(
        `Unknown component_type: ${unknownType}. ` +
        `File: ${content.filePath}`
      );
    }
  }
}
