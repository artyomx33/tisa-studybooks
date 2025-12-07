/**
 * Markdown Body Parser
 *
 * Extracts structured data from markdown body content.
 * Used for pages where structured data is in the body text
 * rather than YAML frontmatter.
 *
 * NO MOCK DATA - returns empty arrays if patterns don't match.
 */

export interface ParsedGlossaryTerm {
  term: string;
  definition: string;
  icon?: string;
  example?: string;
}

/**
 * Parse glossary terms from markdown body
 *
 * Looks for patterns like:
 * ### ① Consumption
 * **Definition:** The use of goods and services...
 * **Icon:** 🛒
 * **Examples:** Eating food, wearing clothes
 */
export function parseGlossaryTerms(markdownBody: string): ParsedGlossaryTerm[] {
  const terms: ParsedGlossaryTerm[] = [];

  // Find the "Term Definitions (Full)" section
  let sectionToParse = markdownBody;
  const definitionsMatch = markdownBody.match(/## 📝 Term Definitions \(Full\)([\s\S]*?)(?=## |$)/);
  if (definitionsMatch) {
    sectionToParse = definitionsMatch[1];
  } else {
    // Try alternate section headers
    const altMatch = markdownBody.match(/## Term Definitions([\s\S]*?)(?=## |$)/) ||
                     markdownBody.match(/## Definitions([\s\S]*?)(?=## |$)/);
    if (altMatch) {
      sectionToParse = altMatch[1];
    }
  }

  // Split by term headers (### ① Term, ### ② Term, etc.)
  const termBlocks = sectionToParse.split(/###\s+[①②③④⑤⑥⑦⑧⑨⑩]\s+/);

  for (let i = 1; i < termBlocks.length; i++) {
    const block = termBlocks[i];
    const lines = block.split('\n').filter(line => line.trim());

    if (lines.length === 0) continue;

    // First line is the term name
    const termName = lines[0].trim();

    // Look for definition, icon, and examples
    let definition = '';
    let icon = '';
    let example = '';

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith('**Definition:**')) {
        definition = trimmedLine.replace('**Definition:**', '').trim();
      } else if (trimmedLine.startsWith('**Icon:**')) {
        icon = trimmedLine.replace('**Icon:**', '').trim();
      } else if (trimmedLine.startsWith('**Examples:**') || trimmedLine.startsWith('**Example:**')) {
        example = trimmedLine.replace(/\*\*Examples?:\*\*/, '').trim();
        // Remove quotes if present
        example = example.replace(/^"(.+)"$/, '$1');
      }
    }

    if (termName && definition) {
      terms.push({
        term: termName,
        definition,
        icon: icon || undefined,
        example: example || undefined,
      });
    }
  }

  return terms;
}

export interface ParsedTestQuestion {
  number: number;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer';
  options?: string[];
}

/**
 * Parse test questions from markdown body
 */
export function parseTestQuestions(markdownBody: string): ParsedTestQuestion[] {
  const questions: ParsedTestQuestion[] = [];

  // Look for numbered questions (1., 2., etc.)
  const questionPattern = /(\d+)\.\s*(.+?)(?=\n\d+\.|$)/gs;
  const matches = markdownBody.matchAll(questionPattern);

  for (const match of matches) {
    const number = parseInt(match[1], 10);
    const questionText = match[2].trim();

    // Determine question type based on content
    let type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'short_answer' = 'short_answer';

    if (questionText.includes('True or False') || questionText.includes('T/F')) {
      type = 'true_false';
    } else if (questionText.includes('___') || questionText.includes('____')) {
      type = 'fill_blank';
    } else if (questionText.match(/[a-d]\)/i)) {
      type = 'multiple_choice';
    }

    questions.push({
      number,
      question: questionText,
      type,
    });
  }

  return questions;
}

export interface ParsedTask {
  number: number;
  instruction: string;
  type: string;
}

/**
 * Parse task instructions from markdown body
 */
export function parseTaskInstructions(markdownBody: string): ParsedTask[] {
  const tasks: ParsedTask[] = [];

  // Look for task patterns
  const taskPattern = /(?:Task\s*)?(\d+)[.:]\s*(.+?)(?=\n(?:Task\s*)?\d+[.:]|$)/gis;
  const matches = markdownBody.matchAll(taskPattern);

  for (const match of matches) {
    tasks.push({
      number: parseInt(match[1], 10),
      instruction: match[2].trim(),
      type: 'text_input', // Default type
    });
  }

  return tasks;
}

/**
 * Extract story text sections from markdown body
 */
export function parseStoryContent(markdownBody: string): {
  pages: Array<{ title: string; content: string }>;
} {
  const pages: Array<{ title: string; content: string }> = [];

  // Split by page headers (### 📜 PAGE 1, ### 📜 PAGE 2, etc.)
  const pageBlocks = markdownBody.split(/###\s*📜?\s*PAGE\s*\d+[:\s]*/i);

  for (let i = 1; i < pageBlocks.length; i++) {
    const block = pageBlocks[i];
    const lines = block.split('\n');

    // First non-empty line might be the title
    const titleLine = lines.find(l => l.trim() && !l.startsWith('```'));
    const title = titleLine?.trim() || `Page ${i}`;

    // Rest is content (skip ASCII art blocks)
    const content = block
      .split('\n')
      .filter(line => !line.startsWith('```') && line.trim())
      .join('\n')
      .trim();

    if (content) {
      pages.push({ title, content });
    }
  }

  return { pages };
}
