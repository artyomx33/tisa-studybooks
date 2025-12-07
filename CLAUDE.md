# TISAverse Studybooks - Development Rules

## CRITICAL RULES - NO EXCEPTIONS

### 1. NO MOCK DATA - EVER
- **NEVER** use mock data, sample data, or placeholder content
- **NEVER** generate fake content to "make things work"
- If real data doesn't exist, the feature doesn't work yet - that's fine
- Code must fail clearly when data is missing, not silently use fakes

### 2. NO FALLBACKS - EVER
- **NEVER** use try/catch to silently fall back to mock data
- **NEVER** use `|| mockData` or `?? fallbackData` patterns
- **NEVER** use "if not found, use default" for content
- Errors should be visible and clear, not hidden behind fallbacks

### 3. NO WORKAROUNDS
- If something doesn't work, we fix it properly
- Don't patch around problems - solve them at the source
- If a fix requires significant work, TELL ME - don't hack around it

### 4. FAIL LOUDLY
- Missing content = error shown to user/developer
- Missing config = build fails
- Invalid data = clear error message
- Never pretend things work when they don't

### 5. ASK BEFORE ASSUMING
- If you're tempted to add mock/fallback data, STOP and ask me first
- If a feature needs data that doesn't exist, tell me
- If something is broken, show me - don't hide it

## Why These Rules Matter
- Mock data hides bugs - you never know what's real vs fake
- Fallbacks mask failures - problems become invisible
- Workarounds create technical debt - they accumulate and rot
- Clear failures = fast fixes

## Search Strategy - USE GREP FIRST
- **ALWAYS** use grep before reading files to find relevant code
- When fixing errors: grep ALL files in codebase to not miss anything
- When searching for patterns: grep first, then read specific files
- When understanding a feature: grep to find all related files

### Grep Examples
```bash
# Find all usages of a component
grep -rn "GlossaryPage" --include="*.tsx"

# Find all files with specific pattern
grep -rn "frontmatter.terms" --include="*.tsx"

# Find imports
grep -rn "import.*from.*content" --include="*.tsx"
```

## Project Stack
- Next.js 16 + React 19 + TypeScript 5.9
- Tailwind CSS 4
- Supabase (database + auth)
- Content: Markdown files with gray-matter frontmatter

## Content Location
- `/content/workbooks/{workbook-id}/` - Workbook content
- `/content/_*.md` - Design system docs

## Database Tables (Supabase)
- `studybooks_progress` - Page completion tracking
- `studybooks_preferences` - Learning preferences
- `studybooks_drawings` - Canvas saves
- `studybooks_stickers` - Sticker placements
