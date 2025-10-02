import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface HealthStatus {
  api: 'connected' | 'disconnected' | 'checking';
  camera: 'available' | 'unavailable' | 'checking';
  notifications: 'enabled' | 'disabled' | 'checking';
}

export const useSystemHealth = () => {
  const [health, setHealth] = useState<HealthStatus>({
    api: 'checking',
    camera: 'checking',
    notifications: 'checking'
  });

  const checkAPIHealth = async () => {
    try {
      await apiService.healthCheck();
      setHealth(prev => ({ ...prev, api: 'connected' }));
    } catch (error) {
      console.warn('API health check failed:', error);
      setHealth(prev => ({ ...prev, api: 'disconnected' }));
    }
  };

  const checkCameraHealth = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHealth(prev => ({ ...prev, camera: 'unavailable' }));
        return;
      }
      
      // Just check if camera is available without actually accessing it
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(device => device.kind === 'videoinput');
      
      setHealth(prev => ({ 
        ...prev, 
        camera: hasCamera ? 'available' : 'unavailable' 
      }));
    } catch (error) {
      console.warn('Camera health check failed:', error);
      setHealth(prev => ({ ...prev, camera: 'unavailable' }));
    }
  };

  const checkNotificationHealth = () => {
    if (!('Notification' in window)) {
      setHealth(prev => ({ ...prev, notifications: 'disabled' }));
      return;
    }
    
    const permission = Notification.permission;
    setHealth(prev => ({ 
      ...prev, 
      notifications: permission === 'granted' ? 'enabled' : 'disabled' 
    }));
  };

  useEffect(() => {
    const runHealthChecks = async () => {
      await Promise.all([
        checkAPIHealth(),
        checkCameraHealth(),
        checkNotificationHealth()
      ]);
    };

    runHealthChecks();
    
    // Re-run health checks every 30 seconds
    const interval = setInterval(runHealthChecks, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const manualRefresh = async () => {
    await Promise.all([
      checkAPIHealth(),
      checkCameraHealth(),
      checkNotificationHealth()
    ]);
  };

  return {
    health,
    refresh: manualRefresh
  };
};