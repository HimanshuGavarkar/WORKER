export interface Worker {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  shift: 'morning' | 'afternoon' | 'night';
  role: string;
  contactNumber: string;
  emergencyContact: string;
  rfidCard?: string;
  profileImage?: string;
  status: 'active' | 'inactive' | 'on-leave';
  lastEntryTime?: Date;
  complianceScore: number;
  violationCount: number;
}

export interface WorkerVerificationLog {
  id: string;
  workerId: string;
  timestamp: Date;
  gate: string;
  verificationResult: 'compliant' | 'non-compliant' | 'partial';
  missingPPE: string[];
  entryAllowed: boolean;
  verificationMethod: 'vision' | 'rfid' | 'manual';
  notes?: string;
}

export interface WorkerStats {
  totalWorkers: number;
  currentlyInside: number;
  todayEntries: number;
  complianceRate: number;
  violations: number;
}