'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/common';
import { useSystemHealth } from '@/hooks';

interface DebugInfo {
  environment: string;
  nodeVersion: string;
  userAgent: string;
  viewport: { width: number; height: number };
  timestamp: string;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
    case 'available':
    case 'enabled':
      return '🟢';
    case 'disconnected':
    case 'unavailable':
    case 'disabled':
      return '🔴';
    case 'checking':
      return '🟡';
    default:
      return '⚪';
  }
};

export default function DebugPanel() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { health, refresh } = useSystemHealth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDebugInfo({
        environment: process.env.NODE_ENV || 'development',
        nodeVersion: process.version || 'unknown',
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  if (!debugInfo) return null;

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 z-50"
        aria-label="Toggle debug panel"
      >
        🐛
      </button>

      {/* Debug Panel */}
      {isVisible && (
        <div className="fixed bottom-16 right-4 w-80 max-h-96 overflow-auto z-50">
          <Card className="bg-gray-900 text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Debug Info</h3>
              <div className="flex space-x-2">
                <button
                  onClick={refresh}
                  className="text-gray-400 hover:text-white"
                  aria-label="Refresh health checks"
                >
                  🔄
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close debug panel"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong>Environment:</strong> {debugInfo.environment}
              </div>
              <div>
                <strong>Viewport:</strong> {debugInfo.viewport.width} × {debugInfo.viewport.height}
              </div>
              <div>
                <strong>Timestamp:</strong> {new Date(debugInfo.timestamp).toLocaleString()}
              </div>
              
              {/* System Health */}
              <div className="border-t border-gray-700 pt-3">
                <strong>System Health:</strong>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center">
                    <span className="mr-2">{getStatusIcon(health.api)}</span>
                    <span>API: {health.api}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">{getStatusIcon(health.camera)}</span>
                    <span>Camera: {health.camera}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">{getStatusIcon(health.notifications)}</span>
                    <span>Notifications: {health.notifications}</span>
                  </div>
                </div>
              </div>
              
              {/* Local Storage Info */}
              <div className="border-t border-gray-700 pt-3">
                <strong>Storage:</strong>
                <div className="mt-1 text-xs">
                  <div>Auth Token: {typeof window !== 'undefined' && localStorage.getItem('auth_token') ? '✓ Present' : '✗ Missing'}</div>
                  <div>User Data: {typeof window !== 'undefined' && localStorage.getItem('user') ? '✓ Present' : '✗ Missing'}</div>
                </div>
              </div>
              
              {/* Performance Info */}
              <div className="border-t border-gray-700 pt-3">
                <strong>Performance:</strong>
                <div className="mt-1 text-xs">
                  <div>Memory: {(() => {
                    if (typeof window !== 'undefined' && 'memory' in performance) {
                      const memory = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
                      return `${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`;
                    }
                    return 'Unknown';
                  })()}</div>
                  <div>Connection: {(() => {
                    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
                      const connection = (navigator as unknown as { connection: { effectiveType: string } }).connection;
                      return connection.effectiveType;
                    }
                    return 'Unknown';
                  })()}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}