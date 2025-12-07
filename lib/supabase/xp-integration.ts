/**
 * XP Integration for TISAverse
 *
 * Awards XP when students complete workbook pages.
 * Integrates with the existing TISAverse XP system.
 */

import { supabase, isSupabaseConfigured } from './client';

/**
 * XP rewards by component type
 * Higher rewards for more challenging/creative tasks
 */
export const XP_REWARDS: Record<string, number> = {
  story: 5,
  glossary: 5,
  task_remembery: 10,
  task_intellecta: 15,
  task_practica: 15,
  task_deducta: 15,
  task_critica: 15,
  task_creatica: 20,
  test: 25,
  mindmap: 10,
  homework: 20,
  assessment: 15,
  sticker: 5,
};

/**
 * XP Event structure (matches TISAverse format)
 */
interface XPEvent {
  amount: number;
  source: 'workbook';
  source_id: string;
  note: string;
  created_by: 'system';
  created_at: string;
}

/**
 * Award XP for completing a workbook page
 */
export async function awardWorkbookXP(
  userId: string,
  workbookId: string,
  lessonId: string,
  pageId: string,
  componentType: string
): Promise<{ success: boolean; xpAwarded: number }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, xpAwarded: 0 };
  }

  const xpAmount = XP_REWARDS[componentType] || 5;

  const event: XPEvent = {
    amount: xpAmount,
    source: 'workbook',
    source_id: `${workbookId}/${lessonId}/${pageId}`,
    note: `Completed ${formatComponentType(componentType)} page`,
    created_by: 'system',
    created_at: new Date().toISOString(),
  };

  try {
    // Call the TISAverse RPC function to append XP event
    const { error } = await supabase.rpc('append_xp_event', {
      user_id: userId,
      event: event as unknown as Record<string, unknown>,
    });

    if (error) {
      console.error('Error awarding XP:', error);
      return { success: false, xpAwarded: 0 };
    }

    return { success: true, xpAwarded: xpAmount };
  } catch (err) {
    console.error('Error calling append_xp_event:', err);
    return { success: false, xpAwarded: 0 };
  }
}

/**
 * Award bonus XP for completing a full lesson
 */
export async function awardLessonCompletionXP(
  userId: string,
  workbookId: string,
  lessonId: string
): Promise<{ success: boolean; xpAwarded: number }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, xpAwarded: 0 };
  }

  const bonusXP = 50; // Lesson completion bonus

  const event: XPEvent = {
    amount: bonusXP,
    source: 'workbook',
    source_id: `${workbookId}/${lessonId}/complete`,
    note: 'Completed full lesson!',
    created_by: 'system',
    created_at: new Date().toISOString(),
  };

  try {
    const { error } = await supabase.rpc('append_xp_event', {
      user_id: userId,
      event: event as unknown as Record<string, unknown>,
    });

    if (error) {
      console.error('Error awarding lesson XP:', error);
      return { success: false, xpAwarded: 0 };
    }

    return { success: true, xpAwarded: bonusXP };
  } catch (err) {
    console.error('Error calling append_xp_event:', err);
    return { success: false, xpAwarded: 0 };
  }
}

/**
 * Award bonus XP for completing a full workbook
 */
export async function awardWorkbookCompletionXP(
  userId: string,
  workbookId: string,
  workbookTitle: string
): Promise<{ success: boolean; xpAwarded: number }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: false, xpAwarded: 0 };
  }

  const bonusXP = 200; // Workbook completion bonus

  const event: XPEvent = {
    amount: bonusXP,
    source: 'workbook',
    source_id: `${workbookId}/complete`,
    note: `Completed workbook: ${workbookTitle}`,
    created_by: 'system',
    created_at: new Date().toISOString(),
  };

  try {
    const { error } = await supabase.rpc('append_xp_event', {
      user_id: userId,
      event: event as unknown as Record<string, unknown>,
    });

    if (error) {
      console.error('Error awarding workbook XP:', error);
      return { success: false, xpAwarded: 0 };
    }

    return { success: true, xpAwarded: bonusXP };
  } catch (err) {
    console.error('Error calling append_xp_event:', err);
    return { success: false, xpAwarded: 0 };
  }
}

/**
 * Calculate total XP for a lesson
 */
export function calculateLessonXP(componentTypes: string[]): number {
  return componentTypes.reduce((total, type) => total + (XP_REWARDS[type] || 5), 0);
}

/**
 * Format component type for display
 */
function formatComponentType(type: string): string {
  const labels: Record<string, string> = {
    story: 'Story',
    glossary: 'Glossary',
    task_remembery: 'Remembery Task',
    task_intellecta: 'Intellecta Task',
    task_practica: 'Practica Task',
    task_deducta: 'Deducta Task',
    task_critica: 'Critica Task',
    task_creatica: 'Creatica Task',
    test: 'Test',
    mindmap: 'Mind Map',
    homework: 'Homework',
    assessment: 'Assessment',
    sticker: 'Sticker Activity',
  };
  return labels[type] || type;
}
