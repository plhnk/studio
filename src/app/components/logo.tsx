"use client";
import React, { useState, useEffect, useRef } from "react";

interface ChunkPosition {
  x: number;
  y: number;
}

interface ChunkState {
  initial: ChunkPosition;
  expanded: ChunkPosition;
  collapsed: ChunkPosition;
}

interface Chunk {
  letters: string;
  states: ChunkState;
}

const LOGO_STRUCTURE: Chunk[] = [
  {
    letters: "HA",
    states: {
      initial: { x: 0, y: 3 },
      expanded: { x: 0, y: 3 },
      collapsed: { x: 0, y: 0 },
    },
  },
  {
    letters: "NA",
    states: {
      initial: { x: 2, y: 2 },
      expanded: { x: 3, y: 2 },
      collapsed: { x: 2, y: 0 },
    },
  },
  {
    letters: "O",
    states: {
      initial: { x: 4, y: 1 },
      expanded: { x: 5, y: 1 },
      collapsed: { x: 4, y: 0 },
    },
  },
  {
    letters: "KA",
    states: {
      initial: { x: 5, y: 0 },
      expanded: { x: 6, y: 0 },
      collapsed: { x: 5, y: 0 },
    },
  },
  {
    letters: "DE",
    states: {
      initial: { x: 2, y: 4 },
      expanded: { x: 2, y: 4 },
      collapsed: { x: 1, y: 1 },
    },
  },
  {
    letters: "SIGN",
    states: {
      initial: { x: 4, y: 3 },
      expanded: { x: 4, y: 3 },
      collapsed: { x: 3, y: 1 },
    },
  },
  {
    letters: "STU",
    states: {
      initial: { x: 3, y: 5 },
      expanded: { x: 3, y: 5 },
      collapsed: { x: 2, y: 2 },
    },
  },
  {
    letters: "DI",
    states: {
      initial: { x: 6, y: 4 },
      expanded: { x: 6, y: 4 },
      collapsed: { x: 5, y: 2 },
    },
  },
  {
    letters: "O",
    states: {
      initial: { x: 8, y: 3 },
      expanded: { x: 8, y: 3 },
      collapsed: { x: 7, y: 2 },
    },
  },
];

type LogoState = "initial" | "expanded" | "collapsed";

const AnimatedLogo: React.FC = () => {
  const [state, setState] = useState<LogoState>("initial");
  const [progress, setProgress] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Transition from initial to expanded after 3 seconds
    const timer = setTimeout(() => setState("expanded"), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        const scrollStart = window.innerHeight;
        const scrollEnd = scrollStart - rect.height;

        if (rect.top <= scrollStart && rect.top >= scrollEnd) {
          const scrollProgress =
            (scrollStart - rect.top) / (scrollStart - scrollEnd);
          setProgress(scrollProgress);
          setState("collapsed");
        } else if (rect.top > scrollStart) {
          setProgress(0);
          setState("expanded");
        } else {
          setProgress(1);
          setState("collapsed");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getChunkStyle = (chunk: Chunk) => {
    const currentState = state === "collapsed" ? "collapsed" : state;
    const targetPosition = chunk.states[currentState];
    const previousPosition =
      chunk.states[state === "collapsed" ? "expanded" : "initial"];

    const x =
      previousPosition.x + (targetPosition.x - previousPosition.x) * progress;
    const y =
      previousPosition.y + (targetPosition.y - previousPosition.y) * progress;

    return {
      display: "inline-block",
      position: "absolute" as const,
      left: `${x}ch`,
      top: `${y}em`,
      transition: state === "initial" ? "none" : "all 0.5s ease-in-out",
    };
  };

  return (
    <div
      ref={logoRef}
      className="text-lg relative"
      style={{ height: "6em", width: "8ch" }}
    >
      {LOGO_STRUCTURE.map((chunk, index) => (
        <span
          key={index}
          className={`transition-opacity duration-500 ${
            state === "initial" ? "opacity-0" : "opacity-100"
          }`}
          style={getChunkStyle(chunk)}
        >
          {chunk.letters}
        </span>
      ))}
    </div>
  );
};

export default AnimatedLogo;
