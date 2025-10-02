import apiService from './apiService';
import type { DashboardStats, ComplianceReport, Alert } from '@/types';

export class DashboardService {
  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    return apiService.get<DashboardStats>('/dashboard/stats');
  }

  // Get compliance report
  async getComplianceReport(
    period: 'daily' | 'weekly' | 'monthly',
    startDate?: string,
    endDate?: string
  ): Promise<ComplianceReport> {
    const params = new URLSearchParams({ period });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    return apiService.get<ComplianceReport>(`/dashboard/compliance?${params.toString()}`);
  }

  // Get active alerts
  async getActiveAlerts(): Promise<Alert[]> {
    return apiService.get<Alert[]>('/dashboard/alerts');
  }

  // Acknowledge alert
  async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<Alert> {
    return apiService.post<Alert>(`/dashboard/alerts/${alertId}/acknowledge`, {
      acknowledgedBy
    });
  }

  // Get real-time gate status
  async getGateStatus(): Promise<unknown> {
    return apiService.get('/dashboard/gates/status');
  }

  // Get recent verification activities
  async getRecentActivities(limit = 10): Promise<unknown[]> {
    return apiService.get(`/dashboard/activities?limit=${limit}`);
  }

  // Export compliance data
  async exportComplianceData(
    format: 'excel' | 'pdf' | 'csv',
    startDate: string,
    endDate: string
  ): Promise<Blob> {
    const params = new URLSearchParams({
      format,
      startDate,
      endDate
    });
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/export?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Export failed');
    }
    
    return response.blob();
  }
}

export const dashboardService = new DashboardService();