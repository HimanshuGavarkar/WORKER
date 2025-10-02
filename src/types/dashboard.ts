export interface DashboardStats {
  totalWorkers: number;
  currentlyInside: number;
  todayEntries: number;
  complianceRate: number;
  violations: number;
  activeAlerts: number;
}

export interface ComplianceReport {
  id: string;
  period: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  totalVerifications: number;
  compliantVerifications: number;
  complianceRate: number;
  topViolations: ViolationType[];
  repeatOffenders: Worker[];
  safetyChampions: Worker[];
}

export interface ViolationType {
  ppeItem: string;
  count: number;
  percentage: number;
}

export interface Alert {
  id: string;
  type: 'violation' | 'system' | 'emergency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  workerId?: string;
  gate?: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface NotificationSettings {
  sms: boolean;
  email: boolean;
  push: boolean;
  sound: boolean;
  vibration: boolean;
  alertTypes: Alert['type'][];
}