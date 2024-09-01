import { cn } from "@/lib/utils";

type Direction = "top" | "bottom" | "right" | "left";

interface ProgressiveBlurProps {
  className?: string;
  direction?: Direction;
}

const generateMasks = (direction: Direction): string[] => {
  const directionMap: Record<Direction, string> = {
    bottom: "to bottom",
    top: "to top",
    left: "to left",
    right: "to right",
  };

  const directionGradient = directionMap[direction];

  return [
    `linear-gradient(${directionGradient}, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5% )`,
    `linear-gradient(${directionGradient}, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50% )`,
    `linear-gradient(${directionGradient}, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5% )`,
    `linear-gradient(${directionGradient}, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75% )`,
    `linear-gradient(${directionGradient}, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5% )`,
    `linear-gradient(${directionGradient}, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100% )`,
    `linear-gradient(${directionGradient}, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100% )`,
    `linear-gradient(${directionGradient}, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100% )`,
  ];
};

const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  className,
  direction = "top",
}) => {
  const masks = generateMasks(direction);

  return (
    <div className={cn("pointer-events-none", className)}>
      {masks.map((mask, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: index + 1,
            WebkitBackdropFilter: `blur(${Math.pow(2, index) / 2}px)`,
            backdropFilter: `blur(${Math.pow(2, index) / 2}px)`,
            mask: mask,
          }}
        />
      ))}
    </div>
  );
};

export default ProgressiveBlur;
