import { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RotateCcw } from 'lucide-react';
import { FrameType } from './PhotoFrame';
import { FilterType } from './FilterSelector';

interface PhotoPreviewProps {
  photoData: string;
  frameType: FrameType;
  filterType: FilterType;
  birthdayName: string;
  onRetake: () => void;
}

const frameEmojis: Record<FrameType, string[]> = {
  hearts: ['💗', '💖', '💕', '💗'],
  sparkles: ['✨', '💫', '⭐', '✨'],
  balloons: ['🎈', '🎈', '🎈', '🎈'],
  stars: ['⭐', '✨', '⭐', '✨'],
  confetti: ['🎊', '🎉', '🎊', '🎉'],
  cake: ['🎂', '🧁', '🎂', '🧁'],
};

const filterStyles: Record<FilterType, string> = {
  none: '',
  warm: 'sepia(0.3) saturate(1.4) brightness(1.1)',
  cool: 'saturate(0.9) brightness(1.1) hue-rotate(-10deg)',
  vintage: 'sepia(0.4) contrast(1.1) brightness(0.95) saturate(0.8)',
  bw: 'grayscale(1) contrast(1.1)',
  soft: 'brightness(1.1) contrast(0.95) saturate(1.2)',
};

const PhotoPreview = ({ photoData, frameType, filterType, birthdayName, onRetake }: PhotoPreviewProps) => {
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

      // Apply filter
      if (filterStyles[filterType]) {
        ctx.filter = filterStyles[filterType];
      }

      // Draw image
      ctx.drawImage(img, 0, 0);
      
      // Reset filter for decorations
      ctx.filter = 'none';

      // Draw frame emojis
      const emojis = frameEmojis[frameType];
      if (emojis.length > 0) {
        ctx.font = `${Math.floor(canvas.width / 10)}px serif`;
        ctx.textAlign = 'center';
        
        // Corners
        ctx.fillText(emojis[0], canvas.width * 0.08, canvas.height * 0.12);
        ctx.fillText(emojis[1], canvas.width * 0.92, canvas.height * 0.12);
        ctx.fillText(emojis[2], canvas.width * 0.08, canvas.height * 0.92);
        ctx.fillText(emojis[3], canvas.width * 0.92, canvas.height * 0.92);
      }

      // Draw birthday text
      if (birthdayName.trim()) {
        const fontSize = Math.floor(canvas.width / 12);
        ctx.font = `bold ${fontSize}px Fredoka, sans-serif`;
        ctx.textAlign = 'center';
        
        // Text shadow/stroke
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = fontSize / 8;
        ctx.strokeText(`Happy Birthday ${birthdayName}! 💖`, canvas.width / 2, canvas.height - fontSize * 0.8);
        
        // Pink gradient fill
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'hsl(340, 85%, 65%)');
        gradient.addColorStop(0.5, 'hsl(330, 90%, 70%)');
        gradient.addColorStop(1, 'hsl(350, 80%, 75%)');
        ctx.fillStyle = gradient;
        ctx.fillText(`Happy Birthday ${birthdayName}! 💖`, canvas.width / 2, canvas.height - fontSize * 0.8);
      }
    };

    renderPhoto();
  }, [photoData, frameType, filterType, birthdayName]);

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
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/40">
        <canvas ref={canvasRef} className="max-w-full max-h-[60vh] object-contain" />
      </div>
      
      <div className="flex gap-4">
        <Button
          onClick={onRetake}
          variant="outline"
          size="lg"
          className="rounded-full px-6 gap-2 hover:scale-105 transition-transform border-2 border-primary/30"
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
