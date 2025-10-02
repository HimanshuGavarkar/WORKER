class ApiService {
  private baseURL: string;
  private token: string | null = null;
  private timeout: number = 30000; // 30 seconds default timeout

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api';
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  setTimeout(timeout: number) {
    this.timeout = timeout;
  }

  private getHeaders(hasBody?: boolean): HeadersInit {
    const headers: HeadersInit = {};

    // Only set Content-Type for requests with body data
    if (hasBody) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Check if request has body data
    const hasBody = Boolean(options.body);
    
    const config: RequestInit = {
      headers: this.getHeaders(hasBody),
      ...options,
    };

    // Create timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        
        try {
          const errorText = await response.text();
          if (errorText) {
            errorMessage += `: ${errorText}`;
          } else {
            errorMessage += `: ${response.statusText}`;
          }
        } catch {
          errorMessage += `: ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // For non-JSON responses, try to parse as JSON, fallback to text
        try {
          const text = await response.text();
          return text ? JSON.parse(text) : {} as T;
        } catch {
          return {} as T;
        }
      }
    } catch (error) {
      // Handle timeout and other errors
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${this.timeout}ms`);
        }
      }
      console.error('API Request failed:', error);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Health check
  async healthCheck() {
    return this.get('/health');
  }
}

const apiService = new ApiService();
export default apiService;