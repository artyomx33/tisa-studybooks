---
# ═══════════════════════════════════════════════════════════════════════════════
# TISAVERSE MASTER CURRICULUM CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════
# This is the SINGLE SOURCE OF TRUTH for all TISA MBA workbooks
# Version: 1.0
# Last Updated: 2025-01-XX
# ═══════════════════════════════════════════════════════════════════════════════

system_name: "TISAverse"
system_version: "1.0"
organization: "TISA International School"
tagline: "Theodore International Startup Academy"
---

# 📚 TISAVERSE — Master Curriculum Configuration

## 🎓 System Overview

The TISA MBA Journey takes students from age 5 to age 11 through **10 progressive workbooks**, each building entrepreneurial thinking, economic literacy, and problem-solving skills.

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 1: BRAND CONSTANTS
# ═══════════════════════════════════════════════════════════════════════════════

## 🟣 TISA Brand Identity

```yaml
brand:
  name: "TISA"
  full_name: "Theodore International Startup Academy"
  
  # PRIMARY BRAND COLOR - Used on ALL materials
  primary_color:
    name: "TISA Purple"
    hex: "#6B3FA0"
    rgb: [107, 63, 160]
    usage: "Bottom bar on all pages, logo, brand elements"
  
  # SECONDARY BRAND COLORS
  secondary_colors:
    gold:
      hex: "#D4AF37"
      usage: "Accents, achievements, premium elements"
    cream:
      hex: "#F5F5DC"
      usage: "Page backgrounds, soft contrast"
    charcoal:
      hex: "#36454F"
      usage: "Primary text, headers"
  
  # LOGO SPECIFICATIONS
  logo:
    primary: "TISA shield with owl"
    placement: "Top-left of all pages"
    min_size: "24px height"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 2: LEVEL COLOR SYSTEM
# ═══════════════════════════════════════════════════════════════════════════════

## 🎨 Level Color Palette

Each grade level has a distinct color that represents progression and age-appropriateness.

```yaml
level_colors:
  
  # GRADE 2 — Entry Level (Age 5-6)
  grade_2:
    name: "Dark Blue"
    name_ru: "Темно-Синий"
    hex: "#1E3A5F"
    rgb: [30, 58, 95]
    light_variant: "#2E5A8F"
    dark_variant: "#0E2A4F"
    accent: "#4A90D9"
    psychology: "Trust, stability, calm - perfect for youngest learners"
    
  # GRADE 3 — Beginner (Age 6-7)
  grade_3:
    name: "Dark Green"
    name_ru: "Темно-зеленый"
    hex: "#2D5A27"
    rgb: [45, 90, 39]
    light_variant: "#3D7A37"
    dark_variant: "#1D4A17"
    accent: "#6DBF67"
    psychology: "Growth, nature, learning - fairy tale & fantasy friendly"
    
  # GRADE 4 — Intermediate (Age 7-8)
  grade_4:
    name: "Light Green"
    name_ru: "Светло-зеленый"
    hex: "#4A7C59"
    rgb: [74, 124, 89]
    light_variant: "#5A9C69"
    dark_variant: "#3A6C49"
    accent: "#8FBF9A"
    psychology: "Progress, problem-solving, innovation"
    
  # GRADE 5 — Advanced (Age 8-9)
  grade_5:
    name: "Burgundy"
    name_ru: "Красно-бордовый"
    hex: "#722F37"
    rgb: [114, 47, 55]
    light_variant: "#923F47"
    dark_variant: "#521F27"
    accent: "#C4536A"
    psychology: "Ambition, business mindset, maturity"
    
  # GRADE 6 — Professional (Age 9-10)
  grade_6:
    name: "Rose"
    name_ru: "Красно-розовый"
    hex: "#C4536A"
    rgb: [196, 83, 106]
    light_variant: "#D4637A"
    dark_variant: "#A4435A"
    accent: "#E89AAB"
    psychology: "Technology, innovation, modern"
    
  # GRADE 7 — Expert (Age 10-11)
  grade_7:
    name: "Orange"
    name_ru: "Оранжевый"
    hex: "#E07B39"
    rgb: [224, 123, 57]
    light_variant: "#F08B49"
    dark_variant: "#C06B29"
    accent: "#F5A862"
    psychology: "Energy, entrepreneurship, action"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 3: COMPLETE WORKBOOK REGISTRY
# ═══════════════════════════════════════════════════════════════════════════════

## 📖 All TISA MBA Workbooks

```yaml
workbooks:

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 1: MY FIRST PROJECT
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-001"
    slug: "my-first-project"
    title: "My First Project"
    title_ru: "Мой первый проект"
    
    # Classification
    grade: 2
    level: "OP"
    level_name: "Orientation Program"
    age_range: [5, 6]
    semester: "Fall"
    
    # Visual Identity
    color_scheme: "grade_2"  # References level_colors.grade_2
    theme_style: "playful-discovery"
    world_name: null  # No fantasy world for this level
    
    # Content Specs
    page_count: 70
    lesson_count: 10
    
    # Characters
    has_characters: false
    character_file: null
    
    # Status
    status: "ready_for_review"
    tz_en: "OP EN Workbook.docx"
    tz_ru: "Мой первый проект"
    deadline: "2024-11-20"
    
    # Special Notes
    notes: "Exception - no Formative Assessment section"
    structure_exception: "no_formative_assessment"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 2: ECONOMICS THROUGH FAIRY TALES
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-002"
    slug: "economics-fairy-tales"
    title: "Economics through Fairy Tales"
    title_ru: "Экономика в сказках"
    
    # Classification
    grade: 3
    level: "1-2"
    level_name: "Beginner"
    age_range: [6, 7]
    semester: "Fall"
    
    # Visual Identity
    color_scheme: "grade_3"
    theme_style: "storybook-warm"
    world_name: "Kingdom of Finance"
    currency_name: "Luminars"
    
    # Content Specs
    page_count: 138
    lesson_count: 10
    lessons:
      - { num: 1, title: "Society", challenge: "Kingdom is in chaos — restore order" }
      - { num: 2, title: "Money", challenge: "All money has disappeared" }
      - { num: 3, title: "Production", challenge: "Make the kingdom famous for something" }
      - { num: 4, title: "Consumption", challenge: "People aren't buying imported goods" }
      - { num: 5, title: "Trade & Market", challenge: "King needs to learn trading" }
      - { num: 6, title: "Wealth", challenge: "Why do kingdoms differ in wealth?" }
      - { num: 7, title: "Division of Labour", challenge: "Toy workshop workers forgot their jobs" }
      - { num: 8, title: "Insurance", challenge: "Neighbouring kingdoms had disasters" }
      - { num: 9, title: "Entrepreneurship", challenge: "All entrepreneurs have left" }
      - { num: 10, title: "Finance", challenge: "People don't know how to use Luminars" }
    
    # Characters
    has_characters: true
    character_file: "_characters_economics_fairy_tales.md"
    main_characters:
      - "King Luminar"
      - "Owl Creatica"
      - "Rabbit Moss"
      - "Squirrel Twig"
      - "Bear John"
    
    # Status
    status: "ready_for_review"
    tz_en: "WB Economics trough Fairy Tales"
    tz_ru: "WB Экономика в сказках"
    deadline: "2024-11-13"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 3: FINANCIAL LITERACY
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-003"
    slug: "financial-literacy"
    title: "Financial Literacy"
    title_ru: "Финансовая грамотность"
    
    # Classification
    grade: 3
    level: "3"
    level_name: "Beginner Advanced"
    age_range: [6, 7]
    semester: "Spring"
    
    # Visual Identity
    color_scheme: "grade_3"
    theme_style: "storybook-warm"
    world_name: "TBD"
    
    # Content Specs
    page_count: 150
    lesson_count: 10
    
    # Characters
    has_characters: true
    character_file: "_characters_financial_literacy.md"
    
    # Status
    status: "ready_for_review"
    tz_en: "WB Financial Literacy.docx"
    tz_ru: "WB Финансовая грамотность.docx"
    deadline: "2024-11-27"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 4: CREATIVE PROBLEM-SOLVING
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-004"
    slug: "creative-problem-solving"
    title: "Creative Problem-Solving"
    title_ru: "Креативное решение проблем"
    
    # Classification
    grade: 4
    level: "4"
    level_name: "Intermediate"
    age_range: [7, 8]
    semester: "Fall"
    
    # Visual Identity
    color_scheme: "grade_4"
    theme_style: "innovation-quest"
    world_name: "TBD"
    
    # Content Specs
    page_count: 210
    lesson_count: 14  # Larger workbook
    
    # Characters
    has_characters: true
    character_file: "_characters_creative_problem_solving.md"
    
    # Status
    status: "in_progress"
    tz_en: null
    tz_ru: null
    deadline: "2024-12-07"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 5: SMART-CITY MANAGEMENT
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-005"
    slug: "smart-city-management"
    title: "SMART-City Management"
    title_ru: "Управление SMART-городом"
    
    # Classification
    grade: 4
    level: "5"
    level_name: "Intermediate Advanced"
    age_range: [7, 8]
    semester: "Spring"
    
    # Visual Identity
    color_scheme: "grade_4"
    theme_style: "futuristic-city"
    world_name: "SMART City"
    
    # Content Specs
    page_count: 170
    lesson_count: 12
    
    # Characters
    has_characters: true
    character_file: "_characters_smart_city.md"
    
    # Status
    status: "ready_for_review"
    tz_en: "WB SMART-City managment"
    tz_ru: null
    deadline: "2024-11-24"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 6: MY COMPANY
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-006"
    slug: "my-company"
    title: "My Company"
    title_ru: "Моя компания"
    
    # Classification
    grade: 5
    level: "6"
    level_name: "Advanced"
    age_range: [8, 9]
    semester: "Fall"
    
    # Visual Identity
    color_scheme: "grade_5"
    theme_style: "business-world"
    world_name: "TBD"
    
    # Content Specs
    page_count: 165
    lesson_count: 11
    
    # Characters
    has_characters: true
    character_file: "_characters_my_company.md"
    
    # Status
    status: "in_progress"
    tz_en: null
    tz_ru: null
    deadline: "2024-12-13"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 7: CUSTOMER DEVELOPMENT
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-007"
    slug: "customer-development"
    title: "Customer Development"
    title_ru: "Развитие клиентов"
    
    # Classification
    grade: 5
    level: "7"
    level_name: "Advanced Professional"
    age_range: [8, 9]
    semester: "Spring"
    
    # Visual Identity
    color_scheme: "grade_5"
    theme_style: "business-world"
    world_name: "TBD"
    
    # Content Specs
    page_count: 180
    lesson_count: 12
    
    # Characters
    has_characters: true
    character_file: "_characters_customer_development.md"
    
    # Status
    status: "in_progress"
    tz_en: null
    tz_ru: null
    deadline: "2024-12-19"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 8: INTERNET OF THINGS
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-008"
    slug: "internet-of-things"
    title: "Internet of Things"
    title_ru: "Интернет вещей"
    
    # Classification
    grade: 6
    level: "8"
    level_name: "Professional"
    age_range: [9, 10]
    semester: "Fall"
    
    # Visual Identity
    color_scheme: "grade_6"
    theme_style: "tech-innovation"
    world_name: "IoT World"
    
    # Content Specs
    page_count: 150
    lesson_count: 10
    
    # Characters
    has_characters: true
    character_file: "_characters_iot.md"
    
    # Status
    status: "in_progress"
    tz_en: null
    tz_ru: null
    deadline: "2024-12-26"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 9: MY FIRST APP
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-009"
    slug: "my-first-app"
    title: "My First App"
    title_ru: "Мое первое приложение"
    
    # Classification
    grade: 6
    level: "9"
    level_name: "Professional Advanced"
    age_range: [9, 10]
    semester: "Spring"
    
    # Visual Identity
    color_scheme: "grade_6"
    theme_style: "tech-innovation"
    world_name: "App World"
    
    # Content Specs
    page_count: 150  # Estimated
    lesson_count: 10
    
    # Characters
    has_characters: true
    character_file: "_characters_my_first_app.md"
    
    # Status
    status: "not_started"
    tz_en: null
    tz_ru: null
    deadline: "TBD"

  # ─────────────────────────────────────────────────────────────────────────────
  # WORKBOOK 10: FUNDAMENTALS OF ENTREPRENEURSHIP
  # ─────────────────────────────────────────────────────────────────────────────
  - id: "wb-010"
    slug: "fundamentals-entrepreneurship"
    title: "Fundamentals of Entrepreneurship"
    title_ru: "Основы предпринимательства"
    
    # Classification
    grade: 7
    level: "10"
    level_name: "Expert"
    age_range: [10, 11]
    semester: "Full Year"
    
    # Visual Identity
    color_scheme: "grade_7"
    theme_style: "entrepreneur-journey"
    world_name: "Business Universe"
    
    # Content Specs
    page_count: 170
    lesson_count: 12
    
    # Characters
    has_characters: true
    character_file: "_characters_entrepreneurship.md"
    
    # Status
    status: "in_progress"
    tz_en: null
    tz_ru: null
    deadline: "2025-01-05"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 4: UNIVERSAL LESSON STRUCTURE
# ═══════════════════════════════════════════════════════════════════════════════

## 📋 Standard Lesson Components

Every TISA MBA lesson follows this structure (unless noted as exception):

```yaml
lesson_structure:
  
  # OPENING
  - component: "story"
    block_type: "🏰 Kingdom Chronicle"
    required: true
    typical_pages: 2
    description: "Narrative introduction with character dialogue"
  
  # VOCABULARY
  - component: "glossary"
    block_type: "📚 Wisdom Path"
    required: true
    typical_pages: 1
    description: "Key terms with visual path layout"
  
  # TASKS (6 Owl Types)
  - component: "task_remembery"
    block_type: "🧠 Owl Challenge"
    owl_type: "Remembery"
    required: true
    typical_pages: 1-2
    focus: "Memory, recall, matching"
    
  - component: "task_intellecta"
    block_type: "🧠 Owl Challenge"
    owl_type: "Intellecta"
    required: true
    typical_pages: 1-2
    focus: "Understanding, analysis"
    
  - component: "task_practica"
    block_type: "🧠 Owl Challenge"
    owl_type: "Practica"
    required: true
    typical_pages: 1-2
    focus: "Real-world application"
    
  - component: "task_deducta"
    block_type: "🧠 Owl Challenge"
    owl_type: "Deducta"
    required: true
    typical_pages: 1-2
    focus: "Logic, problem-solving"
    
  - component: "task_critica"
    block_type: "🧠 Owl Challenge"
    owl_type: "Critica"
    required: true
    typical_pages: 1-2
    focus: "Critical thinking, evaluation"
    
  - component: "task_creatica"
    block_type: "🎨 Creatica Canvas"
    owl_type: "Creatica"
    required: true
    typical_pages: 1-2
    focus: "Creativity, design"
  
  # ASSESSMENT
  - component: "test"
    block_type: "💎 Royal Checkpoint"
    required: true
    typical_pages: 1
    description: "Knowledge check quiz"
  
  # SYNTHESIS
  - component: "mindmap"
    block_type: "🧠 Mind Map"
    required: true
    typical_pages: 1
    description: "Visual concept organization"
  
  # EXTENSION
  - component: "homework"
    block_type: "📦 Moonlight Mission"
    required: true
    typical_pages: 1
    description: "Take-home creative project"
  
  # REFLECTION
  - component: "formative_assessment"
    block_type: "📏 Innovator Ladder"
    secondary_block: "✨ Thought Crystal"
    required: true  # Exception: wb-001 (My First Project)
    typical_pages: 1
    description: "Self-reflection and goal-setting"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 5: OWL SYSTEM
# ═══════════════════════════════════════════════════════════════════════════════

## 🦉 The Six Wise Owls

```yaml
owl_system:
  
  owl_remembery:
    name: "Owl Remembery"
    focus: "Memory, recall, definitions"
    color_accent: "#7EB8DA"  # Soft Blue
    accessory: "small-notebook"
    icon: "📝"
    task_types:
      - matching
      - fill-in-blank
      - term-recall
      - definition-matching
    
  owl_intellecta:
    name: "Owl Intellecta"
    focus: "Understanding, analysis, connections"
    color_accent: "#8B5CF6"  # Deep Purple
    accessory: "magnifying-glass"
    icon: "🧠"
    task_types:
      - categorization
      - comparison
      - explanation
      - connection-mapping
    
  owl_practica:
    name: "Owl Practica"
    focus: "Practical application, real-world"
    color_accent: "#4A7C59"  # Earthy Green
    accessory: "tool-belt"
    icon: "🛠️"
    task_types:
      - chart-creation
      - real-life-application
      - survey
      - interview
    
  owl_deducta:
    name: "Owl Deducta"
    focus: "Logic, deduction, problem-solving"
    color_accent: "#6B7280"  # Steel Gray
    accessory: "detective-hat"
    icon: "🔍"
    task_types:
      - problem-solving
      - sequence
      - cause-effect
      - puzzle
    
  owl_critica:
    name: "Owl Critica"
    focus: "Critical thinking, evaluation"
    color_accent: "#F59E0B"  # Warm Orange
    accessory: "balance-scale"
    icon: "⚖️"
    task_types:
      - pros-cons
      - evaluation
      - opinion-forming
      - debate
    
  owl_creatica:
    name: "Owl Creatica"
    focus: "Creativity, imagination, design"
    color_accent: "rainbow-gradient"  # Rainbow Shimmer
    accessory: "paintbrush"
    icon: "🎨"
    task_types:
      - drawing
      - design
      - invention
      - storytelling
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 6: BLOCK TYPE BRANDING
# ═══════════════════════════════════════════════════════════════════════════════

## 🏷️ Luna Signature Block Types

```yaml
block_types:
  
  story:
    brand_name: "🏰 Kingdom Chronicle"
    icon: "castle-silhouette"
    purpose: "Narrative introduction"
    
  glossary:
    brand_name: "📚 Wisdom Path"
    icon: "forest-path"
    purpose: "Vocabulary with visual journey"
    
  task:
    brand_name: "🧠 Owl Challenge"
    icon: "owl-badge"
    purpose: "Learning activities"
    
  creative:
    brand_name: "🎨 Creatica Canvas"
    icon: "paint-palette"
    purpose: "Creative expression"
    
  test:
    brand_name: "💎 Royal Checkpoint"
    icon: "diamond-checkpoint"
    purpose: "Knowledge assessment"
    
  mindmap:
    brand_name: "🧠 Mind Map"
    icon: "branch-network"
    purpose: "Concept visualization"
    
  homework:
    brand_name: "📦 Moonlight Mission"
    icon: "moon-scroll"
    purpose: "Take-home project"
    
  reflection:
    brand_name: "📏 Innovator Ladder"
    secondary: "✨ Thought Crystal"
    icon: "ladder-stars"
    purpose: "Self-assessment"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 7: PROJECT STAGES MAPPING
# ═══════════════════════════════════════════════════════════════════════════════

## 📊 Project Stage Progression by Grade

*Based on the PROJECT_STAGES document — shows how project complexity increases*

```yaml
project_stages:

  grade_2:  # My First Project
    stages: 13
    key_stages:
      - Problem
      - Solution
      - Target audience
      - Market
      - Survey
      - Resources
      - Cost and price
      - Storyboard
      - Advertising
      - Prototype
      - Test prototype
      - Project results
      - Team

  grade_3:  # Economics + Financial Literacy
    stages: 14-16
    new_concepts:
      - "Hypothesis"
      - "Benchmarking"
      - "Ideal Final Result"
      - "3D Model"

  grade_4:  # Creative Problem-Solving + SMART-City
    stages: 18-20
    new_concepts:
      - "Relevance of Topic"
      - "Challenge Brief"
      - "Identifying Trends"
      - "Persona Model"
      - "Customer Journey"

  grade_5:  # My Company + Customer Development
    stages: 20-22
    new_concepts:
      - "SWOT Analysis"
      - "Competitors (4P)"
      - "MVP"
      - "Landing Page"
      - "Financial Sustainability"

  grade_6:  # IoT + My First App
    stages: 20-22
    new_concepts:
      - "Application Features"
      - "User Scenario Map"
      - "App Publishing Platform"
      - "Monetization"

  grade_7:  # Fundamentals of Entrepreneurship
    stages: 23
    new_concepts:
      - "Digital Maturity Assessment"
      - "Business Processes"
      - "Implementation Strategy"
      - "Risk Mitigation"
      - "Scalability"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 8: FILE NAMING CONVENTIONS
# ═══════════════════════════════════════════════════════════════════════════════

## 📁 Standard File Structure

```yaml
file_conventions:
  
  # Root structure
  root: "/tisaverse/"
  
  # Workbook directory
  workbook_dir: "{workbook_slug}/"
  # Example: /tisaverse/economics-fairy-tales/
  
  # Lesson directory
  lesson_dir: "lesson-{XX}-{lesson_slug}/"
  # Example: lesson-01-society/
  
  # File naming
  files:
    story: "01-story.md"
    glossary: "02-glossary.md"
    task_remembery: "03-task-remembery.md"
    task_remembery_2: "04-task-remembery-2.md"  # If multiple
    task_intellecta: "05-task-intellecta.md"
    task_practica: "06-task-practica.md"
    task_deducta: "07-task-deducta.md"
    task_critica: "08-task-critica.md"
    task_creatica: "09-task-creatica.md"
    test: "10-test.md"
    mindmap: "11-mindmap.md"
    homework: "12-homework.md"
    assessment: "13-assessment.md"
  
  # Special files
  special:
    module_overview: "_module_overview.md"
    characters: "_characters.md"
    design_system: "_design_system.md"
    
  # Interactive extras
  extras_dir: "interactive-extras/"
  stickers: "stickers-lesson-{XX}.md"
  global_stickers: "stickers-global.md"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 9: QUICK REFERENCE TABLES
# ═══════════════════════════════════════════════════════════════════════════════

## 📋 Complete Workbook Quick Reference

| ID | Grade | Age | Title | Color | Pages | Status |
|----|-------|-----|-------|-------|-------|--------|
| wb-001 | 2 | 5-6 | My First Project | 🔵 Dark Blue | 70 | ✅ Ready |
| wb-002 | 3 | 6-7 | Economics through Fairy Tales | 🟢 Dark Green | 138 | ✅ Ready |
| wb-003 | 3 | 6-7 | Financial Literacy | 🟢 Dark Green | 150 | ✅ Ready |
| wb-004 | 4 | 7-8 | Creative Problem-Solving | 🟩 Light Green | 210 | 🔄 In Progress |
| wb-005 | 4 | 7-8 | SMART-City Management | 🟩 Light Green | 170 | ✅ Ready |
| wb-006 | 5 | 8-9 | My Company | 🔴 Burgundy | 165 | 🔄 In Progress |
| wb-007 | 5 | 8-9 | Customer Development | 🔴 Burgundy | 180 | 🔄 In Progress |
| wb-008 | 6 | 9-10 | Internet of Things | 🌸 Rose | 150 | 🔄 In Progress |
| wb-009 | 6 | 9-10 | My First App | 🌸 Rose | ~150 | ⏳ Not Started |
| wb-010 | 7 | 10-11 | Fundamentals of Entrepreneurship | 🟠 Orange | 170 | 🔄 In Progress |

---

## 🎨 Color Hex Quick Reference

| Grade | Color Name | Primary Hex | Light | Dark | Accent |
|-------|------------|-------------|-------|------|--------|
| 2 | Dark Blue | `#1E3A5F` | `#2E5A8F` | `#0E2A4F` | `#4A90D9` |
| 3 | Dark Green | `#2D5A27` | `#3D7A37` | `#1D4A17` | `#6DBF67` |
| 4 | Light Green | `#4A7C59` | `#5A9C69` | `#3A6C49` | `#8FBF9A` |
| 5 | Burgundy | `#722F37` | `#923F47` | `#521F27` | `#C4536A` |
| 6 | Rose | `#C4536A` | `#D4637A` | `#A4435A` | `#E89AAB` |
| 7 | Orange | `#E07B39` | `#F08B49` | `#C06B29` | `#F5A862` |
| — | **TISA Purple** | `#6B3FA0` | — | — | `#D4AF37` (Gold) |

---

*This is the MASTER CONFIGURATION for the entire TISAverse system.*
*All workbooks, components, and designs reference this file.*
