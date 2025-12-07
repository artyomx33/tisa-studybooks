---
# ═══════════════════════════════════════════════════════════════════════════════
# TISAVERSE PAGE TYPE LIBRARY
# ═══════════════════════════════════════════════════════════════════════════════
# Detailed specifications for every page type in TISA MBA workbooks
# Version: 1.0
# References: _curriculum_master.md, _design_system.md
# Target: Gemini Visual Composer, Lovable, Print PDF Generator
# ═══════════════════════════════════════════════════════════════════════════════

library_name: "TISAverse Page Type Library"
version: "1.0"
total_page_types: 15
css_ready: true
print_ready: true
---

# 📚 TISAVERSE PAGE TYPE LIBRARY

## Complete Specifications for Every Page Type

---

# ═══════════════════════════════════════════════════════════════════════════════
# MASTER PAGE TEMPLATE
# ═══════════════════════════════════════════════════════════════════════════════

## 🎯 Base Template (All Pages Inherit This)

Every single page in TISAverse starts with this foundation:

```yaml
base_template:
  # Dimensions
  width: "210mm"       # 794px
  height: "297mm"      # 1123px
  
  # Margins (content safe area)
  margin_top: "15mm"     # 57px
  margin_bottom: "20mm"  # 76px (extra for purple bar)
  margin_left: "15mm"    # 57px
  margin_right: "15mm"   # 57px
  
  # Content area
  content_width: "180mm"   # 680px
  content_height: "262mm"  # 990px
  
  # Purple bar (ALWAYS PRESENT)
  purple_bar:
    height: "12mm"       # 45px
    position: "fixed-bottom"
    background: "#6B3FA0"
    z_index: 1000
```

### CSS Base Template

```css
/* BASE PAGE TEMPLATE */
.tisa-page {
  width: 210mm;
  height: 297mm;
  position: relative;
  background: #FFFFFF;
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
  color: #36454F;
}

.tisa-page-content {
  position: absolute;
  top: 15mm;
  left: 15mm;
  right: 15mm;
  bottom: 20mm;
  overflow: hidden;
}

/* PURPLE BAR - ALWAYS PRESENT */
.tisa-purple-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12mm;
  background: #6B3FA0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8mm;
  z-index: 1000;
}

.tisa-purple-bar__logo {
  height: 8mm;
  width: auto;
}

.tisa-purple-bar__title {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 10pt;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tisa-purple-bar__page-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tisa-purple-bar__page-number {
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  font-size: 9pt;
  color: #FFFFFF;
}

.tisa-purple-bar__level-dot {
  width: 6mm;
  height: 6mm;
  border-radius: 50%;
  /* background: var(--level-color) - set dynamically */
}
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE TYPE 1: STORY PAGE (🏰 Kingdom Chronicle)
# ═══════════════════════════════════════════════════════════════════════════════

## 📖 Story Page — Full Specification

```yaml
page_type: "story"
block_name: "🏰 Kingdom Chronicle"
purpose: "Narrative introduction with characters and plot"
typical_pages_per_lesson: 2
```

### Layout Zones

```yaml
story_layout:
  
  # ZONE 1: Header Banner
  header_zone:
    position: 
      top: "0mm"
      left: "0mm"
    dimensions:
      width: "180mm"    # Full content width
      height: "35mm"    # 132px
    
    contents:
      block_icon:
        position: { left: "0mm", top: "8mm" }
        size: "20mm"
        content: "🏰"
      
      block_title:
        position: { left: "25mm", top: "5mm" }
        font: "Quicksand Bold"
        size: "22pt"
        color: "#FFFFFF"
        content: "Kingdom Chronicle"
      
      lesson_badge:
        position: { right: "0mm", top: "5mm" }
        size: "25mm × 25mm"
        style: "shield-badge"
        content: "Lesson {X}"
    
    styling:
      background: "var(--level-color)"
      border_radius: "0 0 12px 12px"
      box_shadow: "0 4px 12px rgba(0,0,0,0.15)"

  # ZONE 2: Illustration Area
  illustration_zone:
    position:
      top: "40mm"
      left: "0mm"
    dimensions:
      width: "180mm"
      height: "75mm"    # 283px
    
    variants:
      full_width:
        layout: "single-image"
        image_fit: "cover"
        border_radius: "8px"
      
      split_scene:
        layout: "two-images"
        gap: "8mm"
        image_1_width: "85mm"
        image_2_width: "85mm"
      
      with_character:
        layout: "image-with-overlay"
        character_position: "bottom-right"
        character_size: "40mm"

  # ZONE 3: Story Text Area
  story_text_zone:
    position:
      top: "120mm"
      left: "0mm"
    dimensions:
      width: "180mm"
      height: "130mm"   # 491px
    
    styling:
      background: "#FDF8F3"   # Warm cream
      border: "2px solid var(--level-color-light)"
      border_radius: "8px"
      padding: "12mm"
    
    typography:
      font: "Crimson Text"
      size: "12pt"
      line_height: "1.7"
      color: "#36454F"
      first_letter:
        size: "36pt"
        color: "var(--level-color)"
        float: "left"
        margin_right: "3mm"
    
    # Special elements within story
    special_elements:
      character_dialogue:
        font: "Caveat"
        size: "14pt"
        color: "var(--level-color)"
        border_left: "3px solid var(--level-color)"
        padding_left: "8mm"
        margin: "8mm 0"
      
      letter_scroll:
        background: "#FEF3C7"
        border: "1px solid #D4AF37"
        padding: "10mm"
        margin: "8mm 0"
        font: "Caveat"
        size: "13pt"

  # ZONE 4: Purple Bar
  purple_bar:
    # Inherits from base template
    content:
      title: "Kingdom Chronicle"
      page_number: "{X}"
```

### ASCII Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 15mm margin                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  🏰 KINGDOM CHRONICLE                              [Lesson 1]          │  │ 35mm
│  │  ████████████ LEVEL COLOR HEADER ██████████████████████████████████████│  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │                     [ ILLUSTRATION ZONE ]                              │  │ 75mm
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                                                                        │  │
│  │  O nce upon a time, in a beautiful land full of green hills            │  │
│  │    and sparkling rivers, there was a kingdom called the                │  │
│  │    Kingdom of Finance...                                               │  │
│  │                                                                        │  │ 130mm
│  │  ┌─────────────────────────────────────────────────────────────────┐   │  │
│  │  │  "Dear friends, something terrible has happened!"               │   │  │
│  │  │   — King Luminar                                                │   │  │
│  │  └─────────────────────────────────────────────────────────────────┘   │  │
│  │                                                                        │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│ 20mm margin                                                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│  ████████████████████████ TISA PURPLE BAR ██████████████████████████████████ │ 12mm
│  [Logo]              Kingdom Chronicle                    [12] [●]           │
└──────────────────────────────────────────────────────────────────────────────┘
```

### CSS Implementation

```css
/* STORY PAGE */
.page-story {
  --story-bg: #FDF8F3;
}

.story-header {
  height: 35mm;
  background: var(--level-color);
  border-radius: 0 0 12px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  color: #FFFFFF;
}

.story-header__icon {
  font-size: 32px;
}

.story-header__title {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 22pt;
}

.story-illustration {
  height: 75mm;
  margin-top: 5mm;
  border-radius: 8px;
  overflow: hidden;
}

.story-illustration img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-text {
  margin-top: 5mm;
  height: 130mm;
  background: var(--story-bg);
  border: 2px solid var(--level-color-light);
  border-radius: 8px;
  padding: 12mm;
  overflow: hidden;
}

.story-text p {
  font-family: 'Crimson Text', serif;
  font-size: 12pt;
  line-height: 1.7;
  margin-bottom: 8mm;
}

.story-text p:first-of-type::first-letter {
  font-size: 36pt;
  color: var(--level-color);
  float: left;
  margin-right: 3mm;
  line-height: 1;
}

.story-dialogue {
  font-family: 'Caveat', cursive;
  font-size: 14pt;
  color: var(--level-color);
  border-left: 3px solid var(--level-color);
  padding-left: 8mm;
  margin: 8mm 0;
}

.story-letter {
  background: #FEF3C7;
  border: 1px solid #D4AF37;
  padding: 10mm;
  margin: 8mm 0;
  font-family: 'Caveat', cursive;
  font-size: 13pt;
  border-radius: 4px;
}
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE TYPE 2: GLOSSARY PAGE (📚 Wisdom Path)
# ═══════════════════════════════════════════════════════════════════════════════

## 📚 Glossary Page — Full Specification

```yaml
page_type: "glossary"
block_name: "📚 Wisdom Path"
purpose: "Key vocabulary with visual learning path"
typical_pages_per_lesson: 1
terms_per_page: "4-6"
```

### Layout Zones

```yaml
glossary_layout:

  # ZONE 1: Compact Header
  header_zone:
    position: { top: "0mm", left: "0mm" }
    dimensions: { width: "180mm", height: "25mm" }
    
    contents:
      icon: "📚"
      title: "Wisdom Path"
      subtitle: "Lesson {X} Glossary"
    
    styling:
      background: "linear-gradient(135deg, var(--level-color), var(--level-color-dark))"
      border_radius: "0 0 8px 8px"

  # ZONE 2: Path Container
  path_zone:
    position: { top: "30mm", left: "0mm" }
    dimensions: { width: "180mm", height: "220mm" }
    
    # The winding path SVG background
    path_background:
      type: "svg-path"
      stroke: "var(--level-color-light)"
      stroke_width: "8px"
      stroke_dasharray: "none"
      fill: "none"
    
    # Term card positions along path
    term_positions:
      term_1: { x: "10mm", y: "0mm" }
      term_2: { x: "100mm", y: "35mm" }
      term_3: { x: "10mm", y: "70mm" }
      term_4: { x: "100mm", y: "105mm" }
      term_5: { x: "10mm", y: "140mm" }
      term_6: { x: "100mm", y: "175mm" }
    
    # Character decorations
    characters:
      owl:
        position: { x: "155mm", y: "20mm" }
        size: "25mm"
      squirrel:
        position: { x: "5mm", y: "100mm" }
        size: "20mm"
      rabbit:
        position: { x: "150mm", y: "160mm" }
        size: "20mm"

  # Term Card Template
  term_card:
    dimensions: { width: "70mm", height: "30mm" }
    
    layout:
      term_number:
        position: { left: "-5mm", top: "-5mm" }
        size: "10mm"
        shape: "circle"
        background: "var(--level-color)"
        color: "#FFFFFF"
      
      term_name:
        position: { left: "5mm", top: "5mm" }
        font: "Quicksand Bold"
        size: "11pt"
        color: "var(--level-color)"
      
      definition:
        position: { left: "5mm", top: "15mm" }
        font: "Open Sans"
        size: "9pt"
        color: "#36454F"
        max_lines: 2
      
      icon:
        position: { right: "5mm", top: "5mm" }
        size: "15mm"
    
    styling:
      background: "#FFFFFF"
      border: "2px solid var(--level-color)"
      border_radius: "8px"
      box_shadow: "0 2px 8px rgba(0,0,0,0.1)"
```

### Term Card Sizes (Responsive to Content)

```yaml
term_card_sizing:
  
  # Short term (1-3 word definition)
  short:
    height: "25mm"
    definition_lines: 1
  
  # Medium term (4-10 word definition)
  medium:
    height: "32mm"
    definition_lines: 2
  
  # Long term (11+ word definition)
  long:
    height: "40mm"
    definition_lines: 3
    
  # With example
  with_example:
    height: "45mm"
    includes: ["definition", "example_text"]
    example_styling:
      font: "Open Sans Italic"
      size: "8pt"
      color: "#6B7280"
      prefix: "💡 Example: "
```

### ASCII Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  📚 WISDOM PATH — Lesson 1 Glossary                                    │  │ 25mm
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌──────────────┐                                                 🦉         │
│  │ ① SOCIETY    │                                                            │
│  │ People who   │═══════════════════════════╗                                │
│  │ live together│                           ║                                │
│  └──────────────┘                    ┌──────╨───────┐                        │
│                                      │ ② ROLES      │                        │
│                    ╔═════════════════│ Duties and   │                        │
│                    ║                 │ tasks...     │                        │
│  ┌─────────────────╨┐                └──────────────┘                        │
│  │ ③ CO-OPERATION   │                                                        │
│  │ Working together │══════════════════════════╗                             │
│  │ to achieve...    │                          ║             🐿️              │
│  └──────────────────┘                   ┌──────╨───────┐                     │
│                                         │ ④ DIVISION   │                     │
│                    ╔════════════════════│ OF LABOUR    │                     │
│                    ║                    │ Sharing work │                     │
│  ┌─────────────────╨┐                   └──────────────┘                     │
│  │ ⑤ ETIQUETTE      │                                                        │
│  │ Rules of polite  │═══════════════════════════╗                            │
│  │ behaviour...     │                           ║                            │
│  └──────────────────┘                    ┌──────╨───────┐           🐰       │
│                                          │ ⑥ LEADERSHIP │                    │
│                                          │ Guiding a    │                    │
│                    🏁 FINISH             │ group...     │                    │
│                                          └──────────────┘                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  ████████████████████████ TISA PURPLE BAR ██████████████████████████████████ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### CSS Implementation

```css
/* GLOSSARY PAGE */
.page-glossary {
  position: relative;
}

.glossary-header {
  height: 25mm;
  background: linear-gradient(135deg, var(--level-color), var(--level-color-dark));
  border-radius: 0 0 8px 8px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  color: #FFFFFF;
}

.glossary-path-container {
  position: relative;
  height: 220mm;
  margin-top: 5mm;
}

/* SVG Path Background */
.glossary-path-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.glossary-path-svg path {
  stroke: var(--level-color-light);
  stroke-width: 8px;
  fill: none;
  stroke-linecap: round;
}

/* Term Cards */
.term-card {
  position: absolute;
  width: 70mm;
  min-height: 30mm;
  background: #FFFFFF;
  border: 2px solid var(--level-color);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 5mm;
  z-index: 10;
}

.term-card__number {
  position: absolute;
  top: -5mm;
  left: -5mm;
  width: 10mm;
  height: 10mm;
  background: var(--level-color);
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 12pt;
}

.term-card__name {
  font-family: 'Quicksand', sans-serif;
  font-weight: 700;
  font-size: 11pt;
  color: var(--level-color);
  margin-bottom: 3mm;
}

.term-card__definition {
  font-family: 'Open Sans', sans-serif;
  font-size: 9pt;
  color: #36454F;
  line-height: 1.4;
}

.term-card__example {
  font-family: 'Open Sans', sans-serif;
  font-style: italic;
  font-size: 8pt;
  color: #6B7280;
  margin-top: 2mm;
}

/* Character Decorations */
.glossary-character {
  position: absolute;
  z-index: 5;
}

.glossary-character--owl { top: 20mm; right: 5mm; width: 25mm; }
.glossary-character--squirrel { top: 100mm; left: 5mm; width: 20mm; }
.glossary-character--rabbit { bottom: 30mm; right: 10mm; width: 20mm; }
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE TYPE 3: OWL CHALLENGE PAGES (🧠 Owl Challenge)
# ═══════════════════════════════════════════════════════════════════════════════

## 🦉 Owl Challenge — 6 Variants

Each owl type has specific task layouts optimized for their learning focus.

---

### 3A: OWL REMEMBERY — Memory Tasks

```yaml
owl_type: "remembery"
owl_color: "#7EB8DA"
owl_accent_bg: "#EBF5FB"
focus: "Memory, recall, matching, definitions"

task_types:
  - matching_lines
  - fill_in_blank
  - term_definition_match
  - word_bank_completion
```

#### Matching Lines Layout

```yaml
matching_task:
  name: "Draw Lines to Match"
  
  layout:
    header_zone:
      height: "30mm"
      owl_icon: "owl-remembery.svg"
      owl_color: "#7EB8DA"
      title: "Owl Challenge — Remembery"
      task_title: "Match the Case to the Term"
    
    instruction_zone:
      height: "18mm"
      content: "Look at the cases on the left. Match them with the correct term on the right."
      hint_box:
        enabled: true
        text: "Try to read each case and think: What is happening here?"
    
    matching_zone:
      height: "160mm"
      
      left_column:
        width: "65mm"
        position: "left: 0mm"
        items: 6
        item_height: "22mm"
        item_spacing: "5mm"
        
        item_styling:
          background: "#EBF5FB"
          border: "2px solid #7EB8DA"
          border_radius: "6px"
          padding: "4mm"
          font_size: "10pt"
          
          number_badge:
            position: "left: -4mm, top: 50%"
            size: "8mm"
            background: "#7EB8DA"
            color: "#FFFFFF"
      
      center_gap:
        width: "50mm"
        usage: "drawing lines"
        guide_dots: true  # Light dots to help straight lines
      
      right_column:
        width: "65mm"
        position: "right: 0mm"
        items: 6
        item_height: "18mm"
        
        item_styling:
          background: "#FFFFFF"
          border: "2px solid #7EB8DA"
          border_radius: "6px"
          padding: "4mm"
          font_size: "10pt"
          font_weight: "600"
    
    self_check_zone:
      height: "20mm"
      position: "bottom"
      content: ["checkbox: Connected all cases", "checkbox: Read each carefully"]
```

#### Fill-in-Blank Layout

```yaml
fill_in_blank_task:
  name: "Complete the Story"
  
  layout:
    header_zone:
      height: "30mm"
    
    instruction_zone:
      height: "15mm"
    
    illustration_zone:
      height: "45mm"
      style: "light-watercolor"
      purpose: "scene-setting"
    
    story_zone:
      height: "80mm"
      
      text_container:
        background: "#F9FAFB"
        border: "1px solid #E5E7EB"
        border_radius: "8px"
        padding: "10mm"
        
        blank_styling:
          display: "inline-block"
          min_width: "30mm"
          border_bottom: "2px solid #7EB8DA"
          margin: "0 2mm"
    
    word_bank:
      height: "18mm"
      position: "below-story"
      
      styling:
        background: "#EBF5FB"
        border_radius: "6px"
        padding: "5mm"
        
      words:
        display: "inline-flex"
        gap: "10mm"
        font_weight: "600"
        color: "#7EB8DA"
    
    drawing_zone:
      height: "55mm"
      border: "dashed 2px #7EB8DA"
      label: "Draw your favourite part!"
```

### ASCII Layout — Matching Task

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  🦉 OWL CHALLENGE — Remembery           Task 1               ⭐ Easy   │  │ 30mm
│  │  ████████████ SOFT BLUE HEADER ████████████████████████████████████████│  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  Draw lines to match each case with the correct term.                  │  │ 18mm
│  │  💡 Hint: Read each case and think — what is happening here?           │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   ┌─────────────────────┐                        ┌────────────────────┐      │
│  ①│ Children help each  │                        │    Co-operation    │      │
│   │ other clean up toys │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │                    │      │
│   └─────────────────────┘                        └────────────────────┘      │
│   ┌─────────────────────┐                        ┌────────────────────┐      │
│  ②│ A doctor helps      │                        │      Society       │      │
│   │ people get better   │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │                    │      │ 160mm
│   └─────────────────────┘                        └────────────────────┘      │
│   ┌─────────────────────┐                        ┌────────────────────┐      │
│  ③│ We say please and   │                        │ Roles in society   │      │
│   │ thank you           │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │                    │      │
│   └─────────────────────┘                        └────────────────────┘      │
│   ┌─────────────────────┐                        ┌────────────────────┐      │
│  ④│ A class chooses a   │                        │ Rules of behaviour │      │
│   │ line leader         │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │                    │      │
│   └─────────────────────┘                        └────────────────────┘      │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  ✅ Self-Check:  □ Connected all cases   □ Read each carefully         │  │ 20mm
│  └────────────────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────────┤
│  ████████████████████████ TISA PURPLE BAR ██████████████████████████████████ │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

### 3B: OWL INTELLECTA — Analysis Tasks

```yaml
owl_type: "intellecta"
owl_color: "#8B5CF6"
owl_accent_bg: "#F3E8FF"
focus: "Understanding, analysis, connections, categorization"

task_types:
  - categorization_table
  - comparison_chart
  - explanation_writing
  - connection_mapping
```

#### Categorization Table Layout

```yaml
categorization_task:
  name: "Sort Into Categories"
  
  layout:
    header_zone:
      height: "30mm"
      owl_color: "#8B5CF6"
    
    instruction_zone:
      height: "15mm"
    
    items_to_sort:
      height: "25mm"
      layout: "inline-badges"
      
      badge_styling:
        background: "#F3E8FF"
        border: "1px solid #8B5CF6"
        border_radius: "15px"
        padding: "3mm 6mm"
        font_size: "10pt"
        display: "inline-block"
        margin: "2mm"
    
    category_table:
      height: "140mm"
      columns: 2  # or 3
      
      column_header:
        height: "15mm"
        background: "#8B5CF6"
        color: "#FFFFFF"
        font: "Quicksand Bold"
        font_size: "12pt"
      
      column_body:
        background: "#FFFFFF"
        border: "1px solid #8B5CF6"
        
        drop_zones:
          min_height: "20mm"
          border: "dashed 1px #C4B5FD"
          margin: "3mm"
    
    writing_zone:
      height: "35mm"
      prompt: "Explain why you sorted them this way:"
      lines: 3
```

---

### 3C: OWL PRACTICA — Real-World Tasks

```yaml
owl_type: "practica"
owl_color: "#4A7C59"
owl_accent_bg: "#E8F5E9"
focus: "Practical application, real-world examples"

task_types:
  - chart_creation
  - survey_design
  - interview_template
  - real_life_application
```

#### Chart Creation Layout

```yaml
chart_task:
  name: "Create a Chart"
  
  layout:
    header_zone:
      height: "30mm"
      owl_color: "#4A7C59"
    
    instruction_zone:
      height: "20mm"
      content: "Create a chart to show [topic]. Fill in each row."
    
    example_row:
      height: "20mm"
      background: "#E8F5E9"
      content: "[Pre-filled example row]"
      label: "Example"
    
    chart_zone:
      height: "120mm"
      
      table:
        columns: 3
        rows: 5  # Including header
        
        header_row:
          height: "12mm"
          background: "#4A7C59"
          color: "#FFFFFF"
          font: "Quicksand Bold"
          font_size: "11pt"
        
        data_row:
          height: "22mm"
          background: "#FFFFFF"
          border: "1px solid #4A7C59"
          
          # First cell often has label
          first_cell:
            background: "#E8F5E9"
            font_weight: "600"
    
    reflection_zone:
      height: "40mm"
      prompt: "Write why sharing tasks is important:"
      lines: 4
```

---

### 3D: OWL DEDUCTA — Logic Tasks

```yaml
owl_type: "deducta"
owl_color: "#6B7280"
owl_accent_bg: "#F3F4F6"
focus: "Logic, deduction, problem-solving, sequences"

task_types:
  - problem_solution
  - sequence_ordering
  - cause_effect
  - puzzle_solving
```

#### Problem-Solution Layout

```yaml
problem_solution_task:
  name: "Fix the Problem"
  
  layout:
    header_zone:
      height: "30mm"
      owl_color: "#6B7280"
      owl_accessory: "detective-hat"
    
    case_file_zone:
      height: "60mm"
      
      styling:
        background: "#F3F4F6"
        border: "2px solid #6B7280"
        border_radius: "8px"
        
        # "Case File" folder tab
        tab:
          position: "top-left"
          background: "#6B7280"
          color: "#FFFFFF"
          text: "🔍 CASE FILE"
          padding: "3mm 8mm"
      
      illustration:
        position: "left"
        width: "50mm"
        style: "comedic-chaos-scene"
      
      problem_text:
        position: "right"
        width: "120mm"
        font_size: "11pt"
    
    identify_problem_zone:
      height: "35mm"
      prompt: "1. What went wrong?"
      lines: 2
    
    solutions_zone:
      height: "90mm"
      prompt: "2. Write or draw 3 solutions:"
      
      solution_boxes:
        count: 3
        layout: "vertical"
        
        box:
          height: "25mm"
          border: "2px solid #6B7280"
          border_radius: "6px"
          
          number_badge:
            size: "8mm"
            background: "#6B7280"
            color: "#FFFFFF"
    
    explain_zone:
      height: "30mm"
      prompt: "3. Explain why roles are important:"
      lines: 3
```

---

### 3E: OWL CRITICA — Evaluation Tasks

```yaml
owl_type: "critica"
owl_color: "#F59E0B"
owl_accent_bg: "#FEF3C7"
focus: "Critical thinking, pros/cons, evaluation"

task_types:
  - pros_cons_table
  - evaluation_rubric
  - opinion_forming
  - debate_prep
```

#### Pros-Cons Layout

```yaml
pros_cons_task:
  name: "Weigh the Positives and Negatives"
  
  layout:
    header_zone:
      height: "30mm"
      owl_color: "#F59E0B"
      owl_accessory: "balance-scale"
    
    context_zone:
      height: "20mm"
      content: "Think about [topic]. What are the good and bad impacts?"
    
    split_illustration:
      height: "45mm"
      
      left_image:
        width: "85mm"
        content: "positive-scene"
        border: "3px solid #10B981"
        label: "🌱 Positive"
      
      right_image:
        width: "85mm"
        content: "negative-scene"
        border: "3px solid #EF4444"
        label: "🏭 Negative"
    
    pros_zone:
      height: "50mm"
      header: "🌱 Positive Impacts"
      header_color: "#10B981"
      
      entry_boxes:
        count: 2
        height: "20mm"
        border: "1px solid #10B981"
        background: "#ECFDF5"
    
    cons_zone:
      height: "50mm"
      header: "🏭 Negative Impacts"
      header_color: "#EF4444"
      
      entry_boxes:
        count: 2
        height: "20mm"
        border: "1px solid #EF4444"
        background: "#FEF2F2"
    
    opinion_zone:
      height: "35mm"
      prompt: "What should people do to help? Why?"
      lines: 3
```

---

### 3F: OWL CREATICA — Creative Tasks

```yaml
owl_type: "creatica"
owl_color: "rainbow-gradient"
owl_accent_bg: "#FDF2F8"
focus: "Creativity, imagination, design, invention"

task_types:
  - free_drawing
  - design_project
  - invention_prompt
  - story_creation
```

#### Multi-Part Creative Layout

```yaml
creative_project_task:
  name: "Design Your Own [X]"
  
  layout:
    header_zone:
      height: "28mm"
      background: "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)"
      title_color: "#FFFFFF"
    
    intro_zone:
      height: "15mm"
      content: "Imagine you are creating [X]. Design it below!"
    
    part_1:
      height: "65mm"
      title: "Part 1: [Drawing Prompt]"
      
      drawing_zone:
        height: "55mm"
        border: "dashed 2px #EC4899"
        border_radius: "8px"
        corner_icons: ["🎨", "✨", "🌟", "💫"]
    
    part_2:
      height: "50mm"
      title: "Part 2: [Writing/Rules Prompt]"
      
      input_type: "table_or_list"
      rows: 5
      row_height: "8mm"
    
    part_3:
      height: "55mm"
      title: "Part 3: [Another Drawing]"
      
      drawing_zone:
        height: "45mm"
        border: "dashed 2px #8B5CF6"
    
    reflection_zone:
      height: "20mm"
      content: "What do [elements] mean?"
      lines: 2
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE TYPE 4: TEST PAGE (💎 Royal Checkpoint)
# ═══════════════════════════════════════════════════════════════════════════════

## 💎 Test Page — Full Specification

```yaml
page_type: "test"
block_name: "💎 Royal Checkpoint"
purpose: "Knowledge assessment with multiple choice"
typical_questions: "5-7 per page"
```

### Layout Zones

```yaml
test_layout:
  
  header_zone:
    height: "28mm"
    background: "linear-gradient(135deg, var(--level-color), var(--level-color-dark))"
    
    contents:
      icon: "💎"
      title: "Royal Checkpoint"
      subtitle: "Lesson {X} Test"
    
    decoration:
      style: "achievement-badge"
      sparkles: true

  instruction_zone:
    height: "12mm"
    content: "Choose the correct answers. There may be more than one correct answer."
    font: "Open Sans Italic"
    font_size: "10pt"
    color: "#6B7280"

  questions_zone:
    height: "195mm"
    
    question_block:
      margin_bottom: "10mm"
      
      question_number:
        display: "inline-block"
        width: "8mm"
        height: "8mm"
        background: "var(--level-color)"
        color: "#FFFFFF"
        border_radius: "50%"
        font: "Quicksand Bold"
        font_size: "10pt"
        text_align: "center"
        margin_right: "3mm"
      
      question_text:
        font: "Open Sans 600"
        font_size: "11pt"
        color: "#36454F"
        margin_bottom: "5mm"
      
      options_container:
        margin_left: "11mm"
        
        option:
          display: "flex"
          align_items: "flex-start"
          margin_bottom: "4mm"
          
          checkbox:
            width: "5mm"
            height: "5mm"
            border: "2px solid #6B7280"
            border_radius: "2px"
            margin_right: "4mm"
            margin_top: "1mm"
          
          option_letter:
            font: "Open Sans 600"
            margin_right: "2mm"
            color: "#6B7280"
          
          option_text:
            font: "Open Sans"
            font_size: "10pt"

  open_question_zone:
    height: "optional"  # Only if test has open question
    
    prompt:
      font: "Open Sans 600"
      font_size: "11pt"
    
    lines:
      count: 3
      height: "10mm each"

  completion_zone:
    height: "18mm"
    
    message:
      text: "🏆 Checkpoint Complete!"
      font: "Quicksand Bold"
      font_size: "12pt"
      color: "var(--level-color)"
    
    instruction:
      text: "Review your answers with your teacher!"
      font: "Open Sans"
      font_size: "9pt"
      color: "#6B7280"
```

### Question Spacing Calculator

```yaml
question_spacing:
  
  # Short question (2-3 options, short text)
  short_question:
    total_height: "28mm"
    breakdown:
      question_text: "8mm"
      options: "16mm"  # 4 options × 4mm
      spacing: "4mm"
  
  # Medium question (4-5 options)
  medium_question:
    total_height: "35mm"
    breakdown:
      question_text: "8mm"
      options: "20mm"  # 5 options × 4mm
      spacing: "7mm"
  
  # Long question (6+ options or with notes)
  long_question:
    total_height: "45mm"
    breakdown:
      question_text: "10mm"
      options: "28mm"  # 7 options × 4mm
      spacing: "7mm"
  
  # Questions per page calculation
  max_questions:
    all_short: 7
    all_medium: 5
    all_long: 4
    mixed_typical: 5-6
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE TYPE 5: MIND MAP PAGE (🧠 Mind Map)
# ═══════════════════════════════════════════════════════════════════════════════

## 🧠 Mind Map — Full Specification

```yaml
page_type: "mindmap"
block_name: "🧠 Mind Map"
purpose: "Visual concept organization and synthesis"
layout_type: "template-with-guide"
```

### Layout Zones

```yaml
mindmap_layout:
  
  header_zone:
    height: "22mm"
    content: "🧠 Mind Map — Lesson {X}"
  
  instruction_zone:
    height: "18mm"
    content: |
      Create a mind map for this lesson.
      Put the main idea in the center and connect related ideas around it!
  
  mindmap_template_zone:
    height: "165mm"
    
    # Pre-drawn template structure
    central_node:
      position: "center"
      size: "35mm × 20mm"
      background: "var(--level-color)"
      color: "#FFFFFF"
      border_radius: "10px"
      content: "{Lesson Topic}"
      font: "Quicksand Bold"
      font_size: "14pt"
    
    branch_lines:
      count: 6
      style: "curved"
      stroke_width: "3px"
      stroke_color: "var(--level-color-light)"
    
    branch_nodes:
      count: 6
      size: "30mm × 15mm"
      background: "#FFFFFF"
      border: "2px solid var(--level-color)"
      border_radius: "8px"
      
      positions:
        node_1: { angle: "0°", distance: "55mm" }
        node_2: { angle: "60°", distance: "55mm" }
        node_3: { angle: "120°", distance: "55mm" }
        node_4: { angle: "180°", distance: "55mm" }
        node_5: { angle: "240°", distance: "55mm" }
        node_6: { angle: "300°", distance: "55mm" }
      
      ghost_labels:  # Light gray suggestions
        enabled: true
        opacity: 0.3
        suggestions: ["Roles", "Rules", "Examples", "Key Terms", "People", "Places"]
  
  ideas_helper_zone:
    height: "35mm"
    
    styling:
      background: "#F9FAFB"
      border: "1px solid #E5E7EB"
      border_radius: "6px"
      padding: "5mm"
    
    content:
      title: "🌟 Ideas for Branches"
      table:
        columns: 2
        data: "Key terms with suggestions"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE TYPE 6: HOMEWORK PAGE (📦 Moonlight Mission)
# ═══════════════════════════════════════════════════════════════════════════════

## 📦 Moonlight Mission — Full Specification

```yaml
page_type: "homework"
block_name: "📦 Moonlight Mission"
purpose: "Take-home creative project"
theme: "nighttime adventure"
```

### Layout Zones

```yaml
homework_layout:
  
  header_zone:
    height: "32mm"
    
    styling:
      background: "linear-gradient(180deg, #1E1E3F 0%, #2D2D54 100%)"
      
      decorations:
        moon:
          position: { right: "15mm", top: "5mm" }
          size: "20mm"
          type: "crescent"
          color: "#F4D03F"
        
        stars:
          count: 12
          size_range: "2mm-4mm"
          color: "#FFFFFF"
          positions: "scattered"
    
    content:
      icon: "📦"
      title: "Moonlight Mission"
      subtitle: "Homework — Lesson {X}"
      color: "#FFFFFF"

  mission_brief_zone:
    height: "28mm"
    
    styling:
      background: "#FEF3C7"
      border: "2px solid #D4AF37"
      border_radius: "8px"
      
      # Scroll/parchment effect
      before_decoration: "scroll-curl-left"
      after_decoration: "scroll-curl-right"
    
    content:
      title: "Your Mission:"
      description: "{Mission description text}"
      font: "Caveat"
      font_size: "14pt"

  task_zones:
    total_height: "165mm"
    
    # Flexible based on task count
    task_1:
      height: "40mm"
      prompt: "1. {Question}"
      input: "writing_lines"
      lines: 3
    
    task_2:
      height: "40mm"
      prompt: "2. {Question}"
      input: "writing_lines"
      lines: 3
    
    task_3:
      height: "40mm"
      prompt: "3. {Question}"
      input: "writing_lines"
      lines: 3
    
    drawing_zone:
      height: "45mm"
      prompt: "🎨 Draw your {subject}!"
      border: "dashed 2px #2D2D54"
      border_radius: "8px"

  ideas_zone:
    height: "25mm"
    
    styling:
      background: "#EEF2FF"
      border_radius: "6px"
      padding: "5mm"
    
    content:
      title: "💡 Ideas to Get Started"
      format: "inline-tags"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE TYPE 7: ASSESSMENT PAGE (📏 Innovator Ladder)
# ═══════════════════════════════════════════════════════════════════════════════

## 📏 Innovator Ladder — Full Specification

```yaml
page_type: "assessment"
block_name: "📏 Innovator Ladder"
secondary_block: "✨ Thought Crystal"
purpose: "Self-reflection and formative assessment"
sections: 4
```

### Layout Zones

```yaml
assessment_layout:
  
  header_zone:
    height: "25mm"
    
    dual_icons:
      left: "✨"
      right: "📏"
    
    title: "Thought Crystal & Innovator Ladder"
    subtitle: "Reflect on Your Learning"

  # ECA Framework: Example - Check - Advice
  
  example_block:
    height: "45mm"
    
    styling:
      background: "#FEF9C3"  # Light yellow
      border_left: "4px solid #F59E0B"
      border_radius: "0 6px 6px 0"
      padding: "6mm"
    
    content:
      icon: "🌟"
      title: "Example: Where I Used Something New"
      prompt: "Write an example of where you used something new:"
      example_hint: "(Example: I explained what society means)"
      lines: 2

  check_block:
    height: "65mm"
    
    styling:
      background: "#ECFDF5"  # Light green
      border_left: "4px solid #10B981"
      border_radius: "0 6px 6px 0"
      padding: "6mm"
    
    content:
      icon: "✅"
      title: "Check: What Went Well / What to Improve"
      
      sub_section_1:
        prompt: "What went well?"
        lines: 2
        
      sub_section_2:
        prompt: "What do I need to improve?"
        lines: 2

  advice_block:
    height: "45mm"
    
    styling:
      background: "#F3E8FF"  # Light purple
      border_left: "4px solid #8B5CF6"
      border_radius: "0 6px 6px 0"
      padding: "6mm"
    
    content:
      icon: "💬"
      title: "Advice to Myself"
      prompt: "What should I do at home or next lesson?"
      lines: 2

  word_of_day_block:
    height: "35mm"
    
    styling:
      background: "#FFFFFF"
      border: "3px solid #D4AF37"
      border_radius: "8px"
      padding: "6mm"
    
    content:
      icon: "📖"
      title: "My Word of the Day"
      prompt: "Choose 1 term to remember:"
      
      input_box:
        width: "80mm"
        height: "10mm"
        border: "2px solid #D4AF37"
        border_radius: "4px"
        background: "#FFFBEB"

  completion_message:
    height: "18mm"
    
    content:
      text: "🏆 You've Completed Lesson {X}!"
      subtext: "Great work, Innovator! King Luminar is proud!"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PAGE TYPE 8: STICKER SHEET (Interactive Extras)
# ═══════════════════════════════════════════════════════════════════════════════

## 🎨 Sticker Sheet — Full Specification

```yaml
page_type: "stickers"
block_name: "🎨 Interactive Extras"
purpose: "Cut-out or digital stickers for activities"
print_special: "perforated or sticker paper"
```

### Layout Zones

```yaml
sticker_layout:
  
  header_zone:
    height: "18mm"
    content: "🎨 Interactive Extras — Lesson {X} Stickers"
    background: "var(--level-color)"

  instruction_zone:
    height: "10mm"
    content: "Cut out or peel these stickers for your activities!"

  sticker_grid:
    height: "220mm"
    
    # Main sticker section
    rule_stickers:
      title: "📜 Rule Stickers"
      count: 12
      layout: "grid"
      columns: 4
      rows: 3
      
      sticker:
        width: "40mm"
        height: "18mm"
        border_radius: "9mm"
        border: "1px dashed #9CA3AF"  # Cut line
        
        inner:
          background: "varied-pastels"
          border_radius: "8mm"
          padding: "2mm 4mm"
          
          icon:
            size: "5mm"
            position: "left"
          
          text:
            font: "Quicksand 600"
            font_size: "8pt"
            max_width: "30mm"
    
    # Badge section
    achievement_badges:
      title: "🏅 Achievement Badges"
      count: 4
      layout: "row"
      
      badge:
        width: "35mm"
        height: "35mm"
        shape: "shield or circle"
        border: "1px dashed #9CA3AF"
        
        inner:
          background: "linear-gradient(180deg, #F4D03F, #D4AF37)"
          icon_size: "15mm"
          label_font_size: "7pt"
    
    # Checkmark stickers
    checkmarks:
      title: "✅ Progress Stickers"
      count: 8
      layout: "row"
      
      sticker:
        width: "15mm"
        height: "15mm"
        shape: "circle"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# COMPONENT SPACE CALCULATOR
# ═══════════════════════════════════════════════════════════════════════════════

## 📐 Dynamic Space Allocation

Use these calculations to determine exact heights based on content:

### Writing Line Calculator

```yaml
writing_calculator:
  base_line_height: "10mm"
  
  formulas:
    short_answer:
      lines: 2
      height: "20mm"
    
    medium_answer:
      lines: 4
      height: "40mm"
    
    paragraph:
      lines: 6
      height: "60mm"
    
    # Custom
    custom:
      formula: "lines × 10mm"
```

### Multiple Choice Calculator

```yaml
multiple_choice_calculator:
  question_text_height: "8mm"
  option_height: "7mm"
  spacing_after: "5mm"
  
  formulas:
    total_height: "8mm + (option_count × 7mm) + 5mm"
    
    examples:
      "4_options": "8 + 28 + 5 = 41mm"
      "5_options": "8 + 35 + 5 = 48mm"
      "6_options": "8 + 42 + 5 = 55mm"
```

### Drawing Zone Calculator

```yaml
drawing_calculator:
  
  # Based on task complexity
  quick_sketch:
    min_width: "40mm"
    min_height: "40mm"
    use: "Icon, emoji, simple shape"
  
  illustration:
    min_width: "80mm"
    min_height: "60mm"
    use: "Scene, character, diagram"
  
  detailed_art:
    min_width: "full-width"
    min_height: "100mm"
    use: "Full illustration, poster, map"
  
  flag_design:
    width: "80mm"
    height: "50mm"
    ratio: "1.6:1"
```

### Table Calculator

```yaml
table_calculator:
  header_height: "12mm"
  row_height: "15mm"  # For text
  row_height_drawing: "25mm"  # If drawing allowed
  cell_padding: "3mm"
  
  formulas:
    table_height: "header + (rows × row_height)"
    
    examples:
      "3_text_rows": "12 + (3 × 15) = 57mm"
      "4_text_rows": "12 + (4 × 15) = 72mm"
      "3_drawing_rows": "12 + (3 × 25) = 87mm"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# CSS VARIABLES REFERENCE
# ═══════════════════════════════════════════════════════════════════════════════

## 🎨 Complete CSS Variable System

```css
/* TISAVERSE CSS VARIABLES */
:root {
  /* TISA Brand */
  --tisa-purple: #6B3FA0;
  --tisa-gold: #D4AF37;
  --tisa-cream: #F5F5DC;
  --tisa-charcoal: #36454F;
  
  /* Level Colors (set per workbook) */
  --level-color: #2D5A27;           /* Primary */
  --level-color-light: #3D7A37;     /* Light variant */
  --level-color-dark: #1D4A17;      /* Dark variant */
  --level-color-accent: #6DBF67;    /* Accent */
  --level-color-10: rgba(45, 90, 39, 0.1);  /* 10% opacity */
  
  /* Owl Colors */
  --owl-remembery: #7EB8DA;
  --owl-intellecta: #8B5CF6;
  --owl-practica: #4A7C59;
  --owl-deducta: #6B7280;
  --owl-critica: #F59E0B;
  --owl-creatica: linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6);
  
  /* Semantic Colors */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  /* Spacing */
  --space-xs: 4mm;
  --space-sm: 8mm;
  --space-md: 12mm;
  --space-lg: 16mm;
  --space-xl: 24mm;
  
  /* Typography */
  --font-display: 'Quicksand', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --font-accent: 'Caveat', cursive;
  --font-story: 'Crimson Text', serif;
  
  /* Borders */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.15);
}

/* LEVEL COLOR PRESETS */
.level-grade-2 {
  --level-color: #1E3A5F;
  --level-color-light: #2E5A8F;
  --level-color-dark: #0E2A4F;
  --level-color-accent: #4A90D9;
}

.level-grade-3 {
  --level-color: #2D5A27;
  --level-color-light: #3D7A37;
  --level-color-dark: #1D4A17;
  --level-color-accent: #6DBF67;
}

.level-grade-4 {
  --level-color: #4A7C59;
  --level-color-light: #5A9C69;
  --level-color-dark: #3A6C49;
  --level-color-accent: #8FBF9A;
}

.level-grade-5 {
  --level-color: #722F37;
  --level-color-light: #923F47;
  --level-color-dark: #521F27;
  --level-color-accent: #C4536A;
}

.level-grade-6 {
  --level-color: #C4536A;
  --level-color-light: #D4637A;
  --level-color-dark: #A4435A;
  --level-color-accent: #E89AAB;
}

.level-grade-7 {
  --level-color: #E07B39;
  --level-color-light: #F08B49;
  --level-color-dark: #C06B29;
  --level-color-accent: #F5A862;
}
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# QUICK REFERENCE: PAGE TYPE SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════

## 📋 All Page Types at a Glance

| Type | Block Name | Header Height | Main Zone | Special Features |
|------|------------|---------------|-----------|------------------|
| Story | 🏰 Kingdom Chronicle | 35mm | 130mm text | Illustration 75mm |
| Glossary | 📚 Wisdom Path | 25mm | 220mm path | 6 term cards |
| Task (Remembery) | 🧠 Owl Challenge | 30mm | Variable | Matching lines |
| Task (Intellecta) | 🧠 Owl Challenge | 30mm | Variable | Categorization |
| Task (Practica) | 🧠 Owl Challenge | 30mm | Variable | Charts/tables |
| Task (Deducta) | 🧠 Owl Challenge | 30mm | Variable | Problem-solving |
| Task (Critica) | 🧠 Owl Challenge | 30mm | Variable | Pros/cons |
| Task (Creatica) | 🎨 Creatica Canvas | 28mm | Variable | Drawing zones |
| Test | 💎 Royal Checkpoint | 28mm | 195mm | 5-7 questions |
| Mind Map | 🧠 Mind Map | 22mm | 165mm | 6 branches |
| Homework | 📦 Moonlight Mission | 32mm | 165mm | Night theme |
| Assessment | 📏 Innovator Ladder | 25mm | 190mm | 4 reflection blocks |
| Stickers | 🎨 Interactive Extras | 18mm | 220mm | Perforated grid |

---

*This Page Type Library provides pixel-perfect specifications for Gemini Visual Composer and all TISAverse rendering systems.*
