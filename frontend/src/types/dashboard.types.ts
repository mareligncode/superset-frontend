// Dashboard Types

export type DashboardCategory =
  | 'Services Delivery'
  | 'Health Equity'
  | 'Health Work Force'
  | 'Health Financing'
  | 'Supply and Logistics'
  | 'Blood Donation'
  | 'PHEM'
  | 'Infrastructure'
  | 'PHC'
  | 'Digital Systems Monitoring';

export type DashboardSubCategory =
  | 'Family Planning'
  | 'Maternal'
  | 'Neonatal'
  | 'NCD'
  | 'Malaria'
  | 'HIV'
  | 'TB';

export interface DashboardMetadata {
  id: string;
  title: string;
  description: string;
  category: DashboardCategory;
  subCategory?: DashboardSubCategory;
  lastUpdated: Date;
  dataSource: string;
  reportingPeriod: string;
}

export interface DashboardCard {
  id: string;
  title: string;
  subtitle?: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  trend?: number[];
  unit?: string;
  icon?: string;
  color?: string;
}

export interface DashboardChart {
  id: string;
  type: ChartType;
  title: string;
  subtitle?: string;
  data: ChartData;
  options?: ChartOptions;
}

export type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'area'
  | 'scatter'
  | 'treemap'
  | 'heatmap'
  | 'gauge';

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    tooltip?: {
      enabled?: boolean;
    };
  };
  scales?: {
    x?: {
      display?: boolean;
      grid?: {
        display?: boolean;
      };
    };
    y?: {
      display?: boolean;
      grid?: {
        display?: boolean;
      };
    };
  };
}

export interface DashboardData {
  metadata: DashboardMetadata;
  cards: DashboardCard[];
  charts: DashboardChart[];
  tables?: DashboardTable[];
}

export interface DashboardTable {
  id: string;
  title: string;
  columns: TableColumn[];
  rows: TableRow[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalRows: number;
  };
}

export interface TableColumn {
  id: string;
  header: string;
  accessor: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableRow {
  id: string;
  [key: string]: any;
}
