import apiClient from '@/config/api.config';
import type { ApiResponse, ApiError, QueryParams, DataFetchOptions } from '@/types/api.types';

export class BaseService {
  protected client = apiClient.getClient();

  protected async get<T>(
    endpoint: string,
    params?: QueryParams,
    _options?: DataFetchOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async post<T>(
    endpoint: string,
    data?: any,
    _options?: DataFetchOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async put<T>(
    endpoint: string,
    data?: any,
    _options?: DataFetchOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async patch<T>(
    endpoint: string,
    data?: any,
    _options?: DataFetchOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected async delete<T>(
    endpoint: string,
    _options?: DataFetchOptions
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  protected handleError(error: any): ApiError {
    if (error.response) {
      return {
        code: error.response.data?.code || 'API_ERROR',
        message: error.response.data?.message || error.message || 'An error occurred',
        details: error.response.data?.details,
        statusCode: error.response.status,
      };
    } else if (error.request) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error - unable to connect to server',
        statusCode: 0,
      };
    } else {
      return {
        code: 'REQUEST_ERROR',
        message: error.message || 'Request setup error',
        statusCode: 0,
      };
    }
  }

  protected buildQueryString(params: QueryParams): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          searchParams.append(key, JSON.stringify(value));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });
    
    return searchParams.toString();
  }
}

export default BaseService;
