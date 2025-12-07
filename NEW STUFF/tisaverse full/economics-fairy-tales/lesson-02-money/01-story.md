---
# ═══════════════════════════════════════════════════════════════════════════════
# 🏰 KINGDOM CHRONICLE — Lesson 2: Money
# ═══════════════════════════════════════════════════════════════════════════════

component_type: "story"
component_number: 1
block_name: "🏰 Kingdom Chronicle"
page_template: "story-split"

lesson:
  number: 2
  title: "Money"
  
layout:
  pages: 2
  page_1: "letter-scroll"
  page_2: "story-continuation"
  
design_notes:
  header_color: "#2D5A27"
  illustration_style: "enchanted-kingdom"
  story_background: "#FDF8F3"
---

# 🏰 Kingdom Chronicle

## The Mystery of the Missing Money

---

### 📜 PAGE 1: Letter from King Luminar

```
┌─────────────────────────────────────────────────────────────────┐
│  🏰 KINGDOM CHRONICLE                      [Lesson 2 Badge]     │
│  ████████████████ DARK GREEN HEADER ████████████████████████████│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [ILLUSTRATION: King Luminar at his desk, looking worried,      │
│   writing a letter. Through the window, we see market chaos     │
│   with people trying to trade goods directly]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─ LETTER SCROLL STYLING ─────────────────────────────────────────┐
│                                                                 │
│   📜 Letter from King Luminar                                   │
│                                                                 │
│   Dear Friend,                                                  │
│                                                                 │
│   You and Owl Creatica have been a great help to me and         │
│   to the Kingdom of Finance. However, a new crisis has          │
│   arrived, and I need your brilliant mind once again!           │
│                                                                 │
│   All the money in the kingdom has disappeared. No one          │
│   can buy or sell anything, and the Royal Treasury is           │
│   completely empty!                                             │
│                                                                 │
│   The people are trying something called "barter" —             │
│   trading goods directly with each other. But it's              │
│   causing terrible confusion!                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  ████████████████ TISA PURPLE BAR ██████████████████████████████│
│  [Logo]           Kingdom Chronicle              [pg 12] [●]    │
└─────────────────────────────────────────────────────────────────┘
```

---

### 📜 PAGE 2: The Problem with Barter

```
┌─────────────────────────────────────────────────────────────────┐
│  🏰 KINGDOM CHRONICLE                      [Lesson 2 Badge]     │
│  ████████████████ DARK GREEN HEADER ████████████████████████████│
└─────────────────────────────────────────────────────────────────┘

┌─ LETTER SCROLL CONTINUES ───────────────────────────────────────┐
│                                                                 │
│   For example:                                                  │
│                                                                 │
│   • Apple sellers are offering two apples for one egg,          │
│     while egg sellers are demanding three apples!               │
│                                                                 │
│   • The baker wants milk for bread, but the farmer              │
│     doesn't need bread — he wants shoes!                        │
│                                                                 │
│   • Nobody can agree on anything, and everyone is               │
│     getting very frustrated.                                    │
│                                                                 │
│   I need your brilliant mind to help restore balance            │
│   and peace in the kingdom.                                     │
│                                                                 │
│   Please write back with your ideas about what this             │
│   "money" thing is and how it could help us!                    │
│                                                                 │
│                                     Yours sincerely,            │
│                                     👑 King Luminar             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [ILLUSTRATION: Chaotic market scene showing:                   │
│   - Woman with apples trying to trade with man with eggs        │
│   - Baker holding bread, farmer with milk, cobbler with shoes   │
│   - Everyone looking confused with question marks above heads   │
│   - Speech bubbles showing "2 apples = 1 egg??" "3 apples!"]    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  ████████████████ TISA PURPLE BAR ██████████████████████████████│
│  [Logo]           Kingdom Chronicle              [pg 13] [●]    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📖 Story Text (Clean Version)

### Letter from King Luminar

> Dear Friend,
>
> You and Owl Creatica have been a great help to me and to the Kingdom of Finance. However, a new crisis has arrived, and I need your brilliant mind once again!
>
> All the money in the kingdom has disappeared. No one can buy or sell anything, and the Royal Treasury is completely empty!
>
> The people are trying something called "barter" — trading goods directly with each other. But it's causing terrible confusion!
>
> For example:
> - Apple sellers are offering two apples for one egg, while egg sellers are demanding three apples!
> - The baker wants milk for bread, but the farmer doesn't need bread — he wants shoes!
> - Nobody can agree on anything, and everyone is getting very frustrated.
>
> I need your brilliant mind to help restore balance and peace in the kingdom.
>
> Please write back with your ideas about what this "money" thing is and how it could help us!
>
> *Yours sincerely,*
> *King Luminar*

---

## 🎨 Illustration Specifications

### Illustration 1: King at Desk
```yaml
illustration_1:
  scene: "King Luminar at royal desk"
  elements:
    - King Luminar looking worried but hopeful
    - Fancy quill pen and parchment
    - Window showing distant market chaos
    - Royal seal and candle on desk
    - Empty treasure chest visible in corner
  style: "Warm interior, golden candlelight"
  mood: "Concerned but not scary"
  size: "Full-width, 75mm height"
```

### Illustration 2: Barter Chaos
```yaml
illustration_2:
  scene: "Village market in chaos"
  elements:
    - Woman with basket of apples (confused expression)
    - Man with basket of eggs (frustrated expression)
    - Baker with bread loaf
    - Farmer with milk jug
    - Cobbler with shoes
    - Question marks and confusion symbols
    - Speech bubbles: "2 for 1?" "No, 3!"
  style: "Comedic chaos, bright colors"
  mood: "Humorous confusion, not distressing"
  size: "Full-width, 70mm height"
```

---

## 🔧 Design Implementation

### Letter Scroll Styling
```css
.letter-scroll {
  background: linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%);
  border: 2px solid #D4AF37;
  border-radius: 8px;
  padding: 12mm;
  font-family: 'Caveat', cursive;
  font-size: 13pt;
  line-height: 1.7;
  color: #5D4E37;
  position: relative;
}

.letter-scroll::before,
.letter-scroll::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: #D4AF37;
  border-radius: 50%;
}

.letter-scroll::before { top: -10px; left: 50%; transform: translateX(-50%); }

.letter-signature {
  text-align: right;
  font-style: italic;
  margin-top: 10mm;
}
```

---

## ✅ Learning Connections

**This story introduces:**
- The problem with barter (no common measure of value)
- Why money is useful (makes trading easier)
- The concept of exchange and trade

**Discussion prompts after reading:**
1. "Why was everyone confused in the market?"
2. "What would make trading easier?"
3. "What could we use instead of trading apples for eggs directly?"

---

*Component: 01-story.md | Lesson 2: Money | Kingdom Chronicle*
