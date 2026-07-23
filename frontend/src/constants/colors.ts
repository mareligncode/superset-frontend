// Premium chart color palettes optimized for accessibility and government branding
export const CHART_COLORS = {
  primary: '#005CB8',      
  secondary: '#00796B',    
  tertiary: '#00701A',     
  error: '#C62828',        
  warning: '#F57C00',      
  success: '#2E7D32',     
  info: '#0288D1',         
  purple: '#8b5cf6',      
  pink: '#ec4899',        
  orange: '#f97316',      
  indigo: '#4f46e5',      
  cyan: '#06b6d4',        
} as const;

// Enhanced categorical palette for data visualization (12 colors)
export const CATEGORICAL_PALETTE = [
  '#005CB8', 
  '#00796B', 
  '#00701A', 
  '#F57C00', 
  '#8b5cf6', 
  '#0288D1', 
  '#C62828',
  '#ec4899', 
  '#2E7D32', 
  '#4f46e5',
  '#f97316', 
  '#06b6d4', 
] as const;

// Professional sequential palettes for heatmaps and gradients
export const SEQUENTIAL_PALETTE = {
  blue: ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0'],
  green: ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32'],
  red: ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828'],
  teal: ['#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c'],
  purple: ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a'],
} as const;

// Enhanced diverging palette for comparison data
export const DIVERGING_PALETTE = [
  '#C62828', 
  '#e57373',
  '#ef9a9a',
  '#e0e0e0', 
  '#81c784',
  '#66bb6a',
  '#2E7D32', 
] as const;

// Regional color mapping for Ethiopian regions — refined and distinct
export const REGIONAL_COLORS = {
  'Addis Ababa': '#005CB8',      
  'Afar': '#00796B',              
  'Amhara': '#2E7D32',            
  'Benishangul Gumuz': '#8b5cf6', 
  'Central Ethiopia': '#F57C00',  
  'Dire Dawa': '#ec4899',         
  'Gambela': '#0288D1',          
  'Harari': '#f97316',            
  'Oromia': '#4caf50',            
  'Sidama': '#C62828',            
  'Somali': '#4f46e5',            
  'South West': '#14b8a6',        
  'Southern Nations': '#fbbf24',  
  'Tigray': '#3b82f6',            
} as const;

// Status colors for badges and indicators
export const STATUS_COLORS = {
  success: '#2E7D32',
  warning: '#F57C00',
  error: '#C62828',
  info: '#0288D1',
  neutral: '#6B7280',
} as const;

// Gradient definitions for premium visual effects
export const GRADIENTS = {
  primaryBlue: 'linear-gradient(135deg, #005CB8 0%, #0288D1 100%)',
  healthGreen: 'linear-gradient(135deg, #2E7D32 0%, #4caf50 100%)',
  warningAmber: 'linear-gradient(135deg, #F57C00 0%, #fbbf24 100%)',
  errorRed: 'linear-gradient(135deg, #C62828 0%, #ef5350 100%)',
  purpleViolet: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
  oceanTeal: 'linear-gradient(135deg, #00796B 0%, #14b8a6 100%)',
} as const;
