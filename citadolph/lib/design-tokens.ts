/**
 * Design Tokens - Single source of truth for all design values
 * Following Swiss/International Typographic Style principles
 */

export const colors = {
  // Brand Colors
  accent: {
    red: '#E4002B',
    redHover: '#C40026',
    blue: '#004AAC',
    blueHover: '#003D8F',
  },

  // Semantic Colors (Light Mode)
  light: {
    paper: '#FFFFFF',
    paperAlt: '#FAFAFA',
    ink: '#111315',
    inkMuted: '#4A4A4A',
    border: '#E0E0E0',
    overlay: 'rgba(0, 0, 0, 0.08)',
  },

  // Semantic Colors (Dark Mode)
  dark: {
    paper: '#0A0A0A',
    paperAlt: '#111111',
    ink: '#F5F5F5',
    inkMuted: '#A0A0A0',
    border: '#333333',
    overlay: 'rgba(255, 255, 255, 0.08)',
  },

  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const typography = {
  fontFamilies: {
    sans: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
    mono: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace',
    display: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
  },

  fontSizes: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '32px',
    '5xl': '48px',
    '6xl': '64px',
    '7xl': '96px',
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    // Baseline-locked values (multiples of 8px)
    baseline: '24px',  // 3 * 8px
    baselineSm: '20px',
    baselineLg: '32px', // 4 * 8px
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
    mono: '0.15em',
  },
} as const;

export const spacing = {
  // Baseline-locked spacing scale (multiples of 8px)
  0: '0',
  1: '4px',   // 0.5 * baseline
  2: '8px',   // 1 * baseline
  3: '12px',  // 1.5 * baseline
  4: '16px',  // 2 * baseline
  5: '20px',  // 2.5 * baseline
  6: '24px',  // 3 * baseline (1 leading)
  8: '32px',  // 4 * baseline
  10: '40px', // 5 * baseline
  12: '48px', // 6 * baseline (2 leading)
  16: '64px', // 8 * baseline
  20: '80px', // 10 * baseline
  24: '96px', // 12 * baseline
  32: '128px', // 16 * baseline
} as const;

export const borderRadius = {
  none: '0',
  sm: '4px',      // Inputs, buttons
  md: '8px',      // Cards, panels
  lg: '12px',     // Modals, larger surfaces
  full: '9999px', // Pills, badges
} as const;

export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',    // Resting cards
  md: '0 4px 12px rgba(0, 0, 0, 0.1)',    // Hover elevation
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',   // Modals, dropdowns
  xl: '0 16px 48px rgba(0, 0, 0, 0.15)',  // Large overlays
  accent: '0 4px 16px rgba(228, 0, 43, 0.3)', // Accent-colored shadows
} as const;

export const transitions = {
  fast: '80ms ease',
  normal: '150ms ease',
  slow: '250ms ease',
  slower: '350ms ease',
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  gridOverlay: 9999,
} as const;