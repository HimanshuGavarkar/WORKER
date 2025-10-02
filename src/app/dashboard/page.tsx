'use client';

import { useState, useEffect } from 'react';
import { StatCard, RecentActivities } from '@/components/dashboard';
import SystemHealthWidget from '@/components/common/SystemHealthWidget';
import { ApiServiceTester } from '@/utils/apiServiceTester';
import { 
  UsersIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

// Mock data - replace with real API calls
const mockStats = {
  totalWorkers: 156,
  currentlyInside: 89,
  todayEntries: 142,
  complianceRate: 0.94,
  violations: 8,
  activeAlerts: 3
};

const mockActivities = [
  {
    id: '1',
    workerId: 'EMP001',
    workerName: 'John Smith',
    action: 'PPE verification completed',
    status: 'success' as const,
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    details: 'All PPE items verified successfully'
  },
  {
    id: '2',
    workerId: 'EMP002',
    workerName: 'Sarah Johnson',
    action: 'Missing safety helmet',
    status: 'error' as const,
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    details: 'Entry denied - helmet not detected'
  },
  {
    id: '3',
    workerId: 'EMP003',
    workerName: 'Mike Wilson',
    action: 'Manual override applied',
    status: 'warning' as const,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    details: 'Supervisor override for emergency entry'
  }
];

export default function DashboardPage() {
  const [stats] = useState(mockStats);
  const [activities] = useState(mockActivities);

  useEffect(() => {
    // Run API tests on component mount in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        ApiServiceTester.runAllTests();
      }, 3000);
    }
  }, []);

  const handleRunTests = async () => {
    await ApiServiceTester.runAllTests();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Coal Mine PPE Verification System Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Workers"
          value={stats.totalWorkers}
          icon={UsersIcon}
          color="blue"
        />
        <StatCard
          title="Currently Inside"
          value={stats.currentlyInside}
          icon={ShieldCheckIcon}
          color="green"
        />
        <StatCard
          title="Today's Entries"
          value={stats.todayEntries}
          change={8.2}
          changeLabel="vs yesterday"
          icon={ChartBarIcon}
          color="blue"
        />
        <StatCard
          title="Compliance Rate"
          value={`${(stats.complianceRate * 100).toFixed(1)}%`}
          change={2.1}
          changeLabel="this week"
          icon={ShieldCheckIcon}
          color="green"
        />
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          title="Active Violations"
          value={stats.violations}
          icon={ExclamationTriangleIcon}
          color="red"
        />
        <StatCard
          title="System Alerts"
          value={stats.activeAlerts}
          icon={ExclamationTriangleIcon}
          color="yellow"
        />
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities activities={activities} />
        </div>
        
        {/* Sidebar with System Health and Quick Actions */}
        <div className="space-y-6">
          <SystemHealthWidget />
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="font-medium text-blue-900">Start PPE Verification</div>
                <div className="text-sm text-blue-600">Begin new worker verification process</div>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="font-medium text-green-900">View Live Gates</div>
                <div className="text-sm text-green-600">Monitor real-time gate status</div>
              </button>
              <button className="w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                <div className="font-medium text-yellow-900">Generate Report</div>
                <div className="text-sm text-yellow-600">Create compliance report</div>
              </button>
              
              {/* Development-only test button */}
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={handleRunTests}
                  className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <div className="font-medium text-purple-900">🧪 Test API Service</div>
                  <div className="text-sm text-purple-600">Run API service tests (check console)</div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}