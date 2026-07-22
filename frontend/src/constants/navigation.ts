import { ROUTES } from './routes';

export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}

// Primary Categories (Level 1 Tabs)
export const PRIMARY_CATEGORIES = [
  'Services Delivery',
  'Health Equity',
  'Health Work Force',
  'Health Financing',
  'Supply and Logistics',
  'Blood Donation',
  'PHEM',
  'Infrastructure',
  'PHC',
  'Digital Systems Monitoring',
];

// Services Delivery Sub-categories (Level 2 Tabs)
export const SERVICES_DELIVERY_TABS = [
  { label: 'Family Planning', path: ROUTES.FAMILY_PLANNING },
  { label: 'Maternal', path: ROUTES.MATERNAL_HEALTH },
  { label: 'Neonatal', path: ROUTES.NEONATAL_HEALTH },
  { label: 'NCD', path: ROUTES.NCD },
  { label: 'Malaria', path: ROUTES.MALARIA },
  { label: 'HIV', path: ROUTES.HIV },
  { label: 'TB', path: ROUTES.TB },
];

// Main navigation menu
export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    label: 'Home',
    path: ROUTES.HOME,
    icon: 'home',
  },
  {
    label: 'Dashboards',
    path: ROUTES.DASHBOARDS,
    icon: 'dashboard',
    children: [
      {
        label: 'Services Delivery',
        path: ROUTES.SERVICES_DELIVERY,
        children: SERVICES_DELIVERY_TABS,
      },
      {
        label: 'Health Equity',
        path: ROUTES.HEALTH_EQUITY,
      },
      {
        label: 'Health Workforce',
        path: ROUTES.HEALTH_WORKFORCE,
      },
      {
        label: 'Health Financing',
        path: ROUTES.HEALTH_FINANCING,
      },
      {
        label: 'Supply & Logistics',
        path: ROUTES.SUPPLY_LOGISTICS,
      },
      {
        label: 'Blood Donation',
        path: ROUTES.BLOOD_DONATION,
      },
      {
        label: 'PHEM',
        path: ROUTES.PHEM,
      },
      {
        label: 'Infrastructure',
        path: ROUTES.INFRASTRUCTURE,
      },
      {
        label: 'PHC',
        path: ROUTES.PHC,
      },
      {
        label: 'Digital Systems',
        path: ROUTES.DIGITAL_SYSTEMS,
      },
    ],
  },
  {
    label: 'Charts',
    path: ROUTES.CHARTS,
    icon: 'bar_chart',
  },
];

// Dashboard page metadata
export const DASHBOARD_METADATA = {
  [ROUTES.FAMILY_PLANNING]: {
    title: 'Family Planning Dashboard',
    description: 'Contraceptive acceptance rates and family planning metrics',
    category: 'Services Delivery',
  },
  [ROUTES.MATERNAL_HEALTH]: {
    title: 'Maternal Health Dashboard',
    description: 'Maternal health indicators and outcomes',
    category: 'Services Delivery',
  },
  [ROUTES.NEONATAL_HEALTH]: {
    title: 'Neonatal Health Dashboard',
    description: 'Neonatal health metrics and survival rates',
    category: 'Services Delivery',
  },
  [ROUTES.NCD]: {
    title: 'Non-Communicable Diseases Dashboard',
    description: 'NCD prevalence and management indicators',
    category: 'Services Delivery',
  },
  [ROUTES.MALARIA]: {
    title: 'Malaria Dashboard',
    description: 'Malaria cases, treatment, and prevention metrics',
    category: 'Services Delivery',
  },
  [ROUTES.HIV]: {
    title: 'HIV/AIDS Dashboard',
    description: 'HIV prevalence, testing, and treatment indicators',
    category: 'Services Delivery',
  },
  [ROUTES.TB]: {
    title: 'Tuberculosis Dashboard',
    description: 'TB case detection and treatment outcomes',
    category: 'Services Delivery',
  },
  [ROUTES.HEALTH_EQUITY]: {
    title: 'Health Equity Dashboard',
    description: 'Health equity indicators and disparities analysis',
    category: 'Health Equity',
  },
  [ROUTES.HEALTH_WORKFORCE]: {
    title: 'Health Workforce Dashboard',
    description: 'Healthcare worker distribution and capacity',
    category: 'Health Work Force',
  },
  [ROUTES.HEALTH_FINANCING]: {
    title: 'Health Financing Dashboard',
    description: 'Health expenditure and financial protection metrics',
    category: 'Health Financing',
  },
  [ROUTES.SUPPLY_LOGISTICS]: {
    title: 'Supply and Logistics Dashboard',
    description: 'Medical supplies and logistics chain management',
    category: 'Supply and Logistics',
  },
  [ROUTES.BLOOD_DONATION]: {
    title: 'Blood Donation Dashboard',
    description: 'Blood collection, storage, and transfusion data',
    category: 'Blood Donation',
  },
  [ROUTES.PHEM]: {
    title: 'PHEM Dashboard',
    description: 'Public Health Emergency Management indicators',
    category: 'PHEM',
  },
  [ROUTES.INFRASTRUCTURE]: {
    title: 'Infrastructure Dashboard',
    description: 'Health facility infrastructure and resources',
    category: 'Infrastructure',
  },
  [ROUTES.PHC]: {
    title: 'Primary Health Care Dashboard',
    description: 'Primary healthcare service delivery metrics',
    category: 'PHC',
  },
  [ROUTES.DIGITAL_SYSTEMS]: {
    title: 'Digital Systems Monitoring Dashboard',
    description: 'Health information systems and digital health monitoring',
    category: 'Digital Systems Monitoring',
  },
} as const;
