export const ROUTES = {
  HOME: '/',
  DASHBOARDS: '/dashboards',
  CHARTS: '/charts',
  
  FAMILY_PLANNING: '/dashboards/family-planning',
  MATERNAL_HEALTH: '/dashboards/maternal-health',
  NEONATAL_HEALTH: '/dashboards/neonatal-health',
  
  NCD: '/dashboards/ncd',
  MALARIA: '/dashboards/malaria',
  HIV: '/dashboards/hiv',
  TB: '/dashboards/tb',
  
  HEALTH_EQUITY: '/dashboards/health-equity',
  HEALTH_WORKFORCE: '/dashboards/health-workforce',
  HEALTH_FINANCING: '/dashboards/health-financing',
  SUPPLY_LOGISTICS: '/dashboards/supply-logistics',
  BLOOD_DONATION: '/dashboards/blood-donation',
  PHEM: '/dashboards/phem',
  INFRASTRUCTURE: '/dashboards/infrastructure',
  PHC: '/dashboards/phc',
  DIGITAL_SYSTEMS: '/dashboards/digital-systems',
  SERVICES_DELIVERY: '/dashboards/services-delivery',
  
  PRIVACY: '/privacy',
  TERMS: '/terms',
  DATA_GOVERNANCE: '/data-governance',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
