import type { Alert, NotificationSettings } from '@/types';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  sound?: string;
  vibrate?: number[];
  urgency?: 'low' | 'normal' | 'high';
  persistent?: boolean;
}

export class NotificationService {
  private settings: NotificationSettings = {
    sms: false,
    email: false,
    push: true,
    sound: true,
    vibration: true,
    alertTypes: ['violation', 'system', 'emergency']
  };

  async initialize(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async showNotification(options: NotificationOptions): Promise<void> {
    if (!this.settings.push) return;

    const hasPermission = await this.initialize();
    if (!hasPermission) return;

    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/icons/notification.png',
      badge: '/icons/badge.png',
      requireInteraction: options.persistent || false,
      silent: !this.settings.sound
    });

    // Play sound if enabled
    if (this.settings.sound && options.sound) {
      this.playSound(options.sound);
    }

    // Vibrate if enabled and supported
    if (this.settings.vibration && 'vibrate' in navigator && options.vibrate) {
      navigator.vibrate(options.vibrate);
    }

    // Auto-close non-persistent notifications
    if (!options.persistent) {
      setTimeout(() => notification.close(), 5000);
    }
  }

  async showAlert(alert: Alert): Promise<void> {
    if (!this.settings.alertTypes.includes(alert.type)) return;

    const options: NotificationOptions = {
      title: alert.title,
      body: alert.message,
      icon: this.getAlertIcon(alert.type),
      sound: this.getAlertSound(alert.severity),
      vibrate: this.getVibrationPattern(alert.severity),
      persistent: alert.severity === 'critical',
      urgency: alert.severity === 'critical' ? 'high' : 'normal'
    };

    await this.showNotification(options);
  }

  private getAlertIcon(type: Alert['type']): string {
    const icons = {
      violation: '/icons/warning.png',
      system: '/icons/system.png',
      emergency: '/icons/emergency.png'
    };
    return icons[type];
  }

  private getAlertSound(severity: Alert['severity']): string {
    const sounds = {
      low: '/sounds/notification-low.mp3',
      medium: '/sounds/notification-medium.mp3',
      high: '/sounds/notification-high.mp3',
      critical: '/sounds/emergency-alarm.mp3'
    };
    return sounds[severity];
  }

  private getVibrationPattern(severity: Alert['severity']): number[] {
    const patterns = {
      low: [200],
      medium: [200, 100, 200],
      high: [300, 100, 300, 100, 300],
      critical: [500, 200, 500, 200, 500, 200, 500]
    };
    return patterns[severity];
  }

  private playSound(soundUrl: string): void {
    if (!this.settings.sound) return;

    try {
      const audio = new Audio(soundUrl);
      audio.volume = 0.7;
      audio.play().catch(error => {
        console.warn('Failed to play notification sound:', error);
      });
    } catch (error) {
      console.warn('Failed to create audio for notification:', error);
    }
  }

  updateSettings(newSettings: Partial<NotificationSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
  }

  getSettings(): NotificationSettings {
    return { ...this.settings };
  }

  private saveSettings(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notification_settings', JSON.stringify(this.settings));
    }
  }

  private loadSettings(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notification_settings');
      if (saved) {
        try {
          this.settings = { ...this.settings, ...JSON.parse(saved) };
        } catch (error) {
          console.warn('Failed to load notification settings:', error);
        }
      }
    }
  }

  // Email notification (would integrate with backend)
  async sendEmail(
    to: string,
    subject: string,
    body: string,
    priority: 'low' | 'normal' | 'high' = 'normal'
  ): Promise<void> {
    if (!this.settings.email) return;

    // This would call your backend email service
    console.log('Email notification:', { to, subject, body, priority });
  }

  // SMS notification (would integrate with backend)
  async sendSMS(
    to: string,
    message: string,
    priority: 'low' | 'normal' | 'high' = 'normal'
  ): Promise<void> {
    if (!this.settings.sms) return;

    // This would call your backend SMS service
    console.log('SMS notification:', { to, message, priority });
  }

  // Initialize settings on service creation
  constructor() {
    this.loadSettings();
  }
}

export const notificationService = new NotificationService();