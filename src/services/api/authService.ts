import apiService from './apiService';
import type { User, AuthResponse, LoginCredentials } from '@/types';

export class AuthService {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials);
    
    // Store token in API service
    apiService.setAuthToken(response.token);
    
    // Store token in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } finally {
      // Clear tokens regardless of API response
      apiService.setAuthToken('');
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
      }
    }
  }

  // Refresh token
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem('refresh_token') 
      : null;
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiService.post<AuthResponse>('/auth/refresh', {
      refreshToken
    });

    // Update stored tokens
    apiService.setAuthToken(response.token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('refresh_token', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  }

  // Get current user
  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/auth/me');
  }

  // Verify token
  async verifyToken(): Promise<boolean> {
    try {
      await this.getCurrentUser();
      return true;
    } catch {
      return false;
    }
  }

  // Initialize auth from localStorage
  initializeAuth(): User | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        apiService.setAuthToken(token);
        try {
          return JSON.parse(userStr);
        } catch {
          // Invalid user data, clear storage
          this.logout();
        }
      }
    }
    return null;
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return apiService.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
  }
}

export const authService = new AuthService();