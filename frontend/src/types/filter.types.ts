export interface FilterState {
  year: string;
  quarter?: string;
  month?: string;
  regions: string[];
  facilities?: string[];
  dataSource?: string;
  ageGroup?: string[];
  gender?: string;
  dateRange?: DateRange;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string;
}

export interface RegionOption extends FilterOption {
  children?: RegionOption[];
  isExpanded?: boolean;
  isChecked?: boolean;
  isIndeterminate?: boolean;
}

export interface FilterConfig {
  id: string;
  type: FilterType;
  label: string;
  placeholder?: string;
  options?: FilterOption[];
  defaultValue?: any;
  required?: boolean;
  multiple?: boolean;
}

export type FilterType =
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'daterange'
  | 'text'
  | 'number'
  | 'tree';

export interface EthiopianRegion {
  name: string;
  code: string;
  population: number;
  zones?: Zone[];
}

export interface Zone {
  name: string;
  code: string;
  woredas?: Woreda[];
}

export interface Woreda {
  name: string;
  code: string;
  facilities?: HealthFacility[];
}

export interface HealthFacility {
  id: string;
  name: string;
  type: FacilityType;
  level: FacilityLevel;
  region: string;
  zone?: string;
  woreda?: string;
  status: 'operational' | 'under-construction' | 'closed';
}

export type FacilityType =
  | 'hospital'
  | 'health-center'
  | 'health-post'
  | 'clinic'
  | 'specialized-hospital';

export type FacilityLevel =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary';

export const ETHIOPIAN_REGIONS: string[] = [
  'Addis Ababa City Administration',
  'Afar Region',
  'Amhara Region',
  'Benishangul Gumuz Region',
  'Central Ethiopian Region',
  'Dire Dawa City Administration',
  'Gambela Region',
  'Harari Region',
  'Oromia Region',
  'Sidama Region',
  'Somali Region',
  'South West Ethiopia Region',
  'Southern Nations Region',
  'Tigray Region',
];

export const ETHIOPIAN_MONTHS: string[] = [
  'meskerem',
  'tikimt',
  'hidar',
  'tahsas',
  'tir',
  'yekatit',
  'megabit',
  'miazia',
  'ginbot',
  'sene',
  'hamle',
  'nehase',
  'pagume',
];
