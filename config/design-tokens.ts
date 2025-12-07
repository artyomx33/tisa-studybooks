/**
 * TISAverse Studybooks Design Tokens
 *
 * Central configuration for all design system values including colors,
 * typography, spacing, and page dimensions.
 *
 * NO FALLBACKS: All values must be explicitly defined.
 */

// TISA Brand Colors
export const TISA_COLORS = {
  purple: '#6B3FA0',
  gold: '#D4AF37',
  cream: '#F5F5DC',
  charcoal: '#36454F',
} as const;

// Level Colors (by grade) - Primary colors for workbook themes
export const LEVEL_COLORS = {
  grade_2: {
    primary: '#1E3A5F',
    light: '#2E5A8F',
    dark: '#0E2A4F',
    accent: '#4A90D9',
  },
  grade_3: {
    primary: '#2D5A27',
    light: '#3D7A37',
    dark: '#1D4A17',
    accent: '#6DBF67',
  },
  grade_4: {
    primary: '#4A7C59',
    light: '#5A9C69',
    dark: '#3A6C49',
    accent: '#8FBF9A',
  },
  grade_5: {
    primary: '#722F37',
    light: '#923F47',
    dark: '#521F27',
    accent: '#C4536A',
  },
  grade_6: {
    primary: '#C4536A',
    light: '#D4637A',
    dark: '#A4435A',
    accent: '#E89AAB',
  },
  grade_7: {
    primary: '#E07B39',
    light: '#F08B49',
    dark: '#C06B29',
    accent: '#F5A862',
  },
} as const;

// Owl System Colors - Each owl type has its own color scheme
export const OWL_COLORS = {
  remembery: {
    color: '#7EB8DA',
    bg: '#EBF5FB',
    name: 'Remembery',
    description: 'Memory & Recall',
  },
  intellecta: {
    color: '#8B5CF6',
    bg: '#F3E8FF',
    name: 'Intellecta',
    description: 'Understanding & Analysis',
  },
  practica: {
    color: '#4A7C59',
    bg: '#E8F5E9',
    name: 'Practica',
    description: 'Real-world Application',
  },
  deducta: {
    color: '#6B7280',
    bg: '#F3F4F6',
    name: 'Deducta',
    description: 'Logic & Problem-solving',
  },
  critica: {
    color: '#F59E0B',
    bg: '#FEF3C7',
    name: 'Critica',
    description: 'Evaluation & Debate',
  },
  creatica: {
    color: '#EC4899', // Primary color for solid contexts
    gradient: 'linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)',
    bg: '#FDF2F8',
    name: 'Creatica',
    description: 'Creative Expression',
  },
} as const;

// Typography - Font families for different contexts
export const FONTS = {
  display: 'Quicksand, sans-serif',     // Headers, titles
  body: 'Open Sans, sans-serif',        // Body text
  story: 'Crimson Text, serif',         // Narrative content
  accent: 'Caveat, cursive',            // Handwritten feel
} as const;

// Font Sizes (in rem for responsive scaling)
export const FONT_SIZES = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
} as const;

// Spacing (4mm base unit, converted to rem for screen, mm for print)
export const SPACING = {
  xs: '0.25rem',   // ~4mm at standard DPI
  sm: '0.5rem',    // ~8mm
  md: '0.75rem',   // ~12mm
  lg: '1rem',      // ~16mm
  xl: '1.5rem',    // ~24mm
  '2xl': '2rem',   // ~32mm
  '3xl': '3rem',   // ~48mm
} as const;

// Print-specific spacing (in mm)
export const PRINT_SPACING = {
  xs: '4mm',
  sm: '8mm',
  md: '12mm',
  lg: '16mm',
  xl: '24mm',
  '2xl': '32mm',
  '3xl': '48mm',
} as const;

// A4 Page Dimensions
export const PAGE_DIMENSIONS = {
  width: '210mm',
  height: '297mm',
  margin: '15mm',
  contentWidth: '180mm',      // 210 - (15*2)
  contentHeight: '262mm',     // 297 - 15 - 20 (for purple bar)
  purpleBarHeight: '18mm',
  headerHeight: '35mm',

  // Screen equivalents (for preview, ~96dpi)
  screenWidth: '794px',       // 210mm * 3.78
  screenHeight: '1123px',     // 297mm * 3.78
  screenMargin: '57px',       // 15mm * 3.78
  screenContentWidth: '680px', // 180mm * 3.78
  screenPurpleBarHeight: '68px', // 18mm * 3.78
  screenHeaderHeight: '132px',   // 35mm * 3.78
} as const;

// Border Radii
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',  // 2px
  md: '0.25rem',   // 4px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  full: '9999px',
} as const;

// Shadows
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// Z-Index Scale
export const Z_INDEX = {
  base: 0,
  header: 10,
  navigation: 20,
  modal: 30,
  tooltip: 40,
  purpleBar: 50,
} as const;

// Animation Durations
export const ANIMATION = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

// XP Rewards for Workbook Completion
export const XP_REWARDS = {
  story: 5,
  glossary: 5,
  task_remembery: 10,
  task_intellecta: 15,
  task_practica: 15,
  task_deducta: 15,
  task_critica: 15,
  task_creatica: 20,
  test: 25,
  mindmap: 10,
  homework: 20,
  assessment: 15,
  sticker: 5,
} as const;

// Page Types - All valid component types
export const PAGE_TYPES = [
  'story',
  'glossary',
  'task_remembery',
  'task_intellecta',
  'task_practica',
  'task_deducta',
  'task_critica',
  'task_creatica',
  'test',
  'mindmap',
  'homework',
  'assessment',
  'sticker',
] as const;

// Assessment Types
export const ASSESSMENT_TYPES = [
  'ladder',
  'orange-slices',
  'steps',
  'plus-arrow',
  'thermometer',
] as const;

// Combined Design Tokens Export
export const DESIGN_TOKENS = {
  tisa: TISA_COLORS,
  levels: LEVEL_COLORS,
  owls: OWL_COLORS,
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  spacing: SPACING,
  printSpacing: PRINT_SPACING,
  page: PAGE_DIMENSIONS,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  zIndex: Z_INDEX,
  animation: ANIMATION,
  xpRewards: XP_REWARDS,
  pageTypes: PAGE_TYPES,
  assessmentTypes: ASSESSMENT_TYPES,
} as const;

// Type exports
export type TisaColor = keyof typeof TISA_COLORS;
export type GradeLevel = keyof typeof LEVEL_COLORS;
export type OwlType = keyof typeof OWL_COLORS;
export type PageType = typeof PAGE_TYPES[number];
export type AssessmentType = typeof ASSESSMENT_TYPES[number];

export default DESIGN_TOKENS;
