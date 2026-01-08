import { Button } from '@/components/ui/button';

export type FilterType = 'none' | 'warm' | 'cool' | 'vintage' | 'bw' | 'soft';

interface FilterSelectorProps {
  selectedFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

const filters: { type: FilterType; label: string; emoji: string }[] = [
  { type: 'none', label: 'normal', emoji: '✨' },
  { type: 'warm', label: 'warm', emoji: '🌅' },
  { type: 'cool', label: 'cool', emoji: '❄️' },
  { type: 'vintage', label: 'vintage', emoji: '📷' },
  { type: 'bw', label: 'b&w', emoji: '🖤' },
  { type: 'soft', label: 'soft', emoji: '💕' },
];

const FilterSelector = ({ selectedFilter, onSelectFilter }: FilterSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <Button
          key={filter.type}
          variant={selectedFilter === filter.type ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectFilter(filter.type)}
          className={`rounded-full px-3 py-1 transition-all duration-200 hover:scale-105 ${
            selectedFilter === filter.type
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'bg-card hover:bg-secondary'
          }`}
        >
          <span className="mr-1">{filter.emoji}</span>
          <span className="text-xs">{filter.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default FilterSelector;
