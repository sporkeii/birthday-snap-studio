import { FrameType } from './PhotoFrame';
import { Button } from '@/components/ui/button';

interface FrameSelectorProps {
  selectedFrame: FrameType;
  onSelectFrame: (frame: FrameType) => void;
}

const frames: { type: FrameType; emoji: string; label: string }[] = [
  { type: 'none', emoji: '⬜', label: 'None' },
  { type: 'balloons', emoji: '🎈', label: 'Balloons' },
  { type: 'stars', emoji: '⭐', label: 'Stars' },
  { type: 'confetti', emoji: '🎉', label: 'Party' },
  { type: 'cake', emoji: '🎂', label: 'Cake' },
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
          className={`rounded-full px-4 py-2 transition-all duration-200 hover:scale-105 ${
            selectedFrame === frame.type
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-card hover:bg-secondary'
          }`}
        >
          <span className="mr-1">{frame.emoji}</span>
          <span className="hidden sm:inline">{frame.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default FrameSelector;
