# 🚀 WEEK 1 STARTUP GUIDE - Foundation Phase

**Status**: ✅ PROJECT INITIALIZED AND READY
**Date**: December 6, 2025
**Verified Versions**:
- ✅ Next.js 16.0.7
- ✅ React 19.2.1
- ✅ TypeScript 5.9.3
- ✅ Tailwind CSS 4.1.17
- ✅ All dependencies installed

---

## 🎯 What's Complete

- ✅ Project structure created
- ✅ All dependencies installed (latest stable)
- ✅ Next.js configuration ready
- ✅ TypeScript configured
- ✅ Tailwind CSS v4 configured
- ✅ ESLint configured
- ✅ Landing page created (`app/page.tsx`)
- ✅ Global styles ready (`app/globals.css`)

---

## 🚀 First Command (Start Dev Server)

```bash
cd /Users/artyomx/projects/tisaverse-studybooks-app
npm run dev
```

Then navigate to: **`http://localhost:3000`**

You should see the beautiful TISAverse Studybooks landing page with:
- Hero section
- Tech stack status
- Phase 1 checklist
- Resource links

---

## 📋 WEEK 1 Tasks (Foundation)

This week we build the core infrastructure that ALL pages will use.

### **Task 1: Create Design Tokens Configuration** (2 hours)

Create `/config/design-tokens.ts`:

```typescript
// config/design-tokens.ts
export const DESIGN_TOKENS = {
  tisa: {
    purple: '#6B3FA0',      // Purple bar (ALWAYS this color)
    gold: '#D4AF37',
    cream: '#F5F5DC',
    charcoal: '#36454F',
  },
  levels: {
    grade_2: { primary: '#1E3A5F', light: '#2E5A8F', dark: '#0E2A4F', accent: '#4A90D9' },
    grade_3: { primary: '#2D5A27', light: '#3D7A37', dark: '#1D4A17', accent: '#6DBF67' },
    grade_4: { primary: '#4A7C59', light: '#5A9C69', dark: '#3A6C49', accent: '#8FBF9A' },
    grade_5: { primary: '#722F37', light: '#923F47', dark: '#521F27', accent: '#C4536A' },
    grade_6: { primary: '#C4536A', light: '#D4637A', dark: '#A4435A', accent: '#E89AAB' },
    grade_7: { primary: '#E07B39', light: '#F08B49', dark: '#C06B29', accent: '#F5A862' },
  },
  owls: {
    remembery: { color: '#7EB8DA', bg: '#EBF5FB' },
    intellecta: { color: '#8B5CF6', bg: '#F3E8FF' },
    practica: { color: '#4A7C59', bg: '#E8F5E9' },
    deducta: { color: '#6B7280', bg: '#F3F4F6' },
    critica: { color: '#F59E0B', bg: '#FEF3C7' },
    creatica: { gradient: 'linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)', bg: '#FDF2F8' },
  },
  spacing: {
    xs: '4mm',
    sm: '8mm',
    md: '12mm',
    lg: '16mm',
    xl: '24mm',
  },
  typography: {
    display: { family: 'Quicksand', weight: 700, size: '36pt', lineHeight: 1.1 },
    h1: { family: 'Quicksand', weight: 700, size: '22pt', lineHeight: 1.25 },
    body: { family: 'Open Sans', weight: 400, size: '11pt', lineHeight: 1.6 },
    story: { family: 'Crimson Text', weight: 400, size: '12pt', lineHeight: 1.7 },
    accent: { family: 'Caveat', weight: 400, size: '14pt', lineHeight: 1.5 },
  },
} as const;
```

**Validation**: This config should have NO FALLBACKS. Every color, spacing value is explicitly defined.

---

### **Task 2: Create BasePage Component** (3 hours)

Create `/components/design-system/BasePage.tsx`:

This is the A4 page template that EVERY page inherits from.

```typescript
import { motion } from 'motion';
import { ReactNode } from 'react';

interface BasePageProps {
  children: ReactNode;
  levelColor: string;
  pageNumber: number;
  pageTitle: string;
}

export function BasePage({
  children,
  levelColor,
  pageNumber,
  pageTitle,
}: BasePageProps) {
  // NO FALLBACKS - validation
  if (!levelColor || levelColor === '') {
    throw new Error('BasePage: levelColor is required and cannot be empty');
  }
  if (!pageTitle || pageTitle === '') {
    throw new Error('BasePage: pageTitle is required and cannot be empty');
  }
  if (pageNumber < 1) {
    throw new Error('BasePage: pageNumber must be >= 1');
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative w-[210mm] h-[297mm] bg-white overflow-hidden print:shadow-none mx-auto"
    >
      {/* Content Area: 180mm × 262mm */}
      {/* Margins: 15mm top/sides, 20mm bottom (reserved for purple bar) */}
      <motion.div
        className="absolute top-[15mm] left-[15mm] right-[15mm] bottom-[20mm] overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {children}
      </motion.div>

      {/* Purple Bar - ALWAYS PRESENT, ALWAYS #6B3FA0, ALWAYS 12mm */}
      <PurpleBar
        pageTitle={pageTitle}
        pageNumber={pageNumber}
      />
    </motion.div>
  );
}

interface PurpleBarProps {
  pageTitle: string;
  pageNumber: number;
}

function PurpleBar({ pageTitle, pageNumber }: PurpleBarProps) {
  const PURPLE_BAR = '#6B3FA0'; // NON-NEGOTIABLE

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[12mm] flex items-center justify-between px-[12mm] text-white"
      style={{ backgroundColor: PURPLE_BAR }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      {/* TISA Logo (left) */}
      <div className="font-bold text-[8pt]">TISA</div>

      {/* Page Title (center-left) */}
      <div className="flex-1 ml-[8mm] text-[9pt] font-semibold truncate">
        {pageTitle}
      </div>

      {/* Page Number (center-right) */}
      <div className="text-[9pt] mr-[8mm]">Page {pageNumber}</div>

      {/* Decorative Element (right) */}
      <motion.div
        className="w-2 h-2 rounded-full bg-white"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
```

**Checklist**:
- ✅ A4 dimensions exact: 210mm × 297mm
- ✅ Margins exact: 15mm (top/sides), 20mm (bottom)
- ✅ Purple bar: #6B3FA0, 12mm height
- ✅ Framer Motion animations for smooth entrance
- ✅ NO FALLBACKS - all parameters validated

---

### **Task 3: Create PageHeader Component** (2 hours)

Create `/components/design-system/PageHeader.tsx`:

```typescript
import { motion } from 'motion';

interface PageHeaderProps {
  icon: string;
  title: string;
  subtitle?: string;
  bgColor: string;
  height?: string;
}

export function PageHeader({
  icon,
  title,
  subtitle,
  bgColor,
  height = '35mm',
}: PageHeaderProps) {
  return (
    <motion.div
      className="w-full rounded-lg p-[12mm] flex flex-col justify-center"
      style={{
        backgroundColor: bgColor,
        height: height,
        color: 'white',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-[8mm]">
        <span className="text-4xl">{icon}</span>
        <div>
          <h2 className="text-[20pt] font-quicksand font-bold leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[10pt] font-opensans opacity-90">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

---

### **Task 4: Set Up Content Loader** (2 hours)

Create `/lib/content/loader.ts`:

```typescript
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface PageFrontmatter {
  component_type: string;
  component_number: number;
  block_name: string;
  lesson: {
    number: number;
    title: string;
  };
  page_template: string;
  [key: string]: any;
}

export interface ParsedPage {
  filename: string;
  frontmatter: PageFrontmatter;
  markdown: string;
  componentType: string;
  componentNumber: number;
}

export async function loadLessonContent(
  workbookId: string,
  lessonId: string
): Promise<ParsedPage[]> {
  const lessonPath = path.join(
    process.cwd(),
    'content',
    workbookId,
    lessonId
  );

  // Read all files in lesson directory
  const files = await fs.readdir(lessonPath);

  // Parse markdown files
  const pages = await Promise.all(
    files
      .filter(f => f.endsWith('.md') && !f.startsWith('_'))
      .map(async (filename) => {
        const fullPath = path.join(lessonPath, filename);
        const fileContent = await fs.readFile(fullPath, 'utf-8');

        const { data: frontmatter, content: markdown } = matter(fileContent);

        // Validate frontmatter (NO FALLBACKS!)
        validateFrontmatter(frontmatter, filename);

        return {
          filename,
          frontmatter: frontmatter as PageFrontmatter,
          markdown,
          componentType: frontmatter.component_type,
          componentNumber: frontmatter.component_number,
        };
      })
  );

  // Sort by component_number
  return pages.sort((a, b) => a.componentNumber - b.componentNumber);
}

function validateFrontmatter(data: any, filename: string): void {
  const required = ['component_type', 'component_number', 'block_name', 'lesson', 'page_template'];

  for (const field of required) {
    if (!(field in data)) {
      throw new Error(
        `Missing required field "${field}" in ${filename}. ` +
        `All markdown files must have YAML frontmatter with: ${required.join(', ')}`
      );
    }
  }

  if (!Number.isInteger(data.component_number) || data.component_number < 1) {
    throw new Error(
      `Invalid component_number in ${filename}. Must be positive integer.`
    );
  }
}
```

**Purpose**: This loader validates ALL markdown files have correct YAML frontmatter. Fails fast if anything is missing.

---

### **Task 5: Set Up Markdown Parser** (1 hour)

Create `/lib/rendering/markdown-renderer.ts`:

```typescript
import { MDXRemote } from 'next-mdx-remote/rsc';

interface MarkdownRendererProps {
  content: string;
  components?: Record<string, React.ComponentType<any>>;
}

export async function MarkdownRenderer({
  content,
  components = {},
}: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
```

---

### **Task 6: Test with Real Content** (2 hours)

Copy the lesson-02-money content:

```bash
# From your studybooks project
cp -r /Users/artyomx/projects/tisaverse-studybooks/economics-fairy-tales \
  /Users/artyomx/projects/tisaverse-studybooks-app/content/
```

Create a test route `/app/test/page.tsx`:

```typescript
import { loadLessonContent } from '@/lib/content/loader';
import { BasePage } from '@/components/design-system/BasePage';
import { PageHeader } from '@/components/design-system/PageHeader';

export default async function TestPage() {
  try {
    const pages = await loadLessonContent(
      'economics-fairy-tales',
      'lesson-02-money'
    );

    return (
      <main className="bg-gray-50 p-8">
        <h1 className="text-3xl font-bold mb-8 text-tisa-purple">
          Test: Loaded {pages.length} Pages
        </h1>

        {pages.map((page, i) => (
          <div key={page.filename} className="mb-8">
            <h2 className="text-xl font-bold">
              {i + 1}. {page.frontmatter.block_name}
            </h2>
            <p className="text-gray-600">
              Type: {page.frontmatter.component_type}
            </p>
          </div>
        ))}

        {/* Render first page as sample */}
        <div className="mt-12 border-t-2 pt-8">
          <h3 className="text-2xl font-bold mb-8">Sample: First Page Rendered</h3>
          <BasePage
            levelColor="#2D5A27"
            pageNumber={1}
            pageTitle={pages[0]?.frontmatter.block_name || 'Test'}
          >
            <PageHeader
              icon="🏰"
              title={pages[0]?.frontmatter.block_name || 'Test'}
              bgColor="#2D5A27"
              height="35mm"
            />
            <div className="mt-[8mm] p-[12mm] bg-tisa-cream rounded-lg">
              <p className="text-[11pt]">
                {pages[0]?.markdown.substring(0, 200)}...
              </p>
            </div>
          </BasePage>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <pre className="bg-red-50 p-4 rounded mt-4 text-sm">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </main>
    );
  }
}
```

---

## ✅ Week 1 Success Criteria

- [ ] `npm run dev` starts without errors
- [ ] Landing page visible at `http://localhost:3000`
- [ ] `/test` page loads markdown files correctly
- [ ] BasePage renders with purple bar (#6B3FA0)
- [ ] All 13 pages from lesson-02-money parsed successfully
- [ ] Design tokens configured with NO FALLBACKS
- [ ] TypeScript strict mode passes
- [ ] No console errors

---

## 📊 Estimated Timeline

- **Task 1** (Design Tokens): 2 hours
- **Task 2** (BasePage): 3 hours
- **Task 3** (PageHeader): 2 hours
- **Task 4** (Content Loader): 2 hours
- **Task 5** (Markdown Parser): 1 hour
- **Task 6** (Testing): 2 hours
- **Buffer**: 2 hours

**Total**: ~14 hours (fits in Week 1!)

---

## 🎯 After Week 1

You'll have:
✅ Core page infrastructure (BasePage + PurpleBar)
✅ Content loading system (validates markdown)
✅ Design system ready (colors, spacing, typography)
✅ Test suite running
✅ Ready to build 13 page type components in Week 2

---

## 🚀 Let's Go!

```bash
npm run dev
```

Navigate to `http://localhost:3000` and see your foundation ready! 🎉

