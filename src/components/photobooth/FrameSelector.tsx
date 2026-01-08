import { FrameType } from './PhotoFrame';
import { Button } from '@/components/ui/button';

interface FrameSelectorProps {
  selectedFrame: FrameType;
  onSelectFrame: (frame: FrameType) => void;
}

const frames: { type: FrameType; emoji: string; label: string }[] = [
  { type: 'hearts', emoji: '💗', label: 'hearts' },
  { type: 'sparkles', emoji: '✨', label: 'sparkles' },
  { type: 'balloons', emoji: '🎈', label: 'balloons' },
  { type: 'stars', emoji: '⭐', label: 'stars' },
  { type: 'confetti', emoji: '🎉', label: 'party' },
  { type: 'cake', emoji: '🎂', label: 'cake' },
];

const FrameSelector = ({ selectedFrame, onSelectFrame }: FrameSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {frames.map((frame) => (
        <Button
          key={frame.type}
          variant={selectedFrame === frame.type ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectFrame(frame.type)}
          className={`rounded-full px-3 py-1.5 transition-all duration-200 hover:scale-105 ${
            selectedFrame === frame.type
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-card hover:bg-secondary border border-primary/20'
          }`}
        >
          <span className="mr-1">{frame.emoji}</span>
          <span className="text-xs">{frame.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default FrameSelector;
