import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tisa-purple': '#6B3FA0',
        'tisa-gold': '#D4AF37',
        'tisa-cream': '#F5F5DC',
        'tisa-charcoal': '#36454F',
      },
      fontSize: {
        'body': '11pt',
        'story': '12pt',
      },
      spacing: {
        'mm-4': '4mm',
        'mm-8': '8mm',
        'mm-12': '12mm',
        'mm-16': '16mm',
        'mm-24': '24mm',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        crimson: ['Crimson Text', 'serif'],
        caveat: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
