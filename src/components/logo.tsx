"use client";
import { cn, getRandom } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { useFathomEvent } from "@/hooks/useFathom";
import logoData from "@/lib/data/logo.json";

type ChunkPosition = [number, number];

interface CoordinateSet {
  [key: string]: ChunkPosition;
}

interface Chunk {
  letters: string;
  coordinateSets: CoordinateSet;
}

const LOGO_STRUCTURE: Chunk[] = logoData as unknown as Chunk[];

type CoordinateSetKey =
  | "normal"
  | "collapsed"
  | "descendingGrid"
  | "expandedUp"
  | "expandedDown";

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  const [targetSet, setTargetSet] = useState<CoordinateSetKey>("normal");
  const currentPositionsRef = useRef<ChunkPosition[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { trackEvent } = useFathomEvent();
  const logoRef = useRef<HTMLDivElement>(null);
  const [isNearBoundary, setIsNearBoundary] = useState(false);

  const logoOptions: CoordinateSetKey[] = [
    "normal",
    "collapsed",
    "descendingGrid",
  ];

  // Smoothly adjust scroll progress and transition to random at boundaries
  const updateScrollTarget = (scrollY: number, maxScroll: number) => {
    const distanceFromTop = scrollY;
    const distanceFromBottom = maxScroll - scrollY;

    // Smooth transition back to random layout near the boundaries
    if (distanceFromTop < 1000 || distanceFromBottom < 1000) {
      setIsNearBoundary(true);
      if (distanceFromTop < 300 || distanceFromBottom < 300) {
        setTargetSet(getRandom(logoOptions)); // Smoothly change at boundaries
      }
    } else {
      setIsNearBoundary(false);
    }

    // Interpolate scroll progress based on how far from top/bottom we are
    const progress = distanceFromTop < 1000 || distanceFromBottom < 1000
      ? 1 - Math.min(distanceFromTop, distanceFromBottom) / 1000
      : 1;
    setScrollProgress(progress);
  };

  useEffect(() => {
    currentPositionsRef.current = LOGO_STRUCTURE.map(
      (chunk) => chunk.coordinateSets.normal
    );

    // Set initial random target set
    setTargetSet(getRandom(logoOptions));
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const maxScrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      updateScrollTarget(currentScrollY, maxScrollHeight);

      // Scroll direction: up or down
      if (scrollDiff > 0 && !isNearBoundary) {
        setTargetSet("expandedUp");
      } else if (scrollDiff < 0 && !isNearBoundary) {
        setTargetSet("expandedDown");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNearBoundary]);

  const handleLogoClick = () => {
    trackEvent("Logo Click");
    setTargetSet(getRandom(logoOptions)); // Randomly switch coordinate sets
  };

  const getChunkStyle = (chunk: Chunk, index: number) => {
    const targetPosition = chunk.coordinateSets[targetSet];
    const startPosition =
      currentPositionsRef.current[index] || chunk.coordinateSets.normal;

    // Interpolate chunk positions based on scroll progress
    const x =
      startPosition[0] +
      (targetPosition[0] - startPosition[0]) * scrollProgress;
    const y =
      startPosition[1] +
      (targetPosition[1] - startPosition[1]) * scrollProgress;

    // Update current position reference
    currentPositionsRef.current[index] = [x, y];

    return {
      display: "inline-block",
      position: "absolute" as const,
      left: `${x}ch`,
      top: `${y}em`,
      transition: isNearBoundary
        ? "transform 1s ease-in-out" // Smooth at boundaries
        : "transform 0.5s ease-out", // Smooth transitions between states
      transform: `translate(${x}px, ${y}px)`, // Apply smooth animation
    };
  };

  return (
    <figure
      onClick={handleLogoClick}
      ref={logoRef}
      className={cn("cursor-pointer", className)}
    >
      {LOGO_STRUCTURE.map((chunk, index) => (
        <span key={index} style={getChunkStyle(chunk, index)}>
          {chunk.letters}
        </span>
      ))}
    </figure>
  );
};

export default AnimatedLogo;
