# TISAverse Studybooks - Markdown Format Analysis

## Executive Summary

Complete analysis of ALL 117 markdown files across 9 lessons (02-10) in `content/workbooks/economics-fairy-tales/`. This document identifies every format variation that the body parser needs to handle.

---

## Content Structure Overview

### File Structure Per Lesson
Every lesson contains exactly **13 files**:

| # | Filename | Component Type | Purpose |
|---|----------|----------------|---------|
| - | `_module_overview.md` | lesson | Lesson metadata & overview |
| 01 | `01-story.md` | story | Kingdom Chronicle narrative |
| 02 | `02-glossary.md` | glossary | Wisdom Path vocabulary |
| 03 | `03-task-remembery.md` | task | Memory/recall exercises |
| 04 | `04-task-intellecta.md` | task | Understanding/analysis |
| 05 | `05-task-practica.md` | task | Practical application |
| 06 | `06-task-deducta.md` | task | Logic/deduction |
| 07 | `07-task-critica.md` | task | Critical thinking |
| 08 | `08-task-creatica.md` | task | Creative/design |
| 09 | `09-test.md` | test | Royal Checkpoint quiz |
| 10 | `10-mindmap.md` | mindmap | Knowledge organization |
| 11 | `11-homework.md` | homework | Moonlight Mission |
| 12 | `12-assessment.md` | assessment | Self-evaluation |

**Total:** 9 lessons × 13 files = **117 markdown files**

---

## Glossary Format Analysis (Critical)

### Term Count by Lesson

| Lesson | Topic | Term Count |
|--------|-------|------------|
| 2 | Money | 7 |
| 3 | Production | 9 |
| 4 | Consumption | 5 |
| 5 | Trade & Market | 6 |
| 6 | Wealth | 6 |
| 7 | Division of Labour | 4 |
| 8 | Insurance | 6 |
| 9 | Entrepreneurship | 6 |
| 10 | Finance | 4 |

### Standard Term Format
```markdown
### ① [Term Name]
**Definition:** [Full definition text]
**Icon:** [Emoji]
**Examples:** [Comma-separated examples]
```

### Format Variations by Lesson

#### Lesson 2 (Money) - UNIQUE: Visual Field
```markdown
### ① Money
**Definition:** Something we use to pay for things like toys, food, or clothes.
**Icon:** 💰
**Visual:** Stack of coins and notes together
**Example:** "The £20 note has Queen Elizabeth on it!"
```
- Has `**Visual:**` field (ONLY in Lesson 2)
- Uses singular `**Example:**`

#### Lesson 3 (Production) - Standard with Plural Examples
```markdown
### ① Goods
**Definition:** Things that you can physically touch...
**Icon:** 📦
**Examples:** Apples, books, bicycles, teddy bears
```

#### Lesson 7 (Division of Labour) - MULTILINE Bullet Examples
```markdown
### ③ Product of Labour
**Definition:** The material or non-material RESULT of a person's work.
**Icon:** 📦
**Examples:**
- A baker's product = bread, cakes, pastries
- A farmer's product = vegetables, fruits
- A teacher's product = knowledge, educated students!
```
- Examples use bullet-point format across multiple lines

#### Lesson 9 (Entrepreneurship) - UNIQUE: Simple Field Replaces Examples
```markdown
### ① Entrepreneurship
**Definition:** An economic activity in which a person uses their own resources...
**Icon:** 💼
**Simple:** Starting and running a business with the goal of making money.
```
- Uses `**Simple:**` instead of `**Examples:**`
- NO examples field at all

#### Lesson 10 (Finance) - UNIQUE: Multiple Special Fields
```markdown
### ③ Profit
**Definition:** Money earned in trade or business after paying all expenses.
**Icon:** 📈
**Simple:** What you KEEP after paying everything you owe!
**The Magic Formula:** PROFIT = INCOME - EXPENSES
**Example:** 20 (income) - 7 (expenses) = 13 profit!

### ④ Bankruptcy
**Definition:** When a person or business cannot pay back what they owe...
**Icon:** 📉
**Simple:** Running out of money and being unable to pay debts.
**Warning:** If expenses are MORE than income for too long — trouble!
```
- Combines `**Simple:**` + `**Example:**`
- Has `**The Magic Formula:**` field
- Has `**Warning:**` field

### Parser Field Requirements

| Field | Lessons Present | Parser Status |
|-------|-----------------|---------------|
| `**Definition:**` | ALL | ✅ Working |
| `**Icon:**` | ALL | ✅ Working |
| `**Example:**` (singular) | 2, 8, 10 | ✅ Working |
| `**Examples:**` (plural) | 3-8 | ✅ Working |
| `**Visual:**` | 2 only | ❌ MISSING |
| `**Simple:**` | 9, 10 | ❌ MISSING |
| `**The Magic Formula:**` | 10 only | ❌ MISSING |
| `**Warning:**` | 10 only | ❌ MISSING |
| Multiline bullet examples | 7 | ⚠️ PARTIAL |

---

## Task Format Analysis

### Task Types (6 Owl Variants)

| Owl | Focus | Difficulty | Color |
|-----|-------|------------|-------|
| Remembery | Memory, recall, recognition | ⭐ Easy | #7EB8DA (Blue) |
| Intellecta | Understanding, analysis | ⭐⭐ Medium | #8B5CF6 (Purple) |
| Practica | Application, practical skills | ⭐-⭐⭐ | #4A7C59 (Green) |
| Deducta | Logic, deduction, comparison | ⭐⭐ Medium | #6B7280 (Gray) |
| Critica | Critical thinking, evaluation | ⭐⭐⭐ Hard | #F59E0B (Orange) |
| Creatica | Creativity, design, expression | ⭐⭐ Medium | Rainbow gradient |

### Task Format Types Found

#### Remembery Tasks
- **Riddle-solving:** Poem-style clues with answer blanks
- **Word search:** ASCII grid with hidden vocabulary
- **Vocabulary matching:** Word bank + definition cards

#### Intellecta Tasks
- **Drawing + explanation:** Large drawing area + writing prompts
- **Matching with categorization:** Two columns with connecting lines
- **Sorting/categorization:** Items into multi-column tables

#### Practica Tasks
- **Visual selection:** Circle/select items from grid
- **Sequencing with stickers:** Order steps in a process
- **Schedule/time-based:** Fill in daily activities

#### Deducta Tasks
- **Comparison charts:** Table comparing two items with checkmarks
- **Character needs analysis:** Compare characters' situations
- **Mismatch detection:** Find errors in scenarios

#### Critica Tasks
- **Pros & cons debate:** Two boxes for good/bad things
- **Feature evaluation checklist:** Rate features with checkmarks
- **Scenario-based evaluation:** Choose between options with reasoning

#### Creatica Tasks
- **Design projects:** Draw coins, currency, products
- **Metaphor/conceptual:** Garden of wealth, growth imagery
- **Business creation:** Design your own business

### Task Layout Structure (All Types)
```
┌─ HEADER (Owl type, task number, difficulty) ─┐
├─ INSTRUCTION ZONE (context, prompt) ─────────┤
├─ MAIN TASK ZONE (activity content) ──────────┤
├─ [OPTIONAL] REFLECTION ZONE ─────────────────┤
├─ SELF-CHECK (3-4 checkbox items) ────────────┤
└─ FOOTER (TISA branding, page number) ────────┘
```

---

## Test Format Analysis

### Question Types Found

| Type | Format | Example |
|------|--------|---------|
| Multiple Choice | `□ a) Option` | "Which is NOT a service?" |
| Multiple Answer | Same + "may have MORE THAN ONE" | "Select all goods" |
| Ordering | `□ Item [ ]` with number blanks | "Put in order 1-5" |
| Fill-in-blank | `______ coins` | "TOTAL COST: ___" |
| Short Answer | Multiple blank lines | "Explain why..." |

### Answer Key Format
```markdown
## ✅ Answer Key

### Question 1: [Topic] (Type)
| Item | Answer |
|------|--------|
| [Item] | [Position/Value] |

**Correct Answer:** ✓ [Answer]
*Explanation:* [Brief explanation]
```

---

## Assessment Format Analysis

### Framework Variants Found

#### 1. ECA Framework (Lessons 2, 10)
- **E**xample: Where you used new knowledge
- **C**heck: What went well & needs improvement
- **A**dvice: Next steps for learning
- **Word of the Day:** Choose 1 term to remember

Color coding:
- Example: Yellow (#FEF9C3)
- Check: Green (#ECFDF5)
- Advice: Purple (#F3E8FF)
- Word: Gold (#FFFBEB)

#### 2. Orange Slices (Lesson 3, others)
- Circular diagram with 8 sentence starters
- Choose 2+ slices to complete
- Example starters: "I learned that...", "Now I can..."

#### 3. Steps to Success Ladder (Lessons 4, 5, others)
- 4-level progression (Steps 0-3)
- Step 0: Still Learning
- Step 1: Starting (⭐)
- Step 2: Getting There (⭐⭐)
- Step 3: Expert (🌟)

---

## Mindmap Format Analysis

### Standard Structure
```
       [Branch 1]     [Branch 2]
           \            /
            \          /
        ●═══════════●  ← Central Topic
            /          \
           /            \
    [Branch 3]     [Branch 4]
```

### Data Structure
- Central concept: Emoji + Topic name (e.g., `💰 MONEY`)
- 5-6 radial branches
- Branch suggestions table with content ideas

---

## Homework Format Analysis

### Mission Structure
```
╔═══════════════════════════════════════╗
║  🎯 YOUR MISSION:                     ║
║  [Mission narrative/context]          ║
║  • [Objective 1]                      ║
║  • [Objective 2]                      ║
╚═══════════════════════════════════════╝
```

### Task Types
1. **Narrative Writing:** Story/description (4 blank lines)
2. **Planning/Strategy:** Tables or structured planning
3. **Creative/Visual:** Drawing space (55mm height)

---

## Visual Pattern Conventions

### ASCII Box Drawing
```
┌─ HEADER ────────────────────────┐
│  Content area                   │
└─────────────────────────────────┘
```

### Emoji Usage by Component
| Component | Signature Emoji |
|-----------|-----------------|
| Story | 🏰 |
| Glossary | 📚 |
| Task (general) | 🦉 |
| Creatica | 🎨 |
| Test | 💎 |
| Mindmap | 🧠 |
| Homework | 📦 |
| Assessment | 📏 or 🪜 |

### Number Patterns
- Circled: ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ ⑩
- Keycap: 1️⃣ 2️⃣ 3️⃣
- Stars: ⭐ (Easy) ⭐⭐ (Medium) ⭐⭐⭐ (Hard)

### Blank Line Patterns
- Single: `_________________________________________________________`
- Checkbox: `□` or `☐`
- Order blank: `[ ]`

---

## Parser Implementation Requirements

### Priority 1: Glossary Parser Fixes
1. Add `**Simple:**` field extraction
2. Add `**Visual:**` field extraction
3. Add `**Warning:**` field extraction
4. Add `**The Magic Formula:**` field extraction
5. Handle multiline bullet examples

### Priority 2: Test Parser
1. Parse question numbers and types
2. Extract options for multiple choice
3. Parse answer key tables
4. Handle fill-in-blank patterns

### Priority 3: Task Parser
1. Extract task instructions from zones
2. Parse self-check items
3. Handle drawing zone dimensions
4. Extract word bank items

### Priority 4: Other Parsers
1. Mindmap branch extraction
2. Homework mission/task extraction
3. Assessment framework detection

---

## Conclusion

The markdown content is highly consistent across lessons, with predictable patterns for each component type. The main parser gaps are:

1. **Glossary:** Missing 4 field types (`Simple`, `Visual`, `Warning`, `Formula`)
2. **Test:** Basic parser exists but needs question type detection
3. **Tasks:** Need instruction/self-check extraction
4. **Others:** Basic rendering works, structured data extraction incomplete

**Recommendation:** Start with glossary parser fixes as they affect user-visible content immediately.

---

## Implementation Plan (Approved)

### Files to Modify

1. **`/lib/content/body-parser.ts`** - Add field extraction:
   ```typescript
   // Add to ParsedGlossaryTerm interface
   simple?: string;
   visual?: string;
   warning?: string;
   formula?: string;

   // Add parsing for:
   **Simple:** -> simple
   **Visual:** -> visual
   **Warning:** -> warning
   **The Magic Formula:** -> formula

   // Handle multiline bullet examples
   ```

2. **`/types/content.ts`** - Update GlossaryFrontmatter:
   ```typescript
   terms: Array<{
     term: string;
     definition: string;
     icon?: string;
     example?: string;
     simple?: string;      // ADD
     visual?: string;      // ADD
     warning?: string;     // ADD
     formula?: string;     // ADD
   }>;
   ```

3. **`/components/page-types/GlossaryPage.tsx`** - Display new fields:
   - Show `simple` as alternative to example
   - Show `formula` in highlighted box
   - Show `warning` with warning styling

### Testing After Implementation
- Lesson 2: Check Visual field displays
- Lesson 7: Check multiline examples work
- Lesson 9: Check Simple field displays
- Lesson 10: Check Formula and Warning display
