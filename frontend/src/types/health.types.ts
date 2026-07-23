export interface HealthIndicator {
  id: string;
  name: string;
  code: string;
  category: IndicatorCategory;
  value: number;
  target?: number;
  unit: string;
  period: string;
  dataSource: string;
  trend: 'up' | 'down' | 'stable';
  status: 'on-track' | 'at-risk' | 'off-track';
}

export type IndicatorCategory =
  | 'maternal-health'
  | 'child-health'
  | 'neonatal-health'
  | 'family-planning'
  | 'ncd'
  | 'communicable-diseases'
  | 'health-workforce'
  | 'health-financing'
  | 'health-infrastructure'
  | 'health-equity';

export interface MaternalHealthIndicator extends HealthIndicator {
  category: 'maternal-health';
  metrics: {
    antenatalVisits?: number;
    skilledBirthAttendance?: number;
    maternalMortalityRatio?: number;
    postnatalCare?: number;
  };
}

export interface ChildHealthIndicator extends HealthIndicator {
  category: 'child-health';
  ageGroup: '0-5' | '5-12' | '12-18';
  metrics: {
    vaccinationCoverage?: number;
    stunting?: number;
    wasting?: number;
    underweight?: number;
  };
}

export interface NCDIndicator extends HealthIndicator {
  category: 'ncd';
  diseaseType: 'diabetes' | 'hypertension' | 'cancer' | 'respiratory' | 'cardiovascular';
  metrics: {
    prevalence?: number;
    screeningCoverage?: number;
    treatmentCoverage?: number;
    controlRate?: number;
  };
}

export interface CommunicableDiseaseIndicator extends HealthIndicator {
  category: 'communicable-diseases';
  diseaseType: 'malaria' | 'hiv' | 'tb' | 'covid-19' | 'other';
  metrics: {
    incidence?: number;
    prevalence?: number;
    mortalityRate?: number;
    testingCoverage?: number;
    treatmentSuccess?: number;
  };
}

export interface FamilyPlanningIndicator extends HealthIndicator {
  category: 'family-planning';
  metrics: {
    contraceptivePrevalence?: number;
    modernMethodUse?: number;
    unmetNeed?: number;
    newAcceptors?: number;
    continuingUsers?: number;
  };
}

export interface HealthWorkforceMetrics {
  totalWorkers: number;
  doctors: number;
  nurses: number;
  midwives: number;
  healthOfficers: number;
  density: number; // per 10,000 population
  distribution: {
    urban: number;
    rural: number;
  };
  vacancyRate: number;
  attritionRate: number;
}

export interface HealthFinancingMetrics {
  totalExpenditure: number;
  perCapitaExpenditure: number;
  governmentShare: number;
  donorShare: number;
  householdShare: number;
  gdpPercentage: number;
}

export interface HealthFacilityMetrics {
  totalFacilities: number;
  byType: {
    hospitals: number;
    healthCenters: number;
    healthPosts: number;
    clinics: number;
  };
  byLevel: {
    primary: number;
    secondary: number;
    tertiary: number;
  };
  operational: number;
  underConstruction: number;
}

export interface BloodDonationMetrics {
  totalDonations: number;
  voluntaryDonations: number;
  replacementDonations: number;
  byBloodType: {
    'O+': number;
    'O-': number;
    'A+': number;
    'A-': number;
    'B+': number;
    'B-': number;
    'AB+': number;
    'AB-': number;
  };
  stockLevel: 'adequate' | 'low' | 'critical';
  transfusions: number;
}

export interface PHEMMetrics {
  activeOutbreaks: number;
  casesFatigues: number;
  deaths: number;
  responseTime: number; // hours
  alertsReceived: number;
  alertsInvestigated: number;
  emergencyPreparednessScore: number;
}
