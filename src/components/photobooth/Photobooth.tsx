import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, FlipHorizontal } from 'lucide-react';
import CameraView, { CameraViewRef } from './CameraView';
import PhotoFrame, { FrameType } from './PhotoFrame';
import FrameSelector from './FrameSelector';
import FilterSelector, { FilterType } from './FilterSelector';
import CountdownOverlay from './CountdownOverlay';
import PhotoPreview from './PhotoPreview';
import Confetti from './Confetti';

const Photobooth = () => {
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [mirrored, setMirrored] = useState(true);
  const [selectedFrame, setSelectedFrame] = useState<FrameType>('hearts');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('none');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const birthdayName = 'lex';
  const cameraRef = useRef<CameraViewRef>(null);

  const handleCameraReady = useCallback(() => {
    setCameraReady(true);
  }, []);

  const handleCameraError = useCallback((error: string) => {
    setCameraError(error);
  }, []);

  const startCountdown = () => {
    setCountdown(3);

    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();
      }
    }, 1000);
  };

  const capturePhoto = () => {
    const photo = cameraRef.current?.capturePhoto();
    if (photo) {
      setCapturedPhoto(photo);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  if (cameraError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-birthday">
        <div className="bg-card p-8 rounded-3xl shadow-xl text-center max-w-md border-2 border-primary/20">
          <div className="text-6xl mb-4">📷</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Camera Access Needed</h2>
          <p className="text-muted-foreground mb-6">{cameraError}</p>
          <Button
            onClick={() => window.location.reload()}
            className="rounded-full px-6"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-birthday">
      <Confetti active={showConfetti} />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          PHOTOBOOTH !! 🎂
        </h1>
      </div>

      {/* Main Content */}
      {capturedPhoto ? (
        <PhotoPreview
          photoData={capturedPhoto}
          frameType={selectedFrame}
          filterType={selectedFilter}
          birthdayName={birthdayName}
          onRetake={handleRetake}
        />
      ) : (
        <div className="w-full max-w-2xl space-y-5">
          {/* Camera Container */}
          <PhotoFrame frameType={selectedFrame}>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/40 bg-muted">
              <CameraView
                ref={cameraRef}
                mirrored={mirrored}
                filterType={selectedFilter}
                onCameraReady={handleCameraReady}
                onCameraError={handleCameraError}
              />
              {countdown !== null && <CountdownOverlay count={countdown} />}
              
              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <div className="text-4xl animate-pulse mb-2">📸</div>
                    <p className="text-muted-foreground">Loading camera...</p>
                  </div>
                </div>
              )}
            </div>
          </PhotoFrame>

          {/* Controls */}
          <div className="space-y-4">
            {/* Frame Selector */}
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center mb-3">choose ur frame:</p>
              <FrameSelector
                selectedFrame={selectedFrame}
                onSelectFrame={setSelectedFrame}
              />
            </div>

            {/* Filter Selector */}
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center mb-3">pick a filter:</p>
              <FilterSelector
                selectedFilter={selectedFilter}
                onSelectFilter={setSelectedFilter}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setMirrored(!mirrored)}
                variant="outline"
                size="lg"
                className="rounded-full px-6 gap-2 hover:scale-105 transition-transform border-2 border-primary/30"
              >
                <FlipHorizontal className="w-5 h-5" />
                mirror
              </Button>
              <Button
                onClick={startCountdown}
                disabled={!cameraReady || countdown !== null}
                size="lg"
                className="rounded-full px-8 gap-2 bg-primary text-primary-foreground animate-pulse-glow hover:scale-105 transition-transform text-lg font-semibold"
              >
                <Camera className="w-6 h-6" />
                take photo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p>📸 happy birthday lexx {"<"}33 🎂</p>
      </div>
    </div>
  );
};

export default Photobooth;
