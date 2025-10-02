'use client';

import { useSystemHealth } from '@/hooks';

const StatusIndicator = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'available':
      case 'enabled':
        return 'bg-green-500';
      case 'disconnected':
      case 'unavailable':
      case 'disabled':
        return 'bg-red-500';
      case 'checking':
        return 'bg-yellow-500 animate-pulse';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(status)}`} />
  );
};

export default function SystemHealthWidget() {
  const { health, refresh } = useSystemHealth();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">System Health</h3>
        <button
          onClick={refresh}
          className="text-xs text-blue-600 hover:text-blue-700"
          aria-label="Refresh system health"
        >
          🔄
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center">
          <StatusIndicator status={health.api} />
          <span>API: {health.api}</span>
        </div>
        <div className="flex items-center">
          <StatusIndicator status={health.camera} />
          <span>Camera: {health.camera}</span>
        </div>
        <div className="flex items-center">
          <StatusIndicator status={health.notifications} />
          <span>Notifications: {health.notifications}</span>
        </div>
      </div>
    </div>
  );
}