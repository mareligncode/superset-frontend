import BaseService from './base.service';
import type { ApiResponse, QueryParams } from '@/types/api.types';

export interface HealthIndicator {
  id: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  target?: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  dataSource: 'DHIS2' | 'EDHS' | 'HMIS' | 'Custom';
  region?: string;
}

export interface KPIMetric {
  id: string;
  title: string;
  value: number | string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change?: number;
  target?: number;
  category: string;
}

export interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'donut' | 'treemap';
  data: any[];
  metadata?: {
    xAxis?: string;
    yAxis?: string[];
    categories?: string[];
    series?: string[];
  };
}

export class HealthService extends BaseService {
  private readonly BASE_PATH = '/health';

  /**
   * Get KPI metrics for dashboard
   */
  async getKPIMetrics(params?: {
    category?: string;
    region?: string;
    period?: string;
  }): Promise<ApiResponse<KPIMetric[]>> {
    return this.get(`${this.BASE_PATH}/kpi`, params as QueryParams);
  }

  /**
   * Get health indicators
   */
  async getIndicators(params?: QueryParams): Promise<ApiResponse<HealthIndicator[]>> {
    return this.get(`${this.BASE_PATH}/indicators`, params);
  }

  /**
   * Get indicator by ID
   */
  async getIndicator(indicatorId: string): Promise<ApiResponse<HealthIndicator>> {
    return this.get(`${this.BASE_PATH}/indicators/${indicatorId}`);
  }

  /**
   * Get chart data for specific visualization
   */
  async getChartData(chartId: string, params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<ChartData>> {
    return this.get(`${this.BASE_PATH}/charts/${chartId}`, params as QueryParams);
  }

  /**
   * Get family planning indicators
   */
  async getFamilyPlanningIndicators(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<HealthIndicator[]>> {
    return this.get(`${this.BASE_PATH}/family-planning`, params as QueryParams);
  }

  /**
   * Get maternal health indicators
   */
  async getMaternalHealthIndicators(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<HealthIndicator[]>> {
    return this.get(`${this.BASE_PATH}/maternal-health`, params as QueryParams);
  }

  /**
   * Get neonatal health indicators
   */
  async getNeonatalHealthIndicators(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<HealthIndicator[]>> {
    return this.get(`${this.BASE_PATH}/neonatal-health`, params as QueryParams);
  }

  /**
   * Get NCD indicators
   */
  async getNCDIndicators(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<HealthIndicator[]>> {
    return this.get(`${this.BASE_PATH}/ncd`, params as QueryParams);
  }

  /**
   * Get malaria indicators
   */
  async getMalariaIndicators(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<HealthIndicator[]>> {
    return this.get(`${this.BASE_PATH}/malaria`, params as QueryParams);
  }

  /**
   * Get HIV indicators
   */
  async getHIVIndicators(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<HealthIndicator[]>> {
    return this.get(`${this.BASE_PATH}/hiv`, params as QueryParams);
  }

  /**
   * Get TB indicators
   */
  async getTBIndicators(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<HealthIndicator[]>> {
    return this.get(`${this.BASE_PATH}/tb`, params as QueryParams);
  }

  /**
   * Get regional health data
   */
  async getRegionalData(region: string, params?: QueryParams): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/regions/${region}`, params);
  }

  /**
   * Get all regions data
   */
  async getAllRegionsData(params?: QueryParams): Promise<ApiResponse<any[]>> {
    return this.get(`${this.BASE_PATH}/regions`, params);
  }

  /**
   * Get health equity data
   */
  async getHealthEquityData(params?: {
    region?: string;
    indicator?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/equity`, params as QueryParams);
  }

  /**
   * Get health workforce data
   */
  async getHealthWorkforceData(params?: {
    region?: string;
    category?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/workforce`, params as QueryParams);
  }

  /**
   * Get health financing data
   */
  async getHealthFinancingData(params?: {
    region?: string;
    year?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/financing`, params as QueryParams);
  }

  /**
   * Get supply and logistics data
   */
  async getSupplyLogisticsData(params?: {
    region?: string;
    category?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/supply-logistics`, params as QueryParams);
  }

  /**
   * Get blood donation data
   */
  async getBloodDonationData(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/blood-donation`, params as QueryParams);
  }

  /**
   * Get PHEM data
   */
  async getPHEMData(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/phem`, params as QueryParams);
  }

  /**
   * Get infrastructure data
   */
  async getInfrastructureData(params?: {
    region?: string;
    category?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/infrastructure`, params as QueryParams);
  }

  /**
   * Get PHC data
   */
  async getPHCData(params?: {
    region?: string;
    category?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/phc`, params as QueryParams);
  }

  /**
   * Get digital systems monitoring data
   */
  async getDigitalSystemsData(params?: {
    region?: string;
    system?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/digital-systems`, params as QueryParams);
  }

  /**
   * Export data in various formats
   */
  async exportData(params: {
    format: 'csv' | 'xlsx' | 'pdf' | 'json';
    indicators?: string[];
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Blob> {
    const response = await this.client.post(`${this.BASE_PATH}/export`, params, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export default new HealthService();
