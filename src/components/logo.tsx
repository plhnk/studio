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

type LogoState =
  | "initial" // Initial state (before page loads).
  | "default" // Default state ==> random loop of 3 coordinate sets (normal, collapsed, descendingGrid).
  | "scrolling-down" // When scrolling down the page.
  | "scrolling-up"; // When scrolling up the page.

type CoordinateSetKey =
  | "normal" // Default logo layout.
  | "collapsed" // Compressed layout of the logo.
  | "descendingGrid" // Grid-like layout for animation.
  | "expandedUp" // Expanded upwards animation.
  | "expandedDown"; // Expanded downwards animation.

const initialLoadDelay = 600; // wait this long to load the logo when the page first loads

interface AnimatedLogoProps {
  className?: string;
  initialState?: LogoState;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ className }) => {
  const [targetSet, setTargetSet] = useState<CoordinateSetKey>("normal");
  const currentPositionsRef = useRef<ChunkPosition[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { trackEvent } = useFathomEvent();
  const logoRef = useRef<HTMLDivElement>(null);

  const logoOptions: CoordinateSetKey[] = [
    "normal",
    "collapsed",
    "descendingGrid",
  ];

  useEffect(() => {
    // Initialize current positions
    currentPositionsRef.current = LOGO_STRUCTURE.map(
      (chunk) => chunk.coordinateSets.normal
    );

    // Set initial random target set
    setTargetSet(getRandom(logoOptions));
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const scrollDistance = window.innerHeight;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDiff = currentScrollY - lastScrollY;

      // Update scroll progress
      setScrollProgress((prev) =>
        Math.max(0, Math.min(1, prev + scrollDiff / scrollDistance))
      );

      // Set target based on scroll direction
      if (scrollDiff > 0) {
        setTargetSet("expandedUp");
      } else if (scrollDiff < 0) {
        setTargetSet("expandedDown");
      }

      // Check if at top or bottom of page
      if (
        currentScrollY <= 0 ||
        currentScrollY + window.innerHeight >=
          document.documentElement.scrollHeight
      ) {
        setTargetSet(getRandom(logoOptions));
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    trackEvent("Logo Click");
    setTargetSet(getRandom(logoOptions));
  };

  const getChunkStyle = (chunk: Chunk, index: number) => {
    const targetPosition = chunk.coordinateSets[targetSet];
    const startPosition =
      currentPositionsRef.current[index] || chunk.coordinateSets.normal;

    const x =
      startPosition[0] +
      (targetPosition[0] - startPosition[0]) * scrollProgress;
    const y =
      startPosition[1] +
      (targetPosition[1] - startPosition[1]) * scrollProgress;

    // Update current position
    currentPositionsRef.current[index] = [x, y];

    return {
      display: "inline-block",
      position: "absolute" as const,
      left: `${x}ch`,
      top: `${y}em`,
      transition: "none", // Always tied to scroll, so no CSS transitions
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
// TODOs
// tweak logo scroll animation: idea -> tie animation to scroll for set amount of value, something like equal to height of logo? that way it feels like user controls the animation
// add hover for logo --> when its expanded, collapse it --> when it's collapsed, expand it
// what the FFFF why wont the logo animate nicely when scrolling up
