"use client";
import React, { useState, useEffect, useRef } from "react";

type ChunkPosition = [number, number];

interface CoordinateSet {
  [key: string]: ChunkPosition;
}

interface Chunk {
  letters: string;
  coordinateSets: CoordinateSet;
}

const LOGO_STRUCTURE: Chunk[] = [
  {
    letters: "HA",
    coordinateSets: {
      "expanded-up": [0, 3],
      "descending-grid": [0, 0],
      "expanded-down": [0, 0],
      collapsed: [0, 0],
    },
  },
  {
    letters: "NA",
    coordinateSets: {
      "expanded-up": [2, 2],
      "descending-grid": [1, 1],
      "expanded-down": [1, 1],
      collapsed: [2, 0],
    },
  },
  {
    letters: "O",
    coordinateSets: {
      "expanded-up": [4, 1],
      "descending-grid": [2, 2],
      "expanded-down": [2, 2],
      collapsed: [4, 0],
    },
  },
  {
    letters: "KA",
    coordinateSets: {
      "expanded-up": [5, 0],
      "descending-grid": [3, 3],
      "expanded-down": [3, 3],
      collapsed: [5, 0],
    },
  },
  {
    letters: "DE",
    coordinateSets: {
      "expanded-up": [1, 4],
      "descending-grid": [0, 4],
      "expanded-down": [0, 4],
      collapsed: [0, 1],
    },
  },
  {
    letters: "SIGN",
    coordinateSets: {
      "expanded-up": [3, 3],
      "descending-grid": [1, 5],
      "expanded-down": [1, 5],
      collapsed: [2, 1],
    },
  },
  {
    letters: "STU",
    coordinateSets: {
      "expanded-up": [2, 5],
      "descending-grid": [0, 6],
      "expanded-down": [0, 6],
      collapsed: [0, 2],
    },
  },
  {
    letters: "DI",
    coordinateSets: {
      "expanded-up": [5, 4],
      "descending-grid": [1, 7],
      "expanded-down": [1, 7],
      collapsed: [3, 2],
    },
  },
  {
    letters: "O",
    coordinateSets: {
      "expanded-up": [7, 3],
      "descending-grid": [2, 8],
      "expanded-down": [2, 8],
      collapsed: [5, 2],
    },
  },
];

type LogoState =
  | "initial"
  | "expanded"
  | "scrolling-start"
  | "scrolling-mid"
  | "scrolling-end";
type CoordinateSetKey =
  | "expanded-up"
  | "descending-grid"
  | "expanded-down"
  | "collapsed";

const SCROLL_THRESHOLD = 0.8; // 80% scroll threshold
const EXPANDED_DELAY = 3000; // 3 seconds

const AnimatedLogo: React.FC = () => {
  const [state, setState] = useState<LogoState>("initial");
  const [progress, setProgress] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(Date.now());
  const expandedTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setState("expanded"), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (logoRef.current) {
        const now = Date.now();
        lastScrollTime.current = now;

        const rect = logoRef.current.getBoundingClientRect();
        const scrollStart = window.innerHeight;
        const scrollEnd = scrollStart - rect.height;

        if (rect.top <= scrollStart && rect.top >= scrollEnd) {
          const scrollProgress =
            (scrollStart - rect.top) / (scrollStart - scrollEnd);
          setProgress(scrollProgress);

          if (scrollProgress < 0.1) {
            setState("scrolling-start");
          } else if (scrollProgress > SCROLL_THRESHOLD) {
            setState("scrolling-end");
          } else {
            setState("scrolling-mid");
          }
        } else if (rect.top > scrollStart) {
          setProgress(0);
          setState("expanded");
        } else {
          setProgress(1);
          setState("scrolling-end");
        }

        if (expandedTimer.current) {
          clearTimeout(expandedTimer.current);
        }

        expandedTimer.current = setTimeout(() => {
          if (Date.now() - lastScrollTime.current >= EXPANDED_DELAY) {
            setState("expanded");
          }
        }, EXPANDED_DELAY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (expandedTimer.current) {
        clearTimeout(expandedTimer.current);
      }
    };
  }, []);

  const getCoordinateSet = (state: LogoState): CoordinateSetKey => {
    switch (state) {
      case "initial":
        return "expanded-up";
      case "expanded":
        return "expanded-up";
      case "scrolling-start":
        return "descending-grid";
      case "scrolling-mid":
        return "expanded-down";
      case "scrolling-end":
        return "collapsed";
    }
  };

  const getChunkStyle = (chunk: Chunk) => {
    const currentSet = getCoordinateSet(state);
    const targetPosition = chunk.coordinateSets[currentSet];
    const previousSet = getCoordinateSet(
      state === "initial" ? "initial" : "expanded"
    );
    const previousPosition = chunk.coordinateSets[previousSet];

    const x =
      previousPosition[0] +
      (targetPosition[0] - previousPosition[0]) * progress;
    const y =
      previousPosition[1] +
      (targetPosition[1] - previousPosition[1]) * progress;

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
    >
      {LOGO_STRUCTURE.map((chunk, index) => (
        <span
          key={index}
          className={`transition-opacity duration-200 ${
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
