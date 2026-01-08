import { ReactNode } from 'react';

export type FrameType = 'none' | 'balloons' | 'stars' | 'confetti' | 'cake';

interface PhotoFrameProps {
  frameType: FrameType;
  children: ReactNode;
}

const frames: Record<FrameType, ReactNode> = {
  none: null,
  balloons: (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-2 -left-2 text-4xl animate-float" style={{ animationDelay: '0s' }}>🎈</div>
      <div className="absolute -top-2 -right-2 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>🎈</div>
      <div className="absolute top-1/4 -left-4 text-3xl animate-float" style={{ animationDelay: '1s' }}>🎈</div>
      <div className="absolute top-1/4 -right-4 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>🎈</div>
      <div className="absolute -bottom-2 left-1/4 text-3xl animate-float" style={{ animationDelay: '0.3s' }}>🎈</div>
      <div className="absolute -bottom-2 right-1/4 text-3xl animate-float" style={{ animationDelay: '0.8s' }}>🎈</div>
    </div>
  ),
  stars: (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-2 left-2 text-2xl animate-pulse">⭐</div>
      <div className="absolute top-2 right-2 text-2xl animate-pulse" style={{ animationDelay: '0.2s' }}>✨</div>
      <div className="absolute top-1/3 -left-2 text-xl animate-pulse" style={{ animationDelay: '0.4s' }}>⭐</div>
      <div className="absolute top-1/3 -right-2 text-xl animate-pulse" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="absolute bottom-2 left-2 text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>✨</div>
      <div className="absolute bottom-2 right-2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute top-1/2 left-4 text-lg animate-pulse" style={{ animationDelay: '0.7s' }}>💫</div>
      <div className="absolute top-1/2 right-4 text-lg animate-pulse" style={{ animationDelay: '0.9s' }}>💫</div>
    </div>
  ),
  confetti: (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/4 text-2xl">🎊</div>
      <div className="absolute top-0 right-1/4 text-2xl">🎉</div>
      <div className="absolute bottom-0 left-0 text-2xl">🎉</div>
      <div className="absolute bottom-0 right-0 text-2xl">🎊</div>
      <div className="absolute top-1/2 -left-2 text-xl">🎀</div>
      <div className="absolute top-1/2 -right-2 text-xl">🎀</div>
    </div>
  ),
  cake: (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl animate-float">🎂</div>
      <div className="absolute bottom-2 left-2 text-2xl">🧁</div>
      <div className="absolute bottom-2 right-2 text-2xl">🧁</div>
      <div className="absolute top-1/4 -left-2 text-xl animate-float" style={{ animationDelay: '0.5s' }}>🍰</div>
      <div className="absolute top-1/4 -right-2 text-xl animate-float" style={{ animationDelay: '1s' }}>🍰</div>
      <div className="absolute top-2 left-4 text-lg">🎁</div>
      <div className="absolute top-2 right-4 text-lg">🎁</div>
    </div>
  ),
};

const PhotoFrame = ({ frameType, children }: PhotoFrameProps) => {
  return (
    <div className="relative">
      {children}
      {frames[frameType]}
    </div>
  );
};

export default PhotoFrame;
