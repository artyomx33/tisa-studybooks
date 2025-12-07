# ═══════════════════════════════════════════════════════════════════════════════
# 🚀 TISAVERSE VISUAL COMPOSER — GEMINI HANDOFF
# ═══════════════════════════════════════════════════════════════════════════════
# 
# Hey Gemini! 👋
# 
# You're about to build something magical: a visual rendering system for 
# children's educational workbooks. This document tells you everything 
# you need to know to get started.
#
# ═══════════════════════════════════════════════════════════════════════════════

## 🎯 PROJECT OVERVIEW

**What We're Building:**
A web-based "Visual Composer" that renders beautiful, print-ready educational 
workbook pages from structured markdown files. Think of it as a specialized 
page layout engine for children's educational content.

**The Product:**
- TISA MBA: A series of 10 workbooks teaching business/economics to kids ages 5-11
- Each workbook has 10 lessons
- Each lesson has 13 components (story, glossary, 6 tasks, test, mind map, homework, assessment)
- All content is stored as markdown files with YAML frontmatter
- Your job: render these markdown files as beautiful, interactive pages

**The Vision:**
Teachers and content creators drop in markdown files → beautiful workbook pages appear.
No design skills needed. The system handles all visual rendering automatically.

---

## 📁 FILES YOU HAVE (Read in This Order!)

### 1️⃣ START HERE: `_curriculum_master.md`
**What it contains:**
- All 10 workbooks defined (titles, colors, grade levels)
- The Six Wise Owls system (characters + colors)
- Universal lesson structure (12 components per lesson)
- Block types and their purposes
- File naming conventions

**Why read first:** This gives you the "what" — what content exists and how it's organized.

---

### 2️⃣ THEN: `_design_system.md`
**What it contains:**
- The Purple Anchor System (every page has TISA Purple bar at bottom)
- A4 grid system (210mm × 297mm, margins, columns)
- Typography system (fonts, sizes, hierarchy)
- Color application rules (how to use level colors)
- Spacing scale (4mm base unit)
- Child-friendly design principles

**Why read second:** This gives you the "how" — how everything should look.

---

### 3️⃣ THEN: `_page_type_library.md` ⭐ MOST IMPORTANT FOR CODING
**What it contains:**
- **13 page type templates** with exact specifications
- CSS-ready code for each page type
- Zone measurements in millimeters
- Component styling (cards, boxes, lines, etc.)
- Space calculators for dynamic content

**Why read third:** This is your **implementation guide** — copy these specs directly into code.

---

### 4️⃣ REFERENCE: `_cover_generator.md`
**What it contains:**
- Cover page layouts and zones
- Color gradients per grade level
- Midjourney prompts for generating cover art

**When to use:** When building the cover page renderer.

---

### 5️⃣ CONTENT: `economics-fairy-tales/lesson-02-money/`
**What it contains:**
- 13 complete markdown files for one lesson
- Real content you can use to test your renderer
- Each file has YAML frontmatter + structured content

**When to use:** As your test data while building.

---

## 🏗️ WHAT TO BUILD (Recommended Order)

### Phase 1: Core Page Shell
Build the base page template that ALL pages inherit:
```
┌─────────────────────────────────────────┐
│  [HEADER - level color, 30-35mm]        │
├─────────────────────────────────────────┤
│                                         │
│  [CONTENT AREA - flexible height]       │
│                                         │
├─────────────────────────────────────────┤
│  ████ TISA PURPLE BAR #6B3FA0 ████████  │  ← 12mm, ALWAYS PRESENT
│  [Logo] [Page Title] [Page #] [●]       │
└─────────────────────────────────────────┘
```

**Key specs:**
- Page size: 210mm × 297mm (A4)
- Margins: 15mm top/left/right, 20mm bottom
- Purple bar: ALWAYS #6B3FA0, ALWAYS 12mm height
- Content area: 180mm × 262mm

---

### Phase 2: Page Type Renderers
Build renderers for each page type (in order of complexity):

1. **Story Page** (`01-story.md`)
   - Header with icon + title
   - Illustration zone
   - Story text with cream background
   - Letter/scroll styling for special content

2. **Glossary Page** (`02-glossary.md`)
   - Winding path SVG
   - Term cards positioned along path
   - Character decorations

3. **Owl Task Pages** (`03-08-task-*.md`)
   - 6 variants, one per owl
   - Each has: header, instructions, work zone, self-check
   - Color-coded by owl (see `_curriculum_master.md`)

4. **Test Page** (`09-test.md`)
   - Question blocks with numbering
   - Multiple choice options
   - Completion zone

5. **Mind Map Page** (`10-mindmap.md`)
   - Central node + branch structure
   - Curved connection lines

6. **Homework Page** (`11-homework.md`)
   - Night sky gradient header
   - Mission scroll styling
   - Task zones

7. **Assessment Page** (`12-assessment.md`)
   - ECA framework blocks (Example, Check, Advice)
   - Color-coded sections
   - Word of the day box

---

### Phase 3: Interactive Elements (Optional)
If building for web (not just PDF export):
- Sticker drag-and-drop zones
- Drawing canvas
- Line connector for matching
- Checkbox toggling

---

## 🎨 CRITICAL DESIGN RULES

### Rule 1: The Purple Anchor
**EVERY page has a #6B3FA0 purple bar at the bottom.**
This is non-negotiable. It's the brand anchor that ties everything together.

### Rule 2: Level Colors
Each grade has a primary color. Use it for:
- Headers
- Icons and badges
- Borders and accents
- Progress indicators

**DO NOT** use level color for the bottom bar (that's always purple).

### Rule 3: The Six Owls Have Their Own Colors
| Owl | Color | Background |
|-----|-------|------------|
| Remembery | #7EB8DA | #EBF5FB |
| Intellecta | #8B5CF6 | #F3E8FF |
| Practica | #4A7C59 | #E8F5E9 |
| Deducta | #6B7280 | #F3F4F6 |
| Critica | #F59E0B | #FEF3C7 |
| Creatica | Rainbow gradient | #FDF2F8 |

### Rule 4: Child-Friendly Typography
- Minimum body text: 11pt
- Maximum line length: 70 characters
- Line spacing: 1.5 or more
- Always left-aligned (no justified text)

### Rule 5: Space for Writing
- Single line: 10mm height
- Short answer: 20mm (2 lines)
- Medium answer: 40mm (4 lines)
- Long answer: 60mm (6 lines)

---

## 📝 HOW MARKDOWN FILES ARE STRUCTURED

Every content file has:

```yaml
---
# YAML Frontmatter (metadata)
component_type: "story"
component_number: 1
block_name: "🏰 Kingdom Chronicle"
page_template: "story-split"

lesson:
  number: 2
  title: "Money"

# ... more metadata
---

# Markdown Content Below

## Section Headers

Content paragraphs...

### Subsections

- Lists
- Content
```

**Your renderer should:**
1. Parse the YAML frontmatter
2. Determine page type from `component_type` or `page_template`
3. Apply the correct template
4. Render the markdown content into the template zones

---

## 🔄 HOW NEW CONTENT GETS ADDED

This is the beautiful part — **the system is modular!**

When we create Lesson 3, 4, 5, etc., they will have:
- The exact same file structure as Lesson 2
- The exact same YAML frontmatter patterns
- The exact same page types

**Your renderer doesn't need to change.** You just drop new markdown files in, and they render automatically because they follow the same specs.

```
/economics-fairy-tales/
├── lesson-02-money/      ← Currently complete
│   ├── 01-story.md
│   ├── 02-glossary.md
│   └── ... (13 files)
├── lesson-03-production/ ← Coming soon (same structure!)
├── lesson-04-consumption/
└── ...
```

---

## 🚀 QUICK START CHECKLIST

- [ ] Read `_curriculum_master.md` (understand the content)
- [ ] Read `_design_system.md` (understand the visual rules)
- [ ] Read `_page_type_library.md` (get implementation specs)
- [ ] Build base page shell with purple bar
- [ ] Build Story Page renderer using `lesson-02-money/01-story.md` as test
- [ ] Build Glossary Page renderer
- [ ] Build the 6 Owl Task renderers
- [ ] Build remaining page types
- [ ] Add export functionality (PDF, print)

---

## 💡 TIPS FOR SUCCESS

1. **Start with CSS variables** — all colors and spacing are defined in `_page_type_library.md`

2. **Use millimeters for layout** — the specs are in mm for print accuracy. Convert to pixels for screen (1mm ≈ 3.78px at 96dpi)

3. **The ASCII layouts are your wireframes** — every page type has an ASCII diagram showing exact zone placement

4. **Test with real content** — `lesson-02-money/` has 13 complete files ready to render

5. **The frontmatter tells you everything** — component_type, owl name, colors, layout variant

---

## ❓ QUESTIONS TO ASK YOURSELF

- "Does this page have the purple bar at the bottom?" (Yes, always!)
- "Am I using the owl's color for this task?" (Check the owl name in frontmatter)
- "Is there enough space for a child to write?" (Minimum 10mm per line)
- "Can this be printed on A4?" (Stay within 180mm × 262mm content area)

---

## 🎉 YOU'VE GOT THIS!

The hard work of designing the system is done. 
The content structure is defined.
The visual rules are clear.

Now it's time to bring it to life! Build something beautiful. 🚀

---

*This handoff document was created by Claude for the TISAverse project.*
*All specifications reference the accompanying design system files.*
