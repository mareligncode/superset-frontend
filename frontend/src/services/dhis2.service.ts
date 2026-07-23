import BaseService from './base.service';
import type { ApiResponse, QueryParams } from '@/types/api.types';

export interface DHIS2Indicator {
  id: string;
  name: string;
  displayName: string;
  code?: string;
  description?: string;
  value: number;
  period: string;
  orgUnit: string;
  orgUnitName: string;
  dataElement: string;
}

export interface DHIS2DataElement {
  id: string;
  name: string;
  displayName: string;
  code?: string;
  domainType: string;
  valueType: string;
  aggregationType: string;
}

export interface DHIS2OrgUnit {
  id: string;
  name: string;
  displayName: string;
  level: number;
  parent?: {
    id: string;
    name: string;
  };
  children?: DHIS2OrgUnit[];
}

export interface DHIS2AnalyticsRequest {
  indicators?: string[];
  dataElements?: string[];
  dimensions?: {
    dx?: string[]; // Data elements/indicators
    pe?: string[]; // Periods
    ou?: string[]; // Organisation units
  };
  filters?: {
    dx?: string[];
    pe?: string[];
    ou?: string[];
  };
  startDate?: string;
  endDate?: string;
}

export class DHIS2Service extends BaseService {
  private readonly BASE_PATH = '/dhis2';

  /**
   * Get analytics data from DHIS2
   */
  async getAnalytics(request: DHIS2AnalyticsRequest): Promise<ApiResponse<any>> {
    return this.post(`${this.BASE_PATH}/analytics`, request);
  }

  /**
   * Get indicator data by ID
   */
  async getIndicator(indicatorId: string, params?: QueryParams): Promise<ApiResponse<DHIS2Indicator>> {
    return this.get(`${this.BASE_PATH}/indicators/${indicatorId}`, params);
  }

  /**
   * Get multiple indicators
   */
  async getIndicators(params?: QueryParams): Promise<ApiResponse<DHIS2Indicator[]>> {
    return this.get(`${this.BASE_PATH}/indicators`, params);
  }

  /**
   * Get data element by ID
   */
  async getDataElement(elementId: string, params?: QueryParams): Promise<ApiResponse<DHIS2DataElement>> {
    return this.get(`${this.BASE_PATH}/dataElements/${elementId}`, params);
  }

  /**
   * Get multiple data elements
   */
  async getDataElements(params?: QueryParams): Promise<ApiResponse<DHIS2DataElement[]>> {
    return this.get(`${this.BASE_PATH}/dataElements`, params);
  }

  /**
   * Get organisation unit by ID
   */
  async getOrgUnit(orgUnitId: string, params?: QueryParams): Promise<ApiResponse<DHIS2OrgUnit>> {
    return this.get(`${this.BASE_PATH}/organisationUnits/${orgUnitId}`, params);
  }

  /**
   * Get organisation units with optional filtering
   */
  async getOrgUnits(params?: QueryParams): Promise<ApiResponse<DHIS2OrgUnit[]>> {
    return this.get(`${this.BASE_PATH}/organisationUnits`, params);
  }

  /**
   * Get data values for specific indicators and periods
   */
  async getDataValues(params: {
    dataElement?: string;
    indicator?: string;
    period?: string;
    orgUnit?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<any[]>> {
    return this.get(`${this.BASE_PATH}/dataValues`, params as QueryParams);
  }

  /**
   * Get family planning specific data
   */
  async getFamilyPlanningData(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/family-planning`, params as QueryParams);
  }

  /**
   * Get maternal health data
   */
  async getMaternalHealthData(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/maternal-health`, params as QueryParams);
  }

  /**
   * Get neonatal health data
   */
  async getNeonatalHealthData(params?: {
    region?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/neonatal-health`, params as QueryParams);
  }

  /**
   * Get regional health data
   */
  async getRegionalData(region: string, params?: QueryParams): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/regions/${region}`, params);
  }

  /**
   * Get summary statistics
   */
  async getSummaryStats(params?: {
    category?: string;
    region?: string;
  }): Promise<ApiResponse<any>> {
    return this.get(`${this.BASE_PATH}/summary`, params as QueryParams);
  }
}

export default new DHIS2Service();
