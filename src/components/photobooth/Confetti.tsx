import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
  size: number;
  duration: number;
}

interface ConfettiProps {
  active: boolean;
}

const colors = [
  'hsl(330, 70%, 75%)', // pink
  'hsl(270, 60%, 82%)', // lilac
  'hsl(200, 70%, 80%)', // blue
  'hsl(50, 85%, 75%)',  // yellow
  'hsl(160, 50%, 80%)', // mint
];

const Confetti = ({ active }: ConfettiProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (active) {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        newPieces.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 6,
          duration: Math.random() * 2 + 2,
        });
      }
      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute confetti-piece"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
