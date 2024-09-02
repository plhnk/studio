import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ServiceIllustrationProps {
  name: string;
  className?: string;
  isVisible: boolean;
}

const ServiceIllustration: React.FC<ServiceIllustrationProps> = ({
  name,
  className = "",
  isVisible,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (isVisible && svgRef.current) {
      const svg = svgRef.current;

      // Example animation: move all circles up and down
      const circles = svg.querySelectorAll("circle");

      circles.forEach((circle, index) => {
        circle.animate(
          [
            { transform: "translateY(0px)" },
            { transform: `translateY(${index % 2 === 0 ? -10 : 10}px)` },
            { transform: "translateY(0px)" },
          ],
          {
            duration: 1000,
            iterations: Infinity,
            easing: "ease-in-out",
            delay: index * 100,
          }
        );
      });
    }
  }, [isVisible]);

  return (
    <svg
      ref={svgRef}
      className={cn("text-neutral-900", className)}
      viewBox="0 0 246 337"
      aria-labelledby={`illustration of ${name}`}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  );
};

export default ServiceIllustration;
