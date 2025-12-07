---
# ═══════════════════════════════════════════════════════════════════════════════
# 📚 WISDOM PATH — Lesson 2: Money
# ═══════════════════════════════════════════════════════════════════════════════

component_type: "glossary"
component_number: 2
block_name: "📚 Wisdom Path"
page_template: "glossary-path"

lesson:
  number: 2
  title: "Money"

layout:
  pages: 1
  term_count: 7
  path_style: "winding-forest"
  
design_notes:
  header_color: "#2D5A27"
  path_color: "#6DBF67"
  card_border: "#2D5A27"
---

# 📚 Wisdom Path

## Lesson 2 Glossary — Key Terms About Money

---

### 📍 Path Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  📚 WISDOM PATH — Lesson 2 Glossary                             │
│  ████████████████ DARK GREEN HEADER ████████████████████████████│
└─────────────────────────────────────────────────────────────────┘

  👑 START                                               🦉 Owl Guide
   │
   ▼
┌──────────────────┐
│ ① MONEY          │
│ 💰               │
│ Something we use │
│ to pay for things│
└────────┬─────────┘
         │
    ═════╧═════════════════════════╗
                                   ║
         ┌─────────────────────────╨┐
         │ ② BANKNOTES              │
         │ 💵                       │
         │ Paper money              │
         │ (like £10 or $5)         │
         └─────────────┬────────────┘
                       │
    ═══════════════════╧════╗
                            ║
┌───────────────────────────╨┐
│ ③ COINS                    │
│ 🪙                         │
│ Metal money                │
│ (like 1p, 50p, or €1)      │
└────────────┬───────────────┘       🐿️ Twig
             │
        ═════╧═══════════════════════════╗
                                         ║
              ┌──────────────────────────╨┐
              │ ④ GOODS                   │
              │ 📦                        │
              │ Things you can touch,     │
              │ like apples, books, toys  │
              └───────────┬───────────────┘
                          │
    ══════════════════════╧═══╗
                              ║
┌─────────────────────────────╨┐
│ ⑤ SERVICES                   │
│ 💇                           │
│ Things people do to help,    │
│ like doctors or barbers      │
└──────────────┬───────────────┘
               │
          ═════╧══════════════════════════╗
                                          ║
               ┌──────────────────────────╨┐
               │ ⑥ BANK                    │
               │ 🏦                        │
               │ A place to keep money     │      🐰 Moss
               │ safe & exchange it        │
               └───────────┬───────────────┘
                           │
    ═══════════════════════╧═════╗
                                 ║
┌────────────────────────────────╨┐
│ ⑦ CENTRAL BANK                  │
│ 🏛️                              │
│ The most important bank         │
│ — makes money & watches others  │
└─────────────────────────────────┘
   │
   ▼
  🏁 FINISH

┌─────────────────────────────────────────────────────────────────┐
│  ████████████████ TISA PURPLE BAR ██████████████████████████████│
│  [Logo]            Wisdom Path                   [pg 14] [●]    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📝 Term Definitions (Full)

### ① Money
**Definition:** Something we use to pay for things like toys, food, or clothes. It helps us buy and sell.

**Icon:** 💰
**Visual:** Stack of coins and notes together

---

### ② Banknotes
**Definition:** Paper money (like £10 or $5).

**Icon:** 💵
**Visual:** Colorful paper bills fanned out
**Example:** "The £20 note has Queen Elizabeth on it!"

---

### ③ Coins
**Definition:** Metal money (like 1p, 50p, or €1).

**Icon:** 🪙
**Visual:** Shiny gold and silver coins
**Example:** "I have three 50p coins in my piggy bank!"

---

### ④ Goods
**Definition:** Things you can touch or hold, like apples, books, or toys.

**Icon:** 📦
**Visual:** Collection of items — apple, book, teddy bear
**Example:** "The toy shop sells goods."

---

### ⑤ Services
**Definition:** Things people do to help others, like doctors making you feel better or barbers cutting your hair.

**Icon:** 💇
**Visual:** Doctor with stethoscope, barber with scissors
**Example:** "Fixing a bicycle is a service."

---

### ⑥ Bank
**Definition:** A place where you can keep your money safe, borrow money, or exchange it for money from another country.

**Icon:** 🏦
**Visual:** Bank building with columns and "BANK" sign
**Example:** "Mum keeps her savings at the bank."

---

### ⑦ Central Bank
**Definition:** The most important bank in the country. It makes money and keeps an eye on other banks.

**Icon:** 🏛️
**Visual:** Grand official building with flag
**Example:** "The Bank of England is the UK's central bank!"

---

## 💡 Bonus Knowledge Box

```
┌─────────────────────────────────────────────────────────────────┐
│  💱 DID YOU KNOW?                                               │
│                                                                 │
│  Every country has its own money (currency)!                    │
│                                                                 │
│  🇬🇧 United Kingdom → Pounds (£)                                │
│  🇺🇸 USA → Dollars ($)                                          │
│  🇪🇺 Eurozone → Euros (€)                                       │
│                                                                 │
│  If countries want to trade, they exchange their money!         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design Specifications

### Term Card Styling
```yaml
term_card:
  width: "70mm"
  height: "32mm"
  background: "#FFFFFF"
  border: "2px solid #2D5A27"
  border_radius: "8px"
  box_shadow: "0 2px 8px rgba(0,0,0,0.1)"
  
  number_badge:
    size: "10mm"
    background: "#2D5A27"
    color: "#FFFFFF"
    position: "top-left, offset -5mm"
  
  icon:
    size: "12mm"
    position: "right side"
  
  term_name:
    font: "Quicksand Bold"
    size: "11pt"
    color: "#2D5A27"
  
  definition:
    font: "Open Sans"
    size: "9pt"
    color: "#36454F"
```

### Path Styling
```yaml
path:
  stroke: "#6DBF67"
  stroke_width: "6px"
  stroke_dasharray: "none"
  style: "curved, playful"
  
  connector_dots:
    size: "8px"
    color: "#2D5A27"
```

### Character Decorations
```yaml
characters:
  king_luminar:
    position: "top-left, at START"
    size: "25mm"
    pose: "pointing forward"
  
  owl_guide:
    position: "top-right"
    size: "20mm"
    pose: "flying with scroll"
  
  squirrel_twig:
    position: "middle-right, near BANK"
    size: "18mm"
    pose: "holding coin"
  
  rabbit_moss:
    position: "bottom-right, near CENTRAL BANK"
    size: "18mm"
    pose: "with money bag"
```

---

## ✅ Learning Outcomes

After completing the Wisdom Path, students can:
- [ ] Define what money is
- [ ] Name two types of money (coins and banknotes)
- [ ] Explain the difference between goods and services
- [ ] Describe what a bank does
- [ ] Know what a central bank is

---

*Component: 02-glossary.md | Lesson 2: Money | Wisdom Path*
