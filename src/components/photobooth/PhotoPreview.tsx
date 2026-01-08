import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw } from 'lucide-react';
import { FrameType } from './PhotoFrame';

interface PhotoPreviewProps {
  photoData: string;
  frameType: FrameType;
  birthdayName: string;
  onRetake: () => void;
}

const frameEmojis: Record<FrameType, string[]> = {
  none: [],
  balloons: ['🎈', '🎈', '🎈', '🎈'],
  stars: ['⭐', '✨', '⭐', '✨'],
  confetti: ['🎊', '🎉', '🎊', '🎉'],
  cake: ['🎂', '🧁', '🎂', '🧁'],
};

const PhotoPreview = ({ photoData, frameType, birthdayName, onRetake }: PhotoPreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderPhoto = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.src = photoData;
      await new Promise((resolve) => (img.onload = resolve));

      // Set canvas size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Draw frame emojis
      const emojis = frameEmojis[frameType];
      if (emojis.length > 0) {
        ctx.font = `${Math.floor(canvas.width / 12)}px serif`;
        ctx.textAlign = 'center';
        
        // Corners
        ctx.fillText(emojis[0], canvas.width * 0.08, canvas.height * 0.1);
        ctx.fillText(emojis[1], canvas.width * 0.92, canvas.height * 0.1);
        ctx.fillText(emojis[2], canvas.width * 0.08, canvas.height * 0.95);
        ctx.fillText(emojis[3], canvas.width * 0.92, canvas.height * 0.95);
      }

      // Draw birthday text
      if (birthdayName.trim()) {
        const fontSize = Math.floor(canvas.width / 14);
        ctx.font = `bold ${fontSize}px Fredoka, sans-serif`;
        ctx.textAlign = 'center';
        
        // Text shadow/stroke
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = fontSize / 8;
        ctx.strokeText(`Happy Birthday ${birthdayName}!`, canvas.width / 2, canvas.height - fontSize);
        
        // Gradient fill
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'hsl(330, 70%, 75%)');
        gradient.addColorStop(0.5, 'hsl(270, 60%, 82%)');
        gradient.addColorStop(1, 'hsl(200, 70%, 80%)');
        ctx.fillStyle = gradient;
        ctx.fillText(`Happy Birthday ${birthdayName}!`, canvas.width / 2, canvas.height - fontSize);
      }
    };

    renderPhoto();
  }, [photoData, frameType, birthdayName]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `birthday-photo-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-bounce-in">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/30">
        <canvas ref={canvasRef} className="max-w-full max-h-[60vh] object-contain" />
      </div>
      
      <div className="flex gap-4">
        <Button
          onClick={onRetake}
          variant="outline"
          size="lg"
          className="rounded-full px-6 gap-2 hover:scale-105 transition-transform"
        >
          <RotateCcw className="w-5 h-5" />
          Retake
        </Button>
        <Button
          onClick={handleDownload}
          size="lg"
          className="rounded-full px-6 gap-2 bg-primary hover:bg-primary/90 animate-pulse-glow hover:scale-105 transition-transform"
        >
          <Download className="w-5 h-5" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default PhotoPreview;
