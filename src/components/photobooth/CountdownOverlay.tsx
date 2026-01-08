interface CountdownOverlayProps {
  count: number;
}

const CountdownOverlay = ({ count }: CountdownOverlayProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 backdrop-blur-sm z-10">
      <div
        key={count}
        className="text-[120px] md:text-[180px] font-bold text-white animate-countdown drop-shadow-2xl"
        style={{
          textShadow: '0 0 40px hsl(var(--birthday-pink)), 0 0 80px hsl(var(--birthday-lilac))',
        }}
      >
        {count}
      </div>
    </div>
  );
};

export default CountdownOverlay;
