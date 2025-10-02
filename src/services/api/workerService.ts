import apiService from './apiService';
import type { Worker, WorkerVerificationLog, WorkerStats } from '@/types';

export class WorkerService {
  // Get all workers
  async getWorkers(): Promise<Worker[]> {
    return apiService.get<Worker[]>('/workers');
  }

  // Get worker by ID
  async getWorkerById(workerId: string): Promise<Worker> {
    return apiService.get<Worker>(`/workers/${workerId}`);
  }

  // Create new worker
  async createWorker(workerData: Omit<Worker, 'id'>): Promise<Worker> {
    return apiService.post<Worker>('/workers', workerData);
  }

  // Update worker
  async updateWorker(workerId: string, workerData: Partial<Worker>): Promise<Worker> {
    return apiService.put<Worker>(`/workers/${workerId}`, workerData);
  }

  // Delete worker
  async deleteWorker(workerId: string): Promise<void> {
    return apiService.delete<void>(`/workers/${workerId}`);
  }

  // Get worker verification logs
  async getWorkerLogs(workerId: string, limit?: number): Promise<WorkerVerificationLog[]> {
    const endpoint = `/workers/${workerId}/logs${limit ? `?limit=${limit}` : ''}`;
    return apiService.get<WorkerVerificationLog[]>(endpoint);
  }

  // Get worker statistics
  async getWorkerStats(): Promise<WorkerStats> {
    return apiService.get<WorkerStats>('/workers/stats');
  }

  // Search workers
  async searchWorkers(query: string): Promise<Worker[]> {
    return apiService.get<Worker[]>(`/workers/search?q=${encodeURIComponent(query)}`);
  }
}

export const workerService = new WorkerService();