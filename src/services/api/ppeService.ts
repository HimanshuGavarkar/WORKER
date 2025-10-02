import apiService from './apiService';
import type { PPEVerificationResult, PPEItemStatus } from '@/types';

export class PPEService {
  // Start PPE verification process
  async startVerification(workerId: string, gate: string): Promise<{ sessionId: string }> {
    return apiService.post('/ppe/verification/start', { workerId, gate });
  }

  // Submit PPE verification result
  async submitVerification(verificationData: PPEVerificationResult): Promise<PPEVerificationResult> {
    return apiService.post<PPEVerificationResult>('/ppe/verification/submit', verificationData);
  }

  // Get PPE verification by worker and date
  async getVerification(workerId: string, date?: string): Promise<PPEVerificationResult[]> {
    const endpoint = `/ppe/verification/${workerId}${date ? `?date=${date}` : ''}`;
    return apiService.get<PPEVerificationResult[]>(endpoint);
  }

  // Verify individual PPE item using vision AI
  async verifyPPEItem(
    sessionId: string, 
    itemId: string, 
    imageData: string
  ): Promise<PPEItemStatus> {
    return apiService.post<PPEItemStatus>('/ppe/vision/verify', {
      sessionId,
      itemId,
      imageData
    });
  }

  // Verify PPE item using RFID
  async verifyRFIDItem(sessionId: string, rfidData: string): Promise<PPEItemStatus> {
    return apiService.post<PPEItemStatus>('/ppe/rfid/verify', {
      sessionId,
      rfidData
    });
  }

  // Get PPE compliance report
  async getComplianceReport(
    startDate: string, 
    endDate: string, 
    workerId?: string
  ): Promise<unknown> {
    const params = new URLSearchParams({
      startDate,
      endDate,
      ...(workerId && { workerId })
    });
    return apiService.get(`/ppe/compliance/report?${params.toString()}`);
  }

  // Get PPE violation statistics
  async getViolationStats(period: 'daily' | 'weekly' | 'monthly'): Promise<unknown> {
    return apiService.get(`/ppe/violations/stats?period=${period}`);
  }

  // Manual override for PPE verification
  async manualOverride(
    sessionId: string, 
    reason: string, 
    overriddenBy: string
  ): Promise<PPEVerificationResult> {
    return apiService.post<PPEVerificationResult>('/ppe/verification/override', {
      sessionId,
      reason,
      overriddenBy
    });
  }
}

export const ppeService = new PPEService();