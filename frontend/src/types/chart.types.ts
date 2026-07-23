export interface LineChartData {
  type: 'line';
  labels: string[];
  datasets: LineDataset[];
}

export interface LineDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor?: string;
  fill?: boolean;
  tension?: number;
  borderWidth?: number;
  pointRadius?: number;
  pointBackgroundColor?: string;
}

export interface BarChartData {
  type: 'bar';
  labels: string[];
  datasets: BarDataset[];
}

export interface BarDataset {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  borderRadius?: number;
  barThickness?: number;
  maxBarThickness?: number;
}

export interface DonutChartData {
  type: 'donut';
  labels: string[];
  datasets: DonutDataset[];
}

export interface DonutDataset {
  data: number[];
  backgroundColor: string[];
  borderColor?: string[];
  borderWidth?: number;
  hoverOffset?: number;
}

export interface TreeMapData {
  type: 'treemap';
  items: TreeMapItem[];
}

export interface TreeMapItem {
  label: string;
  value: number;
  color: string;
  percentage?: number;
  children?: TreeMapItem[];
}

export interface HeatmapData {
  type: 'heatmap';
  xLabels: string[];
  yLabels: string[];
  values: number[][];
  colorScale: string[];
}

export interface GaugeData {
  type: 'gauge';
  value: number;
  min: number;
  max: number;
  thresholds: GaugeThreshold[];
  unit?: string;
}

export interface GaugeThreshold {
  value: number;
  color: string;
  label?: string;
}

export interface ChartLegend {
  items: LegendItem[];
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface LegendItem {
  label: string;
  color: string;
  value?: number | string;
  percentage?: number;
}

export interface ChartTooltip {
  title: string;
  value: number | string;
  label?: string;
  color?: string;
  additionalInfo?: string;
}

export interface TimeSeriesData {
  timestamp: Date;
  value: number;
  label?: string;
}

export interface ComparativeData {
  current: number;
  previous: number;
  change: number;
  changePercentage: number;
  period: string;
}
