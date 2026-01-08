import { ReactNode } from 'react';

export type FrameType = 'hearts' | 'sparkles';

interface PhotoFrameProps {
  frameType: FrameType;
  children: ReactNode;
}

const frames: Record<FrameType, ReactNode> = {
  hearts: (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-2 -left-2 text-3xl animate-float" style={{ animationDelay: '0s' }}>💗</div>
      <div className="absolute -top-2 -right-2 text-3xl animate-float" style={{ animationDelay: '0.3s' }}>💖</div>
      <div className="absolute top-1/4 -left-3 text-2xl animate-float" style={{ animationDelay: '0.6s' }}>💕</div>
      <div className="absolute top-1/4 -right-3 text-2xl animate-float" style={{ animationDelay: '0.9s' }}>💗</div>
      <div className="absolute top-1/2 -left-2 text-xl animate-float" style={{ animationDelay: '1.2s' }}>💖</div>
      <div className="absolute top-1/2 -right-2 text-xl animate-float" style={{ animationDelay: '1.5s' }}>💕</div>
      <div className="absolute -bottom-2 left-1/4 text-2xl animate-float" style={{ animationDelay: '0.4s' }}>💗</div>
      <div className="absolute -bottom-2 right-1/4 text-2xl animate-float" style={{ animationDelay: '0.7s' }}>💖</div>
      <div className="absolute bottom-1/4 -left-2 text-lg animate-pulse">💕</div>
      <div className="absolute bottom-1/4 -right-2 text-lg animate-pulse">💕</div>
    </div>
  ),
  sparkles: (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1 left-1 text-2xl animate-pulse">✨</div>
      <div className="absolute top-1 right-1 text-2xl animate-pulse" style={{ animationDelay: '0.2s' }}>💫</div>
      <div className="absolute top-1/4 -left-2 text-xl animate-pulse" style={{ animationDelay: '0.4s' }}>⭐</div>
      <div className="absolute top-1/4 -right-2 text-xl animate-pulse" style={{ animationDelay: '0.6s' }}>✨</div>
      <div className="absolute top-1/2 -left-1 text-lg animate-pulse" style={{ animationDelay: '0.8s' }}>💫</div>
      <div className="absolute top-1/2 -right-1 text-lg animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute bottom-1 left-1 text-2xl animate-pulse" style={{ animationDelay: '0.3s' }}>✨</div>
      <div className="absolute bottom-1 right-1 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>💫</div>
      <div className="absolute bottom-1/4 -left-2 text-lg animate-pulse" style={{ animationDelay: '0.7s' }}>⭐</div>
      <div className="absolute bottom-1/4 -right-2 text-lg animate-pulse" style={{ animationDelay: '0.9s' }}>✨</div>
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
