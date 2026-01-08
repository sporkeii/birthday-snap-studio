import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

import { FilterType } from './FilterSelector';

interface CameraViewProps {
  mirrored: boolean;
  filterType: FilterType;
  onCameraReady: () => void;
  onCameraError: (error: string) => void;
}

export interface CameraViewRef {
  capturePhoto: () => string | null;
  getVideoElement: () => HTMLVideoElement | null;
}

const filterStyles: Record<FilterType, string> = {
  none: '',
  warm: 'sepia(0.3) saturate(1.4) brightness(1.1)',
  cool: 'saturate(0.9) brightness(1.1) hue-rotate(-10deg)',
  vintage: 'sepia(0.4) contrast(1.1) brightness(0.95) saturate(0.8)',
  bw: 'grayscale(1) contrast(1.1)',
  soft: 'brightness(1.1) contrast(0.95) saturate(1.2)',
};

const CameraView = forwardRef<CameraViewRef, CameraViewProps>(
  ({ mirrored, filterType, onCameraReady, onCameraError }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useImperativeHandle(ref, () => ({
      capturePhoto: () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return null;

        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if (mirrored) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }

        // Apply filter
        if (filterStyles[filterType]) {
          ctx.filter = filterStyles[filterType];
        }

        ctx.drawImage(video, 0, 0);
        ctx.filter = 'none';
        
        return canvas.toDataURL('image/png');
      },
      getVideoElement: () => videoRef.current,
    }));

    useEffect(() => {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });

          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            onCameraReady();
          }
        } catch (error) {
          console.error('Camera error:', error);
          onCameraError('Unable to access camera. Please allow camera permissions.');
        }
      };

      startCamera();

      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };
    }, [onCameraReady, onCameraError]);

    const filterClass = filterStyles[filterType] ? `filter-${filterType}` : '';
    
    return (
      <>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${mirrored ? 'scale-x-[-1]' : ''} ${filterClass}`}
          style={filterStyles[filterType] ? { filter: filterStyles[filterType] } : undefined}
        />
        <canvas ref={canvasRef} className="hidden" />
      </>
    );
  }
);

CameraView.displayName = 'CameraView';

export default CameraView;
