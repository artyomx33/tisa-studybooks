---
# ═══════════════════════════════════════════════════════════════════════════════
# TISAVERSE DESIGN SYSTEM SPECIFICATION
# ═══════════════════════════════════════════════════════════════════════════════
# The complete visual design rulebook for all TISA MBA workbooks
# Version: 1.0
# Last Updated: 2025-01-XX
# References: _curriculum_master.md
# ═══════════════════════════════════════════════════════════════════════════════

system_name: "TISAverse Design System"
design_version: "1.0"
target_formats: ["web", "print", "pdf"]
base_format: "A4"
---

# 🎨 TISAVERSE DESIGN SYSTEM

## The Visual Language of TISA MBA

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 1: THE PURPLE ANCHOR SYSTEM
# ═══════════════════════════════════════════════════════════════════════════════

## 🟣 Brand Consistency Through the Purple Bar

Every single page in every TISA workbook has ONE constant element:
**The TISA Purple Bottom Bar**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │           [LEVEL COLOR - Content Area]                  │   │
│  │                                                         │   │
│  │    All content lives here in the LEVEL COLOR            │   │
│  │                                                         │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  ████████████████ TISA PURPLE BAR ████████████████████████████  │  ← 12mm height
│  [TISA Logo]     [Page Title]            [Page #] [Workbook]   │
└─────────────────────────────────────────────────────────────────┘
```

### Purple Bar Specifications

```yaml
purple_bar:
  height: "12mm"  # Print / 45px Web
  color: "#6B3FA0"
  position: "bottom"
  extends: "full-width"
  
  contents:
    left:
      - element: "TISA Logo"
        type: "icon"
        size: "8mm"
        color: "white"
        margin_left: "8mm"
    
    center:
      - element: "Page Title"
        type: "text"
        font: "Quicksand Bold"
        size: "10pt"
        color: "white"
        text_transform: "uppercase"
    
    right:
      - element: "Page Number"
        type: "text"
        font: "Quicksand Medium"
        size: "9pt"
        color: "white"
      - element: "Workbook Indicator"
        type: "colored-dot"
        size: "6mm"
        color: "{level_color}"  # Dynamic based on workbook
        margin_right: "8mm"
```

### Why This Works (Design Psychology)

| Principle | Application |
|-----------|-------------|
| **Brand Recognition** | Kids instantly know it's TISA material |
| **Visual Anchor** | Consistent element creates familiarity |
| **Progress Indicator** | Colored dot shows which level they're in |
| **Professional Polish** | Clean footer elevates perceived quality |
| **Print Consistency** | Works in color AND black-and-white |

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 2: A4 GRID SYSTEM
# ═══════════════════════════════════════════════════════════════════════════════

## 📐 The Master Grid

All pages are designed for **A4 format** (210mm × 297mm) to ensure:
- Web display matches print output
- PDF exports are print-ready
- Consistent spacing across all platforms

### Page Dimensions

```yaml
page_dimensions:
  format: "A4"
  width: "210mm"   # 794px at 96dpi
  height: "297mm"  # 1123px at 96dpi
  
  # Safe Areas
  margins:
    top: "15mm"      # 57px
    bottom: "20mm"   # 76px (includes purple bar space)
    left: "15mm"     # 57px
    right: "15mm"    # 57px
  
  # Content Area (after margins)
  content_area:
    width: "180mm"   # 680px
    height: "262mm"  # 990px
  
  # Purple Bar Reserved Space
  purple_bar_zone:
    height: "12mm"
    position: "absolute-bottom"
```

### Grid Columns

```yaml
grid_system:
  columns: 12
  gutter: "5mm"  # 19px
  
  # Common Layouts
  layouts:
    full_width:
      columns: 12
      use: "stories, full illustrations"
    
    two_column:
      left: 6
      right: 6
      use: "matching tasks, comparison"
    
    two_third_one_third:
      main: 8
      sidebar: 4
      use: "content with sidebar tips"
    
    three_column:
      each: 4
      use: "glossary terms, card layouts"
```

### Vertical Rhythm

```yaml
vertical_rhythm:
  base_unit: "4mm"  # 15px - Everything is a multiple of this
  
  spacing_scale:
    xs: "4mm"    # 1 unit  - Inline spacing
    sm: "8mm"    # 2 units - Between related elements
    md: "12mm"   # 3 units - Between sections
    lg: "16mm"   # 4 units - Major section breaks
    xl: "24mm"   # 6 units - Page section dividers
    xxl: "32mm"  # 8 units - Hero spacing
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 3: TYPOGRAPHY SYSTEM
# ═══════════════════════════════════════════════════════════════════════════════

## 🔤 Font Families

```yaml
typography:
  
  # PRIMARY FONT - Headers & UI
  primary:
    family: "Quicksand"
    fallback: "Nunito, sans-serif"
    weights: [400, 500, 600, 700]
    use: "Headers, titles, navigation, UI elements"
  
  # SECONDARY FONT - Body Text
  secondary:
    family: "Open Sans"
    fallback: "Arial, sans-serif"
    weights: [400, 600]
    use: "Body text, paragraphs, long-form content"
  
  # ACCENT FONT - Special Elements
  accent:
    family: "Caveat"
    fallback: "Comic Sans MS, cursive"
    weights: [400, 700]
    use: "Handwritten notes, character speech, child-friendly labels"
  
  # STORY FONT - Narrative Text
  story:
    family: "Crimson Text"
    fallback: "Georgia, serif"
    weights: [400, 600, 400i]
    use: "Story passages, quotes, letters from characters"
```

### Type Scale

```yaml
type_scale:
  # Based on 1.25 ratio (Major Third)
  
  # DISPLAY - Cover pages, major titles
  display_1:
    size: "36pt"  # 48px
    line_height: 1.1
    weight: 700
    use: "Workbook title"
  
  display_2:
    size: "28pt"  # 37px
    line_height: 1.2
    weight: 700
    use: "Lesson title"
  
  # HEADINGS
  h1:
    size: "22pt"  # 29px
    line_height: 1.25
    weight: 700
    use: "Page title, block type name"
  
  h2:
    size: "18pt"  # 24px
    line_height: 1.3
    weight: 600
    use: "Section headers"
  
  h3:
    size: "14pt"  # 19px
    line_height: 1.4
    weight: 600
    use: "Subsection headers"
  
  h4:
    size: "12pt"  # 16px
    line_height: 1.4
    weight: 600
    use: "Task titles, small headers"
  
  # BODY TEXT
  body:
    size: "11pt"  # 15px
    line_height: 1.6
    weight: 400
    use: "Main content, instructions"
  
  body_large:
    size: "12pt"  # 16px
    line_height: 1.6
    weight: 400
    use: "Story text, emphasis paragraphs"
  
  # SMALL TEXT
  caption:
    size: "9pt"   # 12px
    line_height: 1.4
    weight: 400
    use: "Hints, notes, image captions"
  
  micro:
    size: "8pt"   # 11px
    line_height: 1.3
    weight: 400
    use: "Legal text, page numbers"
```

### Child-Friendly Typography Rules

```yaml
child_typography_rules:
  
  # Readability for ages 5-11
  minimum_body_size: "11pt"
  maximum_line_length: "70 characters"
  paragraph_max_lines: 6  # Break up long paragraphs
  
  # Visual Clarity
  letter_spacing: "0.01em"  # Slightly increased
  word_spacing: "0.05em"    # Slightly increased
  
  # Emphasis
  bold_for_key_terms: true
  avoid_all_caps_body: true
  all_caps_headers_only: true
  
  # Special Considerations
  dyslexia_friendly:
    - "Avoid justified text"
    - "Use left-aligned text"
    - "Adequate line spacing (1.5+)"
    - "Clear font distinctions"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 4: COLOR APPLICATION RULES
# ═══════════════════════════════════════════════════════════════════════════════

## 🎨 How Colors Are Applied

### Page Color Architecture

```yaml
color_architecture:
  
  # Layer 1: Page Background
  page_background:
    primary: "#FFFFFF"     # Clean white
    alternate: "#FAFAFA"   # Subtle off-white
    story_pages: "#FDF8F3" # Warm cream for stories
  
  # Layer 2: Content Blocks
  content_blocks:
    default: "#FFFFFF"
    tip_boxes: "{level_color_10%}"  # 10% opacity of level color
    warning_boxes: "#FEF3C7"        # Warm yellow
    character_speech: "#F3E8FF"     # Light purple
  
  # Layer 3: Level Color Application
  level_color_usage:
    headers: "{level_color}"
    icons: "{level_color}"
    borders: "{level_color}"
    buttons: "{level_color}"
    progress_indicators: "{level_color}"
    accent_backgrounds: "{level_color_10%}"
  
  # Layer 4: TISA Purple (Constant)
  tisa_purple_usage:
    bottom_bar: "always"
    logo: "always"
    premium_badges: "achievements"
    brand_elements: "covers, dividers"
```

### Color Contrast Requirements

```yaml
contrast_requirements:
  # WCAG AA compliance for children
  
  text_on_white:
    minimum_ratio: "4.5:1"
    body_text: "#36454F"      # Charcoal - ratio 9.5:1 ✓
    headers: "{level_color}"  # All level colors pass ✓
  
  text_on_level_color:
    always_use: "#FFFFFF"     # White text on colored backgrounds
    minimum_ratio: "4.5:1"
  
  text_on_purple_bar:
    color: "#FFFFFF"
    ratio: "8.2:1"  # Excellent ✓
```

### Owl Color System

```yaml
owl_colors:
  # Each owl has a distinct accent color
  
  remembery:
    primary: "#7EB8DA"   # Soft Blue
    background: "#EBF5FB"
    border: "#7EB8DA"
  
  intellecta:
    primary: "#8B5CF6"   # Deep Purple
    background: "#F3E8FF"
    border: "#8B5CF6"
  
  practica:
    primary: "#4A7C59"   # Earthy Green
    background: "#E8F5E9"
    border: "#4A7C59"
  
  deducta:
    primary: "#6B7280"   # Steel Gray
    background: "#F3F4F6"
    border: "#6B7280"
  
  critica:
    primary: "#F59E0B"   # Warm Orange
    background: "#FEF3C7"
    border: "#F59E0B"
  
  creatica:
    primary: "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)"
    background: "#FDF2F8"
    border: "#EC4899"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 5: PAGE TYPE TEMPLATES
# ═══════════════════════════════════════════════════════════════════════════════

## 📄 Standard Page Layouts

### Template 1: Story Page (Kingdom Chronicle)

```yaml
story_page:
  layout: "story-split"
  
  structure:
    # Full-width story spread
    header_zone:
      height: "40mm"
      contents: ["block_icon", "block_title", "lesson_badge"]
      background: "{level_color}"
      text_color: "#FFFFFF"
    
    illustration_zone:
      height: "80mm"
      position: "below-header"
      style: "full-width or split"
    
    story_text_zone:
      height: "120mm"
      columns: 1
      font: "Crimson Text"
      background: "#FDF8F3"  # Cream
      padding: "12mm"
      border: "decorative-frame"
    
    purple_bar:
      height: "12mm"
      position: "bottom"
  
  # Visual representation
  ascii_layout: |
    ┌─────────────────────────────────────┐
    │  🏰 KINGDOM CHRONICLE - Lesson 1    │ 40mm - Level Color Header
    ├─────────────────────────────────────┤
    │                                     │
    │        [ILLUSTRATION ZONE]          │ 80mm - Hero Image
    │                                     │
    ├─────────────────────────────────────┤
    │                                     │
    │  "Once upon a time, in a beautiful  │
    │   land full of green hills..."      │ 120mm - Story Text
    │                                     │
    │                                     │
    ├─────────────────────────────────────┤
    │  ████ TISA PURPLE BAR ████████████  │ 12mm
    └─────────────────────────────────────┘
```

### Template 2: Glossary Page (Wisdom Path)

```yaml
glossary_page:
  layout: "glossary-path"
  
  structure:
    header_zone:
      height: "30mm"
      contents: ["📚 Wisdom Path", "Lesson X Glossary"]
    
    path_zone:
      height: "210mm"
      layout: "winding-path"
      term_count: "4-6 per page"
      term_blocks:
        width: "60mm"
        height: "35mm"
        style: "rounded-rectangle"
        border: "{level_color}"
        background: "#FFFFFF"
    
    character_decorations:
      placement: "along-path"
      characters: ["owl", "squirrel", "rabbit"]
    
    purple_bar:
      height: "12mm"
  
  ascii_layout: |
    ┌─────────────────────────────────────┐
    │  📚 WISDOM PATH - Glossary          │ 30mm
    ├─────────────────────────────────────┤
    │    ┌─────────┐                      │
    │    │ TERM 1  │                      │
    │    └────┬────┘                      │
    │         │    ~~~path~~~             │
    │         └──────────┐                │
    │              ┌─────┴───┐            │
    │              │ TERM 2  │   🦉       │
    │              └────┬────┘            │
    │    ~~~path~~~     │                 │ 210mm
    │    ┌──────────────┘                 │
    │    │                                │
    │ ┌──┴──────┐              ┌────────┐ │
    │ │ TERM 3  │   ~~~path~~~ │ TERM 4 │ │
    │ └─────────┘      🐿️     └────────┘ │
    ├─────────────────────────────────────┤
    │  ████ TISA PURPLE BAR ████████████  │ 12mm
    └─────────────────────────────────────┘
```

### Template 3: Task Page (Owl Challenge)

```yaml
task_page:
  layout: "owl-challenge"
  
  structure:
    header_zone:
      height: "35mm"
      contents:
        left: ["owl_icon", "owl_name"]
        center: ["task_title"]
        right: ["difficulty_badge"]
      background: "{owl_color_background}"
      border_bottom: "{owl_color} 3px"
    
    instruction_zone:
      height: "25mm"
      contents: ["task_instructions", "hint_box"]
      font: "Open Sans"
      style: "clear-numbered-steps"
    
    work_zone:
      height: "flexible"  # Remaining space
      types:
        matching: "two-column-with-lines"
        writing: "lined-area"
        drawing: "bordered-empty-box"
        table: "structured-grid"
        multiple_choice: "checkbox-list"
    
    self_check_zone:
      height: "20mm"
      contents: ["checklist", "completion_checkbox"]
      position: "bottom-of-work-zone"
    
    purple_bar:
      height: "12mm"
  
  ascii_layout: |
    ┌─────────────────────────────────────┐
    │ 🦉 OWL REMEMBERY    Task 1    ⭐    │ 35mm - Owl Header
    ├─────────────────────────────────────┤
    │ Instructions: Match the cases...    │
    │ 💡 Hint: Read each case carefully   │ 25mm - Instructions
    ├─────────────────────────────────────┤
    │                                     │
    │   [CASE 1]  ─────────  [TERM A]     │
    │   [CASE 2]  ─────────  [TERM B]     │
    │   [CASE 3]  ─────────  [TERM C]     │ ~165mm - Work Zone
    │   [CASE 4]  ─────────  [TERM D]     │
    │                                     │
    ├─────────────────────────────────────┤
    │ ✅ Self-Check: □ Connected all      │ 20mm
    ├─────────────────────────────────────┤
    │  ████ TISA PURPLE BAR ████████████  │ 12mm
    └─────────────────────────────────────┘
```

### Template 4: Test Page (Royal Checkpoint)

```yaml
test_page:
  layout: "royal-checkpoint"
  
  structure:
    header_zone:
      height: "30mm"
      contents: ["💎 Royal Checkpoint", "Lesson X Test"]
      background: "linear-gradient({level_color}, {level_color_dark})"
      style: "achievement-badge-feel"
    
    question_zone:
      height: "200mm"
      layout: "vertical-stack"
      question_spacing: "12mm"
      
      question_block:
        question_number:
          style: "circled-number"
          color: "{level_color}"
        question_text:
          font: "Open Sans 600"
          size: "12pt"
        answer_options:
          type: "checkbox-list"
          checkbox_size: "5mm"
          option_spacing: "8mm"
    
    footer_zone:
      height: "20mm"
      contents: ["completion_message", "score_area"]
    
    purple_bar:
      height: "12mm"
```

### Template 5: Creative Page (Creatica Canvas)

```yaml
creative_page:
  layout: "creatica-canvas"
  
  structure:
    header_zone:
      height: "30mm"
      background: "rainbow-gradient-subtle"
      contents: ["🎨 Creatica Canvas", "Create Your..."]
    
    instruction_zone:
      height: "20mm"
      style: "playful-prompt"
    
    drawing_zone:
      height: "150mm"
      border: "dashed 2px {level_color}"
      background: "#FFFFFF"
      corner_decorations: "small-creative-icons"
    
    label_zone:
      height: "30mm"
      contents: ["write-about-drawing-lines"]
    
    purple_bar:
      height: "12mm"
  
  # Multiple drawing zones variant
  multi_zone_variant:
    zones: 3
    zone_heights: ["50mm", "50mm", "50mm"]
    labels: ["Part 1", "Part 2", "Part 3"]
```

### Template 6: Homework Page (Moonlight Mission)

```yaml
homework_page:
  layout: "moonlight-mission"
  
  structure:
    header_zone:
      height: "35mm"
      background: "#2D2D44"  # Night sky
      contents: ["📦 Moonlight Mission", "moon_icon", "stars"]
      text_color: "#FFFFFF"
    
    mission_brief_zone:
      height: "25mm"
      style: "scroll-parchment"
      contents: ["mission_description"]
    
    work_zone:
      height: "170mm"
      layout: "mission-steps"
      step_spacing: "15mm"
    
    purple_bar:
      height: "12mm"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 6: QUESTION SPACE ALLOCATION
# ═══════════════════════════════════════════════════════════════════════════════

## ✍️ How Much Space Each Question Type Gets

### Writing Response Spaces

```yaml
writing_spaces:
  
  # Single line answer
  single_line:
    height: "8mm"
    line_style: "solid 1px #D1D5DB"
    label_position: "above"
    use: "Fill in blank, single word, name"
  
  # Short answer (1-2 sentences)
  short_answer:
    height: "20mm"
    lines: 2
    line_spacing: "10mm"
    use: "Brief explanation, definition"
  
  # Medium answer (3-4 sentences)
  medium_answer:
    height: "40mm"
    lines: 4
    line_spacing: "10mm"
    use: "Paragraph response, explanation"
  
  # Long answer (5+ sentences)
  long_answer:
    height: "60mm"
    lines: 6
    line_spacing: "10mm"
    use: "Story writing, detailed explanation"
  
  # Extended response (essay-style)
  extended_response:
    height: "100mm"
    lines: 10
    line_spacing: "10mm"
    use: "Creative writing, full story"
```

### Drawing Zone Sizes

```yaml
drawing_zones:
  
  # Small icon/doodle
  small:
    width: "40mm"
    height: "40mm"
    use: "Quick sketch, icon, emoji-style"
  
  # Medium illustration
  medium:
    width: "80mm"
    height: "60mm"
    use: "Scene sketch, character drawing"
  
  # Large canvas
  large:
    width: "full-content-width"  # 180mm
    height: "100mm"
    use: "Detailed illustration, poster"
  
  # Full page canvas
  full_page:
    width: "full-content-width"
    height: "200mm"
    use: "Major creative project, map, mind map"
```

### Multiple Choice Spacing

```yaml
multiple_choice:
  
  # Standard options (text only)
  standard:
    checkbox_size: "5mm × 5mm"
    option_height: "10mm"
    option_spacing: "4mm"
    options_per_question: "4-6"
    total_question_height: "60-80mm"  # Including question text
  
  # Options with images
  with_images:
    image_size: "25mm × 25mm"
    option_height: "35mm"
    layout: "2-column grid"
    total_question_height: "90-120mm"
```

### Matching Exercise Spacing

```yaml
matching_exercises:
  
  # Standard text matching
  text_matching:
    item_height: "15mm"
    column_width: "70mm"
    center_gap: "40mm"  # Space for drawing lines
    items_per_page: "5-6"
  
  # Matching with images
  image_matching:
    item_height: "35mm"
    image_size: "30mm × 30mm"
    column_width: "75mm"
    center_gap: "30mm"
    items_per_page: "4"
```

### Table/Chart Spaces

```yaml
tables:
  
  # Simple table (3-4 columns)
  simple_table:
    row_height: "12mm"
    header_height: "15mm"
    cell_padding: "3mm"
    max_rows_per_page: 8
  
  # Extended table (5+ columns)
  extended_table:
    row_height: "15mm"
    header_height: "18mm"
    cell_padding: "4mm"
    max_rows_per_page: 6
  
  # Chart with drawing
  chart_with_drawing:
    cell_height: "25mm"
    allows_drawing: true
    max_rows: 4
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 7: COMPONENT LIBRARY
# ═══════════════════════════════════════════════════════════════════════════════

## 🧩 Reusable UI Components

### Tip/Hint Box

```yaml
hint_box:
  width: "full-width or sidebar"
  min_height: "20mm"
  padding: "8mm"
  background: "#FEF3C7"  # Warm yellow
  border_left: "4px solid #F59E0B"
  border_radius: "4px"
  
  icon:
    type: "💡"
    position: "top-left"
    size: "16px"
  
  text:
    font: "Open Sans"
    size: "10pt"
    color: "#92400E"  # Dark amber
```

### Character Speech Bubble

```yaml
speech_bubble:
  style: "rounded-comic"
  background: "#FFFFFF"
  border: "2px solid {character_color}"
  border_radius: "12px"
  tail: "bottom-left pointing to character"
  padding: "10mm"
  max_width: "120mm"
  
  character_portrait:
    size: "30mm"
    position: "outside-bottom-left"
    border: "3px solid {character_color}"
    border_radius: "50%"
```

### Task Number Badge

```yaml
task_badge:
  shape: "circle"
  size: "12mm"
  background: "{level_color}"
  text_color: "#FFFFFF"
  font: "Quicksand Bold"
  font_size: "14pt"
  
  variants:
    question_number: "Q1, Q2..."
    step_number: "1, 2, 3..."
    task_number: "Task 1..."
```

### Checkbox/Radio

```yaml
checkbox:
  size: "6mm × 6mm"
  border: "2px solid #6B7280"
  border_radius: "2px"
  background: "#FFFFFF"
  
  checked_state:
    background: "{level_color}"
    checkmark_color: "#FFFFFF"

radio_button:
  size: "6mm × 6mm"
  border: "2px solid #6B7280"
  border_radius: "50%"
  background: "#FFFFFF"
  
  selected_state:
    inner_dot: "{level_color}"
    dot_size: "3mm"
```

### Progress Indicator

```yaml
progress_bar:
  height: "8mm"
  background: "#E5E7EB"
  border_radius: "4mm"
  
  fill:
    color: "{level_color}"
    border_radius: "4mm"
  
  labels:
    start: "Start"
    end: "Finish"
    current: "Lesson X"
```

### Achievement Badge

```yaml
achievement_badge:
  shape: "shield or star"
  size: "40mm"
  background: "gradient-gold"
  border: "3px solid #D4AF37"
  
  icon_area:
    size: "20mm"
    position: "center"
  
  label:
    position: "below-icon"
    font: "Quicksand Bold"
    size: "8pt"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 8: INTERACTIVE ELEMENTS
# ═══════════════════════════════════════════════════════════════════════════════

## 🖱️ Web Interactive Components

### Sticker Drop Zone

```yaml
sticker_zone:
  # For digital sticker placement
  
  drop_area:
    border: "dashed 2px #9CA3AF"
    border_radius: "8px"
    background: "#F9FAFB"
    min_height: "40mm"
  
  hover_state:
    border_color: "{level_color}"
    background: "{level_color_10%}"
  
  active_state:
    border: "solid 2px {level_color}"
```

### Drawing Canvas

```yaml
drawing_canvas:
  # For digital drawing
  
  canvas:
    background: "#FFFFFF"
    border: "2px solid #E5E7EB"
    border_radius: "8px"
  
  toolbar:
    position: "top"
    tools: ["pencil", "eraser", "colors", "undo", "clear"]
    tool_size: "32px"
  
  color_palette:
    colors: ["#000000", "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"]
```

### Line Drawing (for Matching)

```yaml
line_connector:
  # For matching exercises
  
  connection_line:
    color: "{level_color}"
    width: "3px"
    style: "curved"
  
  endpoints:
    size: "8px"
    color: "{level_color}"
    shape: "circle"
  
  hover_feedback:
    glow: "0 0 8px {level_color}"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 9: PRINT SPECIFICATIONS
# ═══════════════════════════════════════════════════════════════════════════════

## 🖨️ Print-Ready Requirements

### Color Mode

```yaml
print_colors:
  mode: "CMYK"
  
  # Convert key colors to CMYK
  tisa_purple:
    hex: "#6B3FA0"
    cmyk: [58, 83, 0, 15]
  
  level_colors_cmyk:
    dark_blue: [95, 70, 30, 15]
    dark_green: [70, 20, 90, 30]
    light_green: [60, 15, 65, 10]
    burgundy: [25, 85, 65, 25]
    rose: [10, 75, 35, 0]
    orange: [0, 55, 85, 0]
```

### Bleed & Safe Zones

```yaml
print_zones:
  bleed: "3mm"  # Extends beyond page edge
  safe_zone: "5mm"  # Keep important content inside
  
  # Total document size with bleed
  with_bleed:
    width: "216mm"   # 210 + 3 + 3
    height: "303mm"  # 297 + 3 + 3
```

### Resolution

```yaml
resolution:
  images: "300dpi minimum"
  line_art: "600dpi recommended"
  export_format: "PDF/X-4"
```

### Binding Considerations

```yaml
binding:
  type: "saddle-stitch or perfect-bind"
  
  # Gutter adjustment for thick workbooks
  gutter_margin:
    under_50_pages: "0mm"
    50_to_100_pages: "5mm extra"
    over_100_pages: "8mm extra"
  
  # Page order
  page_arrangement: "reader-spreads"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 10: CHILD EDUCATION DESIGN PRINCIPLES
# ═══════════════════════════════════════════════════════════════════════════════

## 🧒 Design for Young Learners

### Cognitive Load Management

```yaml
cognitive_principles:
  
  # Chunking
  max_items_per_group: 4-5
  max_steps_per_instruction: 5
  max_options_per_question: 6
  
  # Visual hierarchy
  one_primary_action_per_page: true
  clear_starting_point: true
  left_to_right_flow: true
  
  # Attention span (by age)
  page_complexity:
    age_5_6: "simple, 1-2 activities per page"
    age_7_8: "moderate, 2-3 activities per page"
    age_9_11: "higher, 3-4 activities per page"
```

### Engagement Patterns

```yaml
engagement_principles:
  
  # Reward systems
  progress_visibility: "always visible"
  micro_achievements: "per task completion"
  major_achievements: "per lesson completion"
  
  # Motivation design
  character_encouragement: "positive language"
  failure_messaging: "growth mindset framing"
  
  # Variety
  activity_type_rotation: "never 2 same types in a row"
  visual_variety: "different layouts per page"
```

### Accessibility

```yaml
accessibility:
  
  # Color independence
  never_rely_on_color_alone: true
  use_patterns_with_colors: true
  
  # Touch targets (digital)
  minimum_touch_target: "10mm × 10mm"
  spacing_between_targets: "4mm"
  
  # Reading support
  line_numbers_available: true
  audio_option_planned: true
```

### Physical Ergonomics

```yaml
physical_design:
  
  # Writing spaces
  line_height_for_handwriting: "10mm minimum"
  checkbox_size_for_pencil: "6mm minimum"
  
  # Hand placement
  left_handed_consideration: "no spiral on left edge"
  right_margin_for_grip: "15mm minimum"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 11: RESPONSIVE BEHAVIOR (WEB)
# ═══════════════════════════════════════════════════════════════════════════════

## 📱 Multi-Device Adaptation

### Breakpoints

```yaml
breakpoints:
  desktop: "1200px+"    # Full A4 simulation
  tablet: "768-1199px"  # Adjusted A4
  mobile: "< 768px"     # Scrollable single-column
  
  # A4 container behavior
  a4_container:
    desktop:
      width: "794px"
      height: "1123px"
      scale: "fit-to-viewport"
    
    tablet:
      width: "100%"
      max_width: "794px"
      height: "auto"
      aspect_ratio: "preserve"
    
    mobile:
      width: "100%"
      height: "auto"
      layout: "single-column-flow"
```

### Print Preview Mode

```yaml
print_preview:
  trigger: "toggle or keyboard shortcut"
  display:
    background: "#666666"  # Gray surround
    page_shadow: "0 4px 20px rgba(0,0,0,0.3)"
    page_gap: "20px"
  
  controls:
    zoom: ["50%", "75%", "100%", "fit-width"]
    navigation: "page-by-page or scroll"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 12: QUICK REFERENCE CARDS
# ═══════════════════════════════════════════════════════════════════════════════

## 📋 Designer Quick Reference

### Spacing Cheat Sheet

| Use Case | Size | Pixels |
|----------|------|--------|
| Inline elements | 4mm | 15px |
| Related elements | 8mm | 30px |
| Section gap | 12mm | 45px |
| Major break | 16mm | 60px |
| Page section | 24mm | 90px |

### Font Size Cheat Sheet

| Element | Size | Line Height |
|---------|------|-------------|
| Display title | 36pt | 1.1 |
| Page title | 22pt | 1.25 |
| Section header | 18pt | 1.3 |
| Body text | 11pt | 1.6 |
| Caption/hint | 9pt | 1.4 |

### Zone Height Cheat Sheet

| Zone | Height |
|------|--------|
| Page header | 30-40mm |
| Purple bar | 12mm |
| Instruction zone | 20-25mm |
| Small drawing | 40mm |
| Medium drawing | 60mm |
| Large drawing | 100mm |
| Writing lines (per line) | 10mm |

---

*This Design System is the visual foundation for all TISAverse materials.*
*All workbooks, pages, and components should reference this specification.*
