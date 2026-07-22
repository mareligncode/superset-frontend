// Chart color palettes optimized for accessibility
export const CHART_COLORS = {
  primary: '#004482',
  secondary: '#006a60',
  tertiary: '#005011',
  error: '#ba1a1a',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#0ea5e9',
  purple: '#8b5cf6',
  pink: '#ec4899',
  orange: '#f97316',
} as const;

// Categorical palette for data visualization (6 colors)
export const CATEGORICAL_PALETTE = [
  '#005cab', // Blue
  '#006a60', // Teal
  '#005011', // Green
  '#f59e0b', // Amber
  '#f97316', // Orange
  '#8b5cf6', // Purple
] as const;

// Sequential palette for heatmaps and gradients
export const SEQUENTIAL_PALETTE = {
  blue: ['#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
  green: ['#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
  red: ['#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d'],
} as const;

// Diverging palette for comparison data
export const DIVERGING_PALETTE = [
  '#ba1a1a', // Negative (Red)
  '#f87171',
  '#fca5a5',
  '#e5e7eb', // Neutral (Gray)
  '#6ee7b7',
  '#34d399',
  '#10b981', // Positive (Green)
] as const;

// Regional color mapping for Ethiopian regions
export const REGIONAL_COLORS = {
  'Addis Ababa': '#004482',
  'Afar': '#006a60',
  'Amhara': '#005011',
  'Benishangul Gumuz': '#8b5cf6',
  'Central Ethiopia': '#f59e0b',
  'Dire Dawa': '#ec4899',
  'Gambela': '#0ea5e9',
  'Harari': '#f97316',
  'Oromia': '#10b981',
  'Sidama': '#ba1a1a',
  'Somali': '#7c3aed',
  'South West': '#14b8a6',
  'Southern Nations': '#f59e0b',
  'Tigray': '#3b82f6',
} as const;
