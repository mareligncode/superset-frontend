import { useApiData } from './useApiData';
import healthService from '@/services/health.service';
import type { HealthIndicator, KPIMetric, ChartData } from '@/services/health.service';

export function useKPIMetrics(params?: {
  category?: string;
  region?: string;
  period?: string;
}) {
  return useApiData<KPIMetric[]>(
    () => healthService.getKPIMetrics(params as any),
    { enabled: true }
  );
}

export function useHealthIndicators(params?: {
  category?: string;
  region?: string;
}) {
  return useApiData<HealthIndicator[]>(
    () => healthService.getIndicators(params as any),
    { enabled: true }
  );
}

export function useFamilyPlanningData(params?: {
  region?: string;
  startDate?: string;
  endDate?: string;
}) {
  return useApiData<HealthIndicator[]>(
    () => healthService.getFamilyPlanningIndicators(params as any),
    { enabled: true }
  );
}

export function useMaternalHealthData(params?: {
  region?: string;
  startDate?: string;
  endDate?: string;
}) {
  return useApiData<HealthIndicator[]>(
    () => healthService.getMaternalHealthIndicators(params as any),
    { enabled: true }
  );
}

export function useNeonatalHealthData(params?: {
  region?: string;
  startDate?: string;
  endDate?: string;
}) {
  return useApiData<HealthIndicator[]>(
    () => healthService.getNeonatalHealthIndicators(params as any),
    { enabled: true }
  );
}

export function useChartData(chartId: string, params?: {
  region?: string;
  startDate?: string;
  endDate?: string;
}) {
  return useApiData<ChartData>(
    () => healthService.getChartData(chartId, params as any),
    { enabled: !!chartId }
  );
}

export function useRegionalData(region: string) {
  return useApiData<any>(
    () => healthService.getRegionalData(region),
    { enabled: !!region }
  );
}

export default {
  useKPIMetrics,
  useHealthIndicators,
  useFamilyPlanningData,
  useMaternalHealthData,
  useNeonatalHealthData,
  useChartData,
  useRegionalData,
};
