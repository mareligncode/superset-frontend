# Dark Mode Implementation Guide

## ✅ What's Implemented

The Ethiopian Ministry of Health Dashboard now has a **fully functional dark mode** with:

- **Automatic Theme Detection**: Respects system preference on first visit
- **Manual Toggle**: Click the theme toggle button in the header
- **Persistent**: Theme choice is saved to localStorage
- **Smooth Transitions**: All colors transition smoothly between themes
- **Accessible**: Maintains proper contrast ratios in both modes

## 🎨 How It Works

### 1. Theme Context (`src/contexts/ThemeContext.tsx`)
- Manages global theme state (light/dark)
- Saves preference to localStorage
- Applies `.dark` class to `<html>` element
- Provides `useTheme()` hook for components

### 2. Theme Toggle Component (`src/components/ui/ThemeToggle.tsx`)
- Simple button component that toggles theme
- Shows sun icon in dark mode, moon icon in light mode
- Used in the Header component

### 3. CSS Configuration (`src/index.css`)
Uses Tailwind CSS v4 `@theme` directive with:
- **Light mode colors** (default)
- **Dark mode colors** (in `.dark` class selector)
- **System preference** (using `@media (prefers-color-scheme: dark)`)

## 🚀 Usage

### Toggle Theme Programmatically

```typescript
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Check Current Theme

```typescript
const { theme } = useTheme();
// theme is either 'light' or 'dark'
```

### Set Specific Theme

```typescript
const { setTheme } = useTheme();
setTheme('dark'); // Force dark mode
setTheme('light'); // Force light mode
```

## 🎨 Color System

### Light Mode
- Background: `#f8f9ff` (Very light blue)
- Surface: `#f8f9ff` (Cards, panels)
- Text: `#0b1c30` (Dark blue)
- Primary: `#004482` (Ethiopian Ministry blue)

### Dark Mode
- Background: `#0b1c30` (Dark blue-gray)
- Surface: `#1a2332` (Slightly lighter for cards)
- Text: `#eaf1ff` (Light blue-white)
- Primary: `#a6c8ff` (Light blue for contrast)

## 📝 Adding Dark Mode to New Components

All Tailwind color utilities automatically support dark mode:

```tsx
<div className="bg-background text-on-surface">
  This automatically works in both light and dark mode!
</div>
```

### Custom Dark Mode Styles

```tsx
<div className="bg-white dark:bg-slate-800">
  White in light mode, dark gray in dark mode
</div>
```

## 🔧 Technical Details

### localStorage Key
Theme preference is stored in: `localStorage.getItem('theme')`

### HTML Class
Dark mode is activated by adding `.dark` class to `<html>` element

### CSS Variables
All theme colors use CSS custom properties that change with the theme:
- `var(--color-background)`
- `var(--color-on-surface)`
- `var(--color-primary)`
- etc.

## ✨ Features

- ✅ **Persistent**: Theme choice saved across sessions
- ✅ **System-aware**: Respects OS dark mode preference initially
- ✅ **Manual control**: Users can override system preference
- ✅ **Smooth transitions**: Colors transition smoothly
- ✅ **TypeScript**: Full type safety
- ✅ **Accessible**: Proper ARIA labels and keyboard navigation
- ✅ **Performance**: No layout shift or flash of wrong theme

## 🐛 Troubleshooting

### Theme doesn't persist
Check browser's localStorage is enabled

### Flash of wrong theme on load
ThemeProvider initializes before first render from localStorage

### Colors not changing
Ensure you're using the custom color classes (`bg-background`, `text-on-surface`, etc.)

## 📚 Files Modified

1. `src/contexts/ThemeContext.tsx` - Theme context provider
2. `src/components/ui/ThemeToggle.tsx` - Toggle button component
3. `src/index.css` - Dark mode colors and CSS variables
4. `src/App.tsx` - Wraps app in ThemeProvider
5. `src/components/layout/Header.tsx` - Includes ThemeToggle
6. `src/components/ui/index.ts` - Exports ThemeToggle

## 🎉 That's It!

Dark mode is fully functional and ready to use! Click the theme toggle button in the header to try it out.
