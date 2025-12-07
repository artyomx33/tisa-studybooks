---
# ═══════════════════════════════════════════════════════════════════════════════
# TISAVERSE COVER PAGE GENERATOR
# ═══════════════════════════════════════════════════════════════════════════════
# Templates and AI prompts for generating all TISA MBA workbook covers
# Version: 1.0
# References: _curriculum_master.md, _design_system.md
# AI Tools: Midjourney, Nano Banana, DALL-E, Stable Diffusion
# ═══════════════════════════════════════════════════════════════════════════════

generator_name: "TISAverse Cover Generator"
version: "1.0"
total_covers: 10
output_format: "A4 Portrait"
---

# 🎨 TISAVERSE COVER PAGE GENERATOR

## Beautiful Covers for Every Workbook

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 1: COVER PAGE ANATOMY
# ═══════════════════════════════════════════════════════════════════════════════

## 📐 Universal Cover Structure

Every TISA MBA cover follows this layout:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ┌─ TOP BRAND BAR ─────────────────────────────────────────────────────────┐ │
│  │  [TISA LOGO]              ✦ TISA MBA ✦              [LEVEL BADGE]       │ │ 15mm
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│                                                                              │
│                                                                              │
│                    ┌─────────────────────────────────┐                       │
│                    │                                 │                       │
│                    │                                 │                       │
│                    │      [ HERO ILLUSTRATION ]      │                       │
│                    │                                 │                       │ 140mm
│                    │         AI Generated           │                       │
│                    │                                 │                       │
│                    │                                 │                       │
│                    └─────────────────────────────────┘                       │
│                                                                              │
│  ┌─ TITLE ZONE ────────────────────────────────────────────────────────────┐ │
│  │                                                                         │ │
│  │                    WORKBOOK TITLE                                       │ │ 45mm
│  │                      Subtitle                                           │ │
│  │                                                                         │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ INFO BADGES ───────────────────────────────────────────────────────────┐ │
│  │    [ Age 6-7 ]        [ Grade 3 ]        [ Fall Semester ]              │ │ 20mm
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌─ WORLD TAGLINE ─────────────────────────────────────────────────────────┐ │
│  │              ✨ "Kingdom of Finance Chronicles" ✨                       │ │ 15mm
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  ████████████████████ TISA PURPLE FOUNDATION BAR █████████████████████████   │ 18mm
│  ████████████████████████████ #6B3FA0 ████████████████████████████████████   │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Zone Specifications

```yaml
cover_zones:
  
  # Top Brand Bar
  top_brand_bar:
    height: "15mm"
    position: "top: 8mm"
    background: "transparent or subtle gradient"
    
    contents:
      logo:
        position: "left: 15mm"
        size: "12mm height"
        content: "TISA shield logo"
      
      center_text:
        content: "✦ TISA MBA ✦"
        font: "Quicksand 600"
        size: "10pt"
        color: "#FFFFFF"
        letter_spacing: "0.2em"
      
      level_badge:
        position: "right: 15mm"
        size: "25mm × 12mm"
        content: "Level {X}"
        background: "rgba(255,255,255,0.2)"
        border: "1px solid rgba(255,255,255,0.4)"
        border_radius: "6mm"

  # Hero Illustration Zone
  hero_zone:
    position: "top: 30mm"
    width: "170mm"
    height: "140mm"
    margin: "0 auto"
    
    illustration:
      style: "AI-generated scene"
      border_radius: "12px"
      box_shadow: "0 8px 32px rgba(0,0,0,0.3)"
      
    # Overlay gradient at bottom for text readability
    gradient_overlay:
      type: "linear-gradient"
      direction: "to bottom"
      stops:
        - "transparent 60%"
        - "rgba(0,0,0,0.4) 100%"

  # Title Zone
  title_zone:
    position: "top: 175mm"
    height: "45mm"
    text_align: "center"
    
    main_title:
      font: "Quicksand 700"
      size: "32pt"
      color: "#FFFFFF"
      text_shadow: "0 2px 8px rgba(0,0,0,0.5)"
      letter_spacing: "0.02em"
      max_width: "170mm"
    
    subtitle:
      font: "Quicksand 500"
      size: "14pt"
      color: "rgba(255,255,255,0.9)"
      margin_top: "5mm"

  # Info Badges Zone
  info_badges:
    position: "top: 225mm"
    height: "20mm"
    layout: "flex, justify-center, gap: 15mm"
    
    badge:
      padding: "4mm 10mm"
      background: "rgba(255,255,255,0.15)"
      border: "1px solid rgba(255,255,255,0.3)"
      border_radius: "20px"
      font: "Quicksand 600"
      size: "11pt"
      color: "#FFFFFF"

  # World Tagline Zone
  world_tagline:
    position: "top: 250mm"
    height: "15mm"
    text_align: "center"
    
    text:
      font: "Caveat"
      size: "16pt"
      color: "rgba(255,255,255,0.85)"
      font_style: "italic"

  # TISA Purple Foundation Bar (THE ANCHOR!)
  purple_foundation:
    position: "bottom: 0"
    height: "18mm"
    width: "100%"
    background: "#6B3FA0"
    
    # This is ALWAYS purple, regardless of level color
    # It anchors EVERY cover to the TISA brand
    
    contents:
      left_text:
        content: "TISA International School"
        font: "Quicksand 500"
        size: "8pt"
        color: "rgba(255,255,255,0.8)"
        position: "left: 15mm"
      
      center_icon:
        content: "owl-icon"
        size: "10mm"
        color: "#FFFFFF"
      
      right_text:
        content: "tisa.school"
        font: "Quicksand 500"
        size: "8pt"
        color: "rgba(255,255,255,0.8)"
        position: "right: 15mm"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 2: COLOR SCHEMES PER WORKBOOK
# ═══════════════════════════════════════════════════════════════════════════════

## 🎨 Cover Color Applications

Each workbook uses its level color as the dominant background with gradient variations:

```yaml
cover_color_schemes:

  # ─────────────────────────────────────────────────────────────────────────────
  # GRADE 2: DARK BLUE
  # ─────────────────────────────────────────────────────────────────────────────
  grade_2:
    workbook: "My First Project"
    
    background:
      type: "radial-gradient"
      center: "top center"
      colors:
        - "#2E5A8F 0%"      # Lighter blue at top
        - "#1E3A5F 50%"     # Primary dark blue
        - "#0E2A4F 100%"    # Darker at bottom
    
    accent_color: "#4A90D9"
    text_color: "#FFFFFF"
    badge_glow: "rgba(74, 144, 217, 0.3)"
    
    mood: "Trustworthy, calm, beginnings"
    illustration_tone: "Soft, welcoming, playful discovery"

  # ─────────────────────────────────────────────────────────────────────────────
  # GRADE 3: DARK GREEN
  # ─────────────────────────────────────────────────────────────────────────────
  grade_3:
    workbooks: 
      - "Economics through Fairy Tales"
      - "Financial Literacy"
    
    background:
      type: "radial-gradient"
      center: "top center"
      colors:
        - "#3D7A37 0%"      # Lighter green
        - "#2D5A27 50%"     # Primary dark green
        - "#1D4A17 100%"    # Forest dark
    
    accent_color: "#6DBF67"
    text_color: "#FFFFFF"
    badge_glow: "rgba(109, 191, 103, 0.3)"
    
    mood: "Growth, nature, fairy tale magic"
    illustration_tone: "Enchanted forest, warm storybook, magical kingdom"

  # ─────────────────────────────────────────────────────────────────────────────
  # GRADE 4: LIGHT GREEN
  # ─────────────────────────────────────────────────────────────────────────────
  grade_4:
    workbooks:
      - "Creative Problem-Solving"
      - "SMART-City Management"
    
    background:
      type: "radial-gradient"
      center: "top center"
      colors:
        - "#5A9C69 0%"      # Fresh green
        - "#4A7C59 50%"     # Primary
        - "#3A6C49 100%"    # Deeper
    
    accent_color: "#8FBF9A"
    text_color: "#FFFFFF"
    badge_glow: "rgba(143, 191, 154, 0.3)"
    
    mood: "Innovation, progress, smart solutions"
    illustration_tone: "Futuristic meets nature, clean innovation"

  # ─────────────────────────────────────────────────────────────────────────────
  # GRADE 5: BURGUNDY
  # ─────────────────────────────────────────────────────────────────────────────
  grade_5:
    workbooks:
      - "My Company"
      - "Customer Development"
    
    background:
      type: "radial-gradient"
      center: "top center"
      colors:
        - "#923F47 0%"      # Warm burgundy
        - "#722F37 50%"     # Primary
        - "#521F27 100%"    # Deep wine
    
    accent_color: "#C4536A"
    text_color: "#FFFFFF"
    badge_glow: "rgba(196, 83, 106, 0.3)"
    
    mood: "Ambition, business sophistication, maturity"
    illustration_tone: "Professional yet playful, business world adventure"

  # ─────────────────────────────────────────────────────────────────────────────
  # GRADE 6: ROSE
  # ─────────────────────────────────────────────────────────────────────────────
  grade_6:
    workbooks:
      - "Internet of Things"
      - "My First App"
    
    background:
      type: "radial-gradient"
      center: "top center"
      colors:
        - "#D4637A 0%"      # Bright rose
        - "#C4536A 50%"     # Primary
        - "#A4435A 100%"    # Deep rose
    
    accent_color: "#E89AAB"
    text_color: "#FFFFFF"
    badge_glow: "rgba(232, 154, 171, 0.3)"
    
    mood: "Technology, modern innovation, digital creativity"
    illustration_tone: "Tech-forward, connected world, digital adventure"

  # ─────────────────────────────────────────────────────────────────────────────
  # GRADE 7: ORANGE
  # ─────────────────────────────────────────────────────────────────────────────
  grade_7:
    workbooks:
      - "Fundamentals of Entrepreneurship"
    
    background:
      type: "radial-gradient"
      center: "top center"
      colors:
        - "#F08B49 0%"      # Bright orange
        - "#E07B39 50%"     # Primary
        - "#C06B29 100%"    # Deep orange
    
    accent_color: "#F5A862"
    text_color: "#FFFFFF"
    badge_glow: "rgba(245, 168, 98, 0.3)"
    
    mood: "Energy, entrepreneurship, taking action"
    illustration_tone: "Dynamic, startup energy, world-changing ideas"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 3: MIDJOURNEY PROMPT SYSTEM
# ═══════════════════════════════════════════════════════════════════════════════

## 🤖 AI Image Generation Prompts

### Base Prompt Structure

```yaml
prompt_structure:
  format: "[SCENE] [CHARACTERS] [STYLE] [MOOD] [TECHNICAL]"
  
  components:
    scene: "The main visual concept and setting"
    characters: "Who/what appears in the image"
    style: "Art style and rendering approach"
    mood: "Emotional tone and atmosphere"
    technical: "Aspect ratio, quality parameters"
```

### Universal Style Parameters

```yaml
universal_style:
  # These are added to ALL cover prompts
  
  art_style: |
    children's book illustration style,
    warm and inviting,
    professional quality,
    soft lighting,
    vibrant but not oversaturated colors,
    appealing to ages 5-11
  
  technical_params: |
    --ar 3:4
    --v 6
    --style raw
    --q 2
  
  negative_prompts: |
    scary, dark, violent, realistic photo,
    oversaturated, clipart, low quality,
    text, words, letters, watermark
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 4: INDIVIDUAL COVER SPECIFICATIONS
# ═══════════════════════════════════════════════════════════════════════════════

## 📚 Cover 1: My First Project

```yaml
cover_01:
  id: "wb-001"
  title: "My First Project"
  subtitle: "Your Journey Begins"
  grade: 2
  level: "OP"
  age: "5-6"
  color_scheme: "grade_2"  # Dark Blue
  
  # Content
  tagline: "✨ Every big idea starts with a first step ✨"
  badges: ["Age 5-6", "Grade 2", "Beginner"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A young child (diverse, gender-neutral) standing at the beginning
    of a colorful path that leads to a glowing lightbulb castle in the
    distance. The child holds a small notebook and pencil, looking
    excited. Small friendly icons float around: gears, stars, question
    marks, tools. The path is made of stepping stones with simple
    project symbols (drawing, building, presenting).
  
  # Midjourney Prompt
  midjourney_prompt: |
    A diverse young child standing excitedly at the start of a magical
    colorful pathway leading to a glowing castle made of lightbulbs and
    gears in the distance, the child holds a small notebook, floating
    friendly icons of stars and tools around them, stepping stones with
    project symbols, soft blue gradient sky background,
    
    children's book illustration style, warm and inviting, Pixar-inspired,
    soft lighting, magical atmosphere, professional quality,
    
    --ar 3:4 --v 6 --style raw --q 2
  
  # Nano Banana Alternative
  nano_banana_prompt: |
    Scene: Child at start of adventure path to lightbulb castle
    Style: Children's book, warm, magical
    Mood: Exciting, encouraging, first adventure
    Colors: Blue dominant, golden accents, soft pastels
    Elements: Notebook, floating icons, stepping stones
```

---

## 📚 Cover 2: Economics through Fairy Tales

```yaml
cover_02:
  id: "wb-002"
  title: "Economics through Fairy Tales"
  subtitle: "Kingdom of Finance Chronicles"
  grade: 3
  level: "1-2"
  age: "6-7"
  color_scheme: "grade_3"  # Dark Green
  
  # Content
  tagline: "✨ Where money meets magic ✨"
  badges: ["Age 6-7", "Grade 3", "Fall"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A magnificent fairy tale kingdom on rolling green hills with a
    grand castle. King Luminar (friendly king with golden crown) stands
    on a balcony with Owl Creatica (wise owl with glasses). In the
    foreground, Rabbit Moss and Squirrel Twig look up excitedly.
    Golden Luminar coins float magically in the air. A sparkling river
    winds through the scene. Market stalls visible in the village below.
  
  # Midjourney Prompt
  midjourney_prompt: |
    A magical fairy tale kingdom called Kingdom of Finance on lush green
    rolling hills, magnificent castle with a kind king wearing golden
    crown on the balcony next to a wise owl with tiny glasses, a rabbit
    and squirrel looking up excitedly in the foreground, golden coins
    floating magically in the air, sparkling river, village market below,
    
    enchanted storybook illustration style, warm golden hour lighting,
    Studio Ghibli inspired, lush greens and golds, magical sparkles,
    professional children's book quality,
    
    --ar 3:4 --v 6 --style raw --q 2
  
  # Character Reference
  characters_in_scene:
    - name: "King Luminar"
      description: "Kind middle-aged king, golden crown, purple robe"
      position: "balcony, center-top"
    - name: "Owl Creatica"
      description: "Wise owl, tiny glasses, warm brown feathers"
      position: "next to king"
    - name: "Rabbit Moss"
      description: "Energetic brown rabbit"
      position: "foreground left"
    - name: "Squirrel Twig"
      description: "Clever reddish squirrel"
      position: "foreground right"
```

---

## 📚 Cover 3: Financial Literacy

```yaml
cover_03:
  id: "wb-003"
  title: "Financial Literacy"
  subtitle: "Master Your Money"
  grade: 3
  level: "3"
  age: "6-7"
  color_scheme: "grade_3"  # Dark Green
  
  # Content
  tagline: "✨ Smart choices, bright futures ✨"
  badges: ["Age 6-7", "Grade 3", "Spring"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A cozy treehouse bank in an enchanted forest where friendly animal
    characters are learning about money. A wise owl banker explains
    things at a wooden counter. Children (diverse) and animal friends
    are engaged in activities: counting coins, putting money in a
    piggy bank treehouse, looking at a treasure map of savings goals.
    Golden coins and gem decorations. Warm, magical forest lighting.
  
  # Midjourney Prompt
  midjourney_prompt: |
    A magical treehouse bank in an enchanted forest, wise owl banker at
    wooden counter, diverse children and friendly animal characters
    learning about money together, activities like counting golden coins
    and using a piggy bank shaped like a mini treehouse, treasure map
    showing savings goals on the wall, warm forest lighting filtering
    through leaves, golden coins and gems as decoration,
    
    whimsical storybook illustration, warm and educational atmosphere,
    rich greens and golds, cozy and inviting, professional children's
    book quality, detailed but not cluttered,
    
    --ar 3:4 --v 6 --style raw --q 2
```

---

## 📚 Cover 4: Creative Problem-Solving

```yaml
cover_04:
  id: "wb-004"
  title: "Creative Problem-Solving"
  subtitle: "Think Different, Solve Smart"
  grade: 4
  level: "4"
  age: "7-8"
  color_scheme: "grade_4"  # Light Green
  
  # Content
  tagline: "✨ Every problem has a creative solution ✨"
  badges: ["Age 7-8", "Grade 4", "Fall"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A fantastical inventor's workshop where children work together to
    solve puzzles. Giant lightbulbs grow like plants. Gears and cogs
    float in the air forming solutions. A diverse group of kids are
    building something amazing with colorful blocks and tools. An
    inventor owl guides them. Chalkboards with creative diagrams.
    The room transforms from chaotic puzzle pieces on one side to
    beautiful solutions on the other.
  
  # Midjourney Prompt
  midjourney_prompt: |
    A magical inventor's workshop where giant lightbulbs grow like
    plants from the floor, diverse children working together building
    creative solutions with colorful blocks and tools, floating gears
    and cogs assembling in the air, wise inventor owl guiding them,
    chalkboards with creative diagrams, room transforms from puzzle
    pieces on left to beautiful solutions on right,
    
    whimsical invention illustration style, bright and inspiring,
    light greens and creative rainbow accents, sense of wonder and
    discovery, professional children's book quality, dynamic composition,
    
    --ar 3:4 --v 6 --style raw --q 2
```

---

## 📚 Cover 5: SMART-City Management

```yaml
cover_05:
  id: "wb-005"
  title: "SMART-City Management"
  subtitle: "Building Tomorrow Today"
  grade: 4
  level: "5"
  age: "7-8"
  color_scheme: "grade_4"  # Light Green
  
  # Content
  tagline: "✨ Design the city of your dreams ✨"
  badges: ["Age 7-8", "Grade 4", "Spring"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A beautiful futuristic eco-city where nature and technology blend
    perfectly. Buildings have green roofs with gardens. Solar panels
    and wind turbines power everything. Self-driving vehicles and
    drones deliver packages. Children are the city planners, standing
    at a holographic city planning table. Digital trees, smart traffic
    lights, and happy citizens. Clean, bright, optimistic future.
  
  # Midjourney Prompt
  midjourney_prompt: |
    A beautiful futuristic eco-friendly smart city where nature meets
    technology, buildings with green rooftop gardens, solar panels and
    wind turbines, self-driving vehicles and friendly delivery drones,
    diverse children as city planners around a holographic planning
    table, digital trees with screens, smart glowing traffic elements,
    happy citizens, clean bright optimistic atmosphere,
    
    futuristic children's illustration style, eco-tech aesthetic,
    light greens and soft blues, utopian and inspiring, professional
    quality, detailed cityscape, warm lighting,
    
    --ar 3:4 --v 6 --style raw --q 2
```

---

## 📚 Cover 6: My Company

```yaml
cover_06:
  id: "wb-006"
  title: "My Company"
  subtitle: "From Idea to Empire"
  grade: 5
  level: "6"
  age: "8-9"
  color_scheme: "grade_5"  # Burgundy
  
  # Content
  tagline: "✨ Your business adventure begins ✨"
  badges: ["Age 8-9", "Grade 5", "Fall"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A young entrepreneur (diverse child) standing proudly in front of
    their own magical shop/company. The shop is a charming building
    that's part treehouse, part professional business. A sign with the
    shop name glows warmly. Inside the window, you can see products
    being made. Animal assistants help run the shop. Customers (other
    kids and friendly animals) line up excitedly. The child holds a
    business plan scroll and wears a tiny CEO badge.
  
  # Midjourney Prompt
  midjourney_prompt: |
    A proud young diverse entrepreneur child standing in front of their
    own magical shop that's part charming treehouse part professional
    business, glowing shop sign, window showing products being made
    inside, friendly animal assistants helping run the shop, excited
    customers lining up including kids and animals, child holds business
    plan scroll wearing tiny CEO badge, warm burgundy and gold tones,
    
    charming business illustration style, entrepreneurial spirit,
    warm burgundy background with golden accents, professional yet
    playful, aspirational and encouraging, detailed storefront,
    
    --ar 3:4 --v 6 --style raw --q 2
```

---

## 📚 Cover 7: Customer Development

```yaml
cover_07:
  id: "wb-007"
  title: "Customer Development"
  subtitle: "Listen, Learn, Launch"
  grade: 5
  level: "7"
  age: "8-9"
  color_scheme: "grade_5"  # Burgundy
  
  # Content
  tagline: "✨ Understanding people, creating value ✨"
  badges: ["Age 8-9", "Grade 5", "Spring"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A diverse child entrepreneur conducting friendly interviews with
    various customers (mix of people and friendly animal characters).
    They have a clipboard and are genuinely listening. Speech bubbles
    with icons (hearts, stars, lightbulbs) show customer feedback.
    Behind them, a board shows customer journey maps with simple icons.
    The setting is a cozy market research café. Products transform
    based on feedback (simple before → improved after visual).
  
  # Midjourney Prompt
  midjourney_prompt: |
    A young diverse entrepreneur child with clipboard conducting
    friendly interviews with customers including people and friendly
    animals in a cozy market research café, speech bubbles with heart
    star and lightbulb icons showing feedback, customer journey map
    board in background, products shown transforming from simple to
    improved based on feedback, warm engaging atmosphere,
    
    business illustration style with warmth, burgundy and cream tones,
    conversational and friendly mood, professional children's book
    quality, story of listening and improving,
    
    --ar 3:4 --v 6 --style raw --q 2
```

---

## 📚 Cover 8: Internet of Things

```yaml
cover_08:
  id: "wb-008"
  title: "Internet of Things"
  subtitle: "Connect Everything"
  grade: 6
  level: "8"
  age: "9-10"
  color_scheme: "grade_6"  # Rose
  
  # Content
  tagline: "✨ A world where everything talks ✨"
  badges: ["Age 9-10", "Grade 6", "Fall"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A smart home of the future where everyday objects are connected
    and communicate. A diverse child stands in the center like a
    conductor, with glowing connection lines flowing from their hands
    to various smart devices. A friendly robot assistant, smart fridge
    that shows recipes, plants that signal when thirsty, pet feeder
    that activates automatically. All devices have cute "faces" and
    personality. Digital data streams flow beautifully between objects.
  
  # Midjourney Prompt
  midjourney_prompt: |
    A magical smart home where a diverse child stands like a conductor
    in the center with glowing connection lines flowing from hands to
    smart devices, friendly robot assistant, smart fridge showing
    recipes, plants with sensors signaling thirst, automatic pet feeder,
    all devices have cute friendly faces and personality, beautiful
    digital data streams flowing between objects, rose and teal accents,
    
    tech-forward children's illustration style, connected world
    aesthetic, rose pink and digital blue tones, futuristic but warm
    and friendly, professional quality, magical technology feeling,
    
    --ar 3:4 --v 6 --style raw --q 2
```

---

## 📚 Cover 9: My First App

```yaml
cover_09:
  id: "wb-009"
  title: "My First App"
  subtitle: "Code Your Dreams"
  grade: 6
  level: "9"
  age: "9-10"
  color_scheme: "grade_6"  # Rose
  
  # Content
  tagline: "✨ Build something amazing ✨"
  badges: ["Age 9-10", "Grade 6", "Spring"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A diverse child app developer sitting at a futuristic but friendly
    workspace. They're dragging colorful code blocks that float in the
    air to build an app. The app interface they're creating comes to
    life - characters and features pop out of the screen in 3D.
    Friendly code mascots (cute bug, pixel heart, function cat) help.
    Multiple device screens show the app working. Celebratory confetti
    as features complete.
  
  # Midjourney Prompt
  midjourney_prompt: |
    A young diverse child app developer at a futuristic friendly
    workspace, dragging colorful floating code blocks to build an app,
    the app interface comes alive with characters and features popping
    out of screen in 3D, cute code mascots helping including a friendly
    bug and pixel heart and function cat, multiple device screens
    showing the app, celebratory confetti, rose and purple gradient,
    
    digital creative illustration style, app development magic,
    rose pink and electric purple tones, inspiring and achievable,
    professional quality, coding made magical and fun,
    
    --ar 3:4 --v 6 --style raw --q 2
```

---

## 📚 Cover 10: Fundamentals of Entrepreneurship

```yaml
cover_10:
  id: "wb-010"
  title: "Fundamentals of Entrepreneurship"
  subtitle: "Launch Your Future"
  grade: 7
  level: "10"
  age: "10-11"
  color_scheme: "grade_7"  # Orange
  
  # Content
  tagline: "✨ The world needs your ideas ✨"
  badges: ["Age 10-11", "Grade 7", "Full Year"]
  
  # Hero Illustration Concept
  illustration_concept: |
    A powerful scene of young diverse entrepreneurs launching their
    ideas into the world. They stand on a launchpad platform, and their
    ideas (represented as glowing rockets, each unique) blast off into
    a sky full of possibilities. The sky shows faint images of what
    the ideas could become - businesses, inventions, helpful services.
    Other young entrepreneurs cheer them on. A mentor figure (wise owl
    in business attire) guides from the side. Confident, ambitious,
    world-changing energy.
  
  # Midjourney Prompt
  midjourney_prompt: |
    Young diverse entrepreneurs on a launchpad platform launching their
    ideas as unique glowing rockets into a sky full of possibilities,
    sky shows faint visions of future businesses inventions and services,
    other young entrepreneurs cheering, wise owl mentor in business
    attire guiding from side, confident ambitious world-changing energy,
    dynamic upward composition, orange and gold sunrise tones,
    
    inspirational business illustration style, startup energy,
    vibrant orange and golden tones, ambitious and achievable,
    professional quality, dynamic and powerful, aspirational,
    
    --ar 3:4 --v 6 --style raw --q 2
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 5: CSS COVER TEMPLATE
# ═══════════════════════════════════════════════════════════════════════════════

## 💻 Ready-to-Use CSS

```css
/* TISAVERSE COVER PAGE CSS */

.tisa-cover {
  width: 210mm;
  height: 297mm;
  position: relative;
  overflow: hidden;
  font-family: 'Quicksand', sans-serif;
}

/* Background with Level Color Gradient */
.tisa-cover--grade-2 { background: radial-gradient(ellipse at top center, #2E5A8F 0%, #1E3A5F 50%, #0E2A4F 100%); }
.tisa-cover--grade-3 { background: radial-gradient(ellipse at top center, #3D7A37 0%, #2D5A27 50%, #1D4A17 100%); }
.tisa-cover--grade-4 { background: radial-gradient(ellipse at top center, #5A9C69 0%, #4A7C59 50%, #3A6C49 100%); }
.tisa-cover--grade-5 { background: radial-gradient(ellipse at top center, #923F47 0%, #722F37 50%, #521F27 100%); }
.tisa-cover--grade-6 { background: radial-gradient(ellipse at top center, #D4637A 0%, #C4536A 50%, #A4435A 100%); }
.tisa-cover--grade-7 { background: radial-gradient(ellipse at top center, #F08B49 0%, #E07B39 50%, #C06B29 100%); }

/* Top Brand Bar */
.tisa-cover__brand-bar {
  position: absolute;
  top: 8mm;
  left: 15mm;
  right: 15mm;
  height: 15mm;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tisa-cover__logo {
  height: 12mm;
  width: auto;
}

.tisa-cover__brand-text {
  font-weight: 600;
  font-size: 10pt;
  color: #FFFFFF;
  letter-spacing: 0.2em;
}

.tisa-cover__level-badge {
  padding: 3mm 8mm;
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 6mm;
  font-size: 9pt;
  color: #FFFFFF;
}

/* Hero Illustration */
.tisa-cover__hero {
  position: absolute;
  top: 30mm;
  left: 20mm;
  right: 20mm;
  height: 140mm;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.tisa-cover__hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tisa-cover__hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 100%);
}

/* Title Zone */
.tisa-cover__title-zone {
  position: absolute;
  top: 175mm;
  left: 15mm;
  right: 15mm;
  text-align: center;
}

.tisa-cover__title {
  font-weight: 700;
  font-size: 32pt;
  color: #FFFFFF;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  letter-spacing: 0.02em;
  margin: 0;
}

.tisa-cover__subtitle {
  font-weight: 500;
  font-size: 14pt;
  color: rgba(255,255,255,0.9);
  margin-top: 5mm;
}

/* Info Badges */
.tisa-cover__badges {
  position: absolute;
  top: 225mm;
  left: 15mm;
  right: 15mm;
  display: flex;
  justify-content: center;
  gap: 15mm;
}

.tisa-cover__badge {
  padding: 4mm 10mm;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  font-weight: 600;
  font-size: 11pt;
  color: #FFFFFF;
}

/* World Tagline */
.tisa-cover__tagline {
  position: absolute;
  top: 250mm;
  left: 15mm;
  right: 15mm;
  text-align: center;
  font-family: 'Caveat', cursive;
  font-size: 16pt;
  color: rgba(255,255,255,0.85);
  font-style: italic;
}

/* Purple Foundation Bar - THE ANCHOR */
.tisa-cover__purple-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 18mm;
  background: #6B3FA0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15mm;
}

.tisa-cover__purple-bar-text {
  font-weight: 500;
  font-size: 8pt;
  color: rgba(255,255,255,0.8);
}

.tisa-cover__purple-bar-icon {
  width: 10mm;
  height: 10mm;
}
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 6: PROMPT CUSTOMIZATION GUIDE
# ═══════════════════════════════════════════════════════════════════════════════

## 🎯 How to Modify Prompts

### For Different Art Styles

```yaml
style_variations:
  
  # More Pixar-like
  pixar_style: |
    Add: "3D rendered, Pixar animation style, smooth surfaces, 
    expressive characters, cinematic lighting"
  
  # More Traditional Illustration
  traditional_style: |
    Add: "traditional watercolor illustration, hand-painted feel,
    soft brush strokes, classic children's book style"
  
  # More Modern/Flat
  modern_flat: |
    Add: "modern flat illustration style, clean shapes, 
    bold colors, geometric simplicity, vector art feel"
  
  # More Whimsical
  whimsical: |
    Add: "whimsical fantasy style, dreamy atmosphere,
    magical realism, soft glowing elements, ethereal"
```

### For Character Consistency

```yaml
character_consistency:
  # When generating multiple images with same characters
  
  king_luminar_reference: |
    "kind middle-aged king, warm expression, golden crown with 
    small gems, royal purple robe with gold trim, gentle eyes"
  
  owl_creatica_reference: |
    "wise owl, warm brown feathers with purple-blue hints,
    large kind eyes, tiny round glasses, thoughtful expression"
  
  # Add to any prompt needing these characters
```

### For Seasonal Variations

```yaml
seasonal_covers:
  # Same workbook, different seasonal editions
  
  fall_modifier: |
    Add: "autumn atmosphere, warm orange and red leaves falling,
    cozy golden lighting, harvest elements"
  
  spring_modifier: |
    Add: "spring atmosphere, cherry blossoms, fresh green buds,
    bright hopeful lighting, flowers blooming"
  
  winter_modifier: |
    Add: "winter atmosphere, soft snow, warm indoor glow,
    cozy scarves on characters, holiday sparkle"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION 7: QUICK REFERENCE
# ═══════════════════════════════════════════════════════════════════════════════

## 📋 All Covers at a Glance

| # | Title | Grade | Color | Key Visual Element |
|---|-------|-------|-------|-------------------|
| 1 | My First Project | 2 | 🔵 Dark Blue | Child at path to lightbulb castle |
| 2 | Economics Fairy Tales | 3 | 🟢 Dark Green | Kingdom with King & animal friends |
| 3 | Financial Literacy | 3 | 🟢 Dark Green | Treehouse bank in forest |
| 4 | Creative Problem-Solving | 4 | 🟩 Light Green | Inventor workshop with lightbulbs |
| 5 | SMART-City Management | 4 | 🟩 Light Green | Futuristic eco-city |
| 6 | My Company | 5 | 🔴 Burgundy | Child's magical shop |
| 7 | Customer Development | 5 | 🔴 Burgundy | Interview café scene |
| 8 | Internet of Things | 6 | 🌸 Rose | Connected smart home |
| 9 | My First App | 6 | 🌸 Rose | Code blocks building app |
| 10 | Entrepreneurship | 7 | 🟠 Orange | Ideas launching as rockets |

---

## 🎨 Color Quick Reference

| Grade | Primary Hex | Gradient Start | Gradient End |
|-------|-------------|----------------|--------------|
| 2 | `#1E3A5F` | `#2E5A8F` | `#0E2A4F` |
| 3 | `#2D5A27` | `#3D7A37` | `#1D4A17` |
| 4 | `#4A7C59` | `#5A9C69` | `#3A6C49` |
| 5 | `#722F37` | `#923F47` | `#521F27` |
| 6 | `#C4536A` | `#D4637A` | `#A4435A` |
| 7 | `#E07B39` | `#F08B49` | `#C06B29` |
| — | **TISA Purple Bar** | `#6B3FA0` | — |

---

*This Cover Generator provides everything needed to create consistent, 
beautiful covers across all 10 TISA MBA workbooks.*
