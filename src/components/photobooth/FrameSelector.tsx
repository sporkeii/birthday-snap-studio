import { FrameType } from './PhotoFrame';
import { Button } from '@/components/ui/button';

interface FrameSelectorProps {
  selectedFrame: FrameType;
  onSelectFrame: (frame: FrameType) => void;
}

const frames: { type: FrameType; emoji: string; label: string }[] = [
  { type: 'hearts', emoji: '💗', label: 'Hearts' },
  { type: 'sparkles', emoji: '✨', label: 'Sparkles' },
];

const FrameSelector = ({ selectedFrame, onSelectFrame }: FrameSelectorProps) => {
  return (
    <div className="flex gap-3 justify-center">
      {frames.map((frame) => (
        <Button
          key={frame.type}
          variant={selectedFrame === frame.type ? 'default' : 'outline'}
          size="lg"
          onClick={() => onSelectFrame(frame.type)}
          className={`rounded-full px-6 py-3 transition-all duration-200 hover:scale-105 ${
            selectedFrame === frame.type
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-card hover:bg-secondary border-2 border-primary/30'
          }`}
        >
          <span className="mr-2 text-xl">{frame.emoji}</span>
          <span className="font-medium">{frame.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default FrameSelector;
