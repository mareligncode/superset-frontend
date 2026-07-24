import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const API_TIMEOUT = parseInt(
  import.meta.env.VITE_API_TIMEOUT || "30000",
  10
);

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token if available
        const token = localStorage.getItem("authToken");

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        config.headers["X-Request-ID"] = this.generateRequestId();

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;

          switch (status) {
            case 401:
              localStorage.removeItem("authToken");
              window.location.href = "/login";
              break;

            case 403:
              console.error("Access forbidden");
              break;

            case 404:
              console.error("Resource not found");
              break;

            case 500:
              console.error("Internal server error");
              break;

            default:
              console.error("API error:", error.response.data);
          }
        } else if (error.request) {
          console.error("Network error - no response received");
        } else {
          console.error("Request setup error:", error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  public getClient(): AxiosInstance {
    return this.client;
  }

  public setAuthToken(token: string): void {
    this.client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;

    localStorage.setItem("authToken", token);
  }

  public clearAuthToken(): void {
    delete this.client.defaults.headers.common["Authorization"];
    localStorage.removeItem("authToken");
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

export default apiClient;