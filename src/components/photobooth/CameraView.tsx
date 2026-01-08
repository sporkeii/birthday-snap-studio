import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface CameraViewProps {
  mirrored: boolean;
  onCameraReady: () => void;
  onCameraError: (error: string) => void;
}

export interface CameraViewRef {
  capturePhoto: () => string | null;
  getVideoElement: () => HTMLVideoElement | null;
}

const CameraView = forwardRef<CameraViewRef, CameraViewProps>(
  ({ mirrored, onCameraReady, onCameraError }, ref) => {
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

        ctx.drawImage(video, 0, 0);
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

    return (
      <>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${mirrored ? 'scale-x-[-1]' : ''}`}
        />
        <canvas ref={canvasRef} className="hidden" />
      </>
    );
  }
);

CameraView.displayName = 'CameraView';

export default CameraView;
