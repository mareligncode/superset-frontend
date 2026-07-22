# Project Structure

This document outlines the folder structure and organization of the Ethiopian Ministry of Health Dashboard Application.

## Directory Overview

```
src/
├── assets/              # Static assets (images, icons, fonts)
├── components/          # React components
│   ├── charts/         # Chart components (LineChart, BarChart, DonutChart, TreeMap)
│   ├── layout/         # Layout components (Header, Sidebar, Footer, TabNavigation, FilterPanel)
│   └── ui/             # Reusable UI components (Button, Card, Select, Checkbox, etc.)
├── constants/           # Application constants (routes, colors, navigation menus)
├── contexts/            # React Context providers (Theme, Auth, Filter contexts)
├── data/                # Mock data and data fixtures
├── hooks/               # Custom React hooks
├── layouts/             # Page layout wrappers (MainLayout, DashboardLayout)
├── pages/               # Page components (one per route)
├── routes/              # Routing configuration
├── services/            # API services and data fetching logic
├── types/               # TypeScript type definitions and interfaces
└── utils/               # Utility functions (formatters, validators, helpers)
```

## Detailed Structure

### `/components`
Contains all React components organized by functionality:
- **`/charts`**: Specialized chart components for data visualization
- **`/layout`**: Structural components that define page layout
- **`/ui`**: Atomic, reusable UI components following DRY principles

### `/constants`
Application-wide constants including:
- Navigation menu configurations
- Route definitions
- Color palettes
- Dashboard categories

### `/contexts`
React Context providers for:
- Global state management
- Theme toggling
- Filter state
- User authentication

### `/data`
Mock data for development:
- Dashboard statistics
- Regional health data
- Chart data fixtures
- Ethiopian Ministry of Health sample data

### `/hooks`
Custom React hooks:
- `useFilters` - Filter state management
- `useTheme` - Theme toggling
- `useDashboardData` - Data fetching and caching
- `useMediaQuery` - Responsive design helpers

### `/layouts`
Page layout wrappers:
- `MainLayout` - Standard layout with header, sidebar, and footer
- `DashboardLayout` - Dashboard-specific layout with filters

### `/pages`
Page-level components (one per route):
- Home/Overview page
- Services Delivery dashboards
- Health Equity dashboard
- Health Workforce dashboard
- Health Financing dashboard
- Supply & Logistics dashboard
- Blood Donation dashboard
- PHEM dashboard
- Infrastructure dashboard
- PHC dashboard
- Digital Systems Monitoring dashboard
- Specific disease/condition dashboards (Maternal, Neonatal, NCD, Malaria, HIV, TB)

### `/routes`
Routing configuration:
- Route definitions
- Protected routes
- Lazy loading configuration
- Route guards

### `/services`
API and data services:
- API client configuration
- Data fetching functions
- Cache management
- Error handling

### `/types`
TypeScript definitions:
- Dashboard data types
- Filter types
- User types
- Chart data types
- API response types

### `/utils`
Utility functions:
- Date formatters
- Number formatters
- Data validators
- Helper functions

## Component Naming Conventions

- **PascalCase** for component files: `Button.tsx`, `DashboardCard.tsx`
- **camelCase** for utility files: `formatters.ts`, `validators.ts`
- **kebab-case** for style files: `button.module.css`
- **SCREAMING_SNAKE_CASE** for constants: `API_ROUTES.ts`

## Import Order

Maintain consistent import order:
1. React and external libraries
2. Internal components
3. Types and interfaces
4. Utilities and helpers
5. Constants
6. Styles

Example:
```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card } from '@/components/ui';
import { Header } from '@/components/layout';

import type { DashboardData } from '@/types';

import { formatNumber } from '@/utils';
import { ROUTES } from '@/constants';

import './Dashboard.css';
```

## Best Practices

1. **One component per file**
2. **Co-locate related files** (component, styles, tests)
3. **Use index files** for clean exports
4. **Keep components small** (< 300 lines)
5. **Use TypeScript strict mode**
6. **Avoid deep nesting** (max 3-4 levels)
7. **Document complex logic** with comments
8. **Follow DRY principles** (Don't Repeat Yourself)

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **React Icons** - Icons
