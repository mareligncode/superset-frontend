// API and Data Fetching Types

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: ApiError;
  metadata?: ResponseMetadata;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  statusCode: number;
}

export interface ResponseMetadata {
  timestamp: Date;
  requestId: string;
  pagination?: PaginationMetadata;
  filters?: Record<string, any>;
}

export interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ApiRequest<T = any> {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: T;
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
  search?: string;
}

export interface DataFetchOptions {
  cache?: boolean;
  cacheTime?: number;
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
  enabled?: boolean;
}

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  description?: string;
  endpoint?: string;
  lastSync?: Date;
  status: 'active' | 'inactive' | 'syncing' | 'error';
}

export type DataSourceType = 'DHIS2' | 'EDHS' | 'HMIS' | 'Custom' | 'External';

export interface DataQuality {
  completeness: number;
  accuracy: number;
  timeliness: number;
  consistency: number;
  overall: number;
  lastAssessed: Date;
}

export interface ExportOptions {
  format: ExportFormat;
  includeHeaders?: boolean;
  includeFilters?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  fields?: string[];
}

export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'json';
