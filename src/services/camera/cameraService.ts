import { PPEItemStatus } from '@/types';

export interface CameraConfig {
  width: number;
  height: number;
  facingMode: 'user' | 'environment';
  fps?: number;
}

export class CameraService {
  private stream: MediaStream | null = null;
  private video: HTMLVideoElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;

  async initialize(videoElement: HTMLVideoElement, config: CameraConfig): Promise<void> {
    this.video = videoElement;
    
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: config.width,
          height: config.height,
          facingMode: config.facingMode,
          frameRate: config.fps || 30
        },
        audio: false
      });

      this.video.srcObject = this.stream;
      await this.video.play();

      // Create canvas for image capture
      this.canvas = document.createElement('canvas');
      this.canvas.width = config.width;
      this.canvas.height = config.height;
      this.context = this.canvas.getContext('2d');

    } catch (error) {
      console.error('Failed to initialize camera:', error);
      throw new Error('Camera initialization failed');
    }
  }

  async captureImage(): Promise<string> {
    if (!this.video || !this.canvas || !this.context) {
      throw new Error('Camera not initialized');
    }

    this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    return this.canvas.toDataURL('image/jpeg', 0.8);
  }

  async detectPPE(): Promise<PPEItemStatus[]> {
    // This would integrate with your AI/ML service
    // For now, returning mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock PPE detection results
        const mockResults: PPEItemStatus[] = [
          {
            item: { id: 'helmet', name: 'Safety Helmet', icon: '/icons/helmet.svg', required: true, category: 'safety' },
            detected: Math.random() > 0.3,
            confidence: Math.random() * 0.4 + 0.6,
            method: 'vision'
          },
          {
            item: { id: 'reflective-vest', name: 'Reflective Vest', icon: '/icons/vest.svg', required: true, category: 'visibility' },
            detected: Math.random() > 0.2,
            confidence: Math.random() * 0.3 + 0.7,
            method: 'vision'
          }
        ];
        resolve(mockResults);
      }, 1000);
    });
  }

  async startContinuousDetection(
    callback: (results: PPEItemStatus[]) => void,
    interval = 2000
  ): Promise<NodeJS.Timeout> {
    const intervalId = setInterval(async () => {
      try {
        await this.captureImage(); // Capture image for future AI integration
        const results = await this.detectPPE();
        callback(results);
      } catch (error) {
        console.error('Continuous detection error:', error);
      }
    }, interval);

    return intervalId;
  }

  stopContinuousDetection(intervalId: NodeJS.Timeout): void {
    clearInterval(intervalId);
  }

  async switchCamera(): Promise<void> {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }

    // Toggle between front and back camera
    const currentFacingMode = this.getCurrentFacingMode();
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

    if (this.video) {
      await this.initialize(this.video, {
        width: this.canvas?.width || 640,
        height: this.canvas?.height || 480,
        facingMode: newFacingMode
      });
    }
  }

  private getCurrentFacingMode(): 'user' | 'environment' {
    if (!this.stream) return 'environment';
    
    const videoTrack = this.stream.getVideoTracks()[0];
    const settings = videoTrack.getSettings();
    return settings.facingMode as 'user' | 'environment' || 'environment';
  }

  getVideoElement(): HTMLVideoElement | null {
    return this.video;
  }

  isActive(): boolean {
    return this.stream !== null && this.stream.active;
  }

  stop(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }

  // Get available cameras
  static async getAvailableCameras(): Promise<MediaDeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter(device => device.kind === 'videoinput');
    } catch (error) {
      console.error('Failed to get available cameras:', error);
      return [];
    }
  }

  // Check camera permissions
  static async checkCameraPermissions(): Promise<boolean> {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      return result.state === 'granted';
    } catch (error) {
      console.error('Failed to check camera permissions:', error);
      return false;
    }
  }
}

export const cameraService = new CameraService();