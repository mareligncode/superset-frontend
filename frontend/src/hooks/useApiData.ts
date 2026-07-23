import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse, ApiError } from '@/types/api.types';

interface UseApiDataOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

interface UseApiDataResult<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export function useApiData<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiDataOptions = {}
): UseApiDataResult<T> {
  const { enabled = true, refetchInterval, onSuccess, onError } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiCall();
      setData(response.data);
      onSuccess?.(response.data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      onError?.(apiError);
    } finally {
      setLoading(false);
    }
  }, [apiCall, enabled, onSuccess, onError]);

  useEffect(() => {
    fetchData();

    if (refetchInterval && refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refetchInterval]);

  return { data, loading, error, refetch: fetchData };
}

export default useApiData;
