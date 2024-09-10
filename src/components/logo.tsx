"use client";
import { cn, getRandom } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { useFathomEvent } from "@/hooks/useFathom";

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
      "expanded-up": [0, 3], // logo state
      "descending-grid": [0, 0],
      "expanded-down": [0, 0],
      normal: [0, 0],
      collapsed: [0, 0],
    },
  },
  {
    letters: "NA",
    coordinateSets: {
      "expanded-up": [2, 2],
      "descending-grid": [2, 0],
      "expanded-down": [1, 1],
      normal: [2, 0],
      collapsed: [2, 0],
    },
  },
  {
    letters: "O",
    coordinateSets: {
      "expanded-up": [4, 1],
      "descending-grid": [3, 1],
      "expanded-down": [2, 2],
      normal: [4, 0],
      collapsed: [4, 0],
    },
  },
  {
    letters: "KA",
    coordinateSets: {
      "expanded-up": [5, 0],
      "descending-grid": [4, 1],
      "expanded-down": [3, 3],
      normal: [5, 0],
      collapsed: [5, 0],
    },
  },
  {
    letters: "DE",
    coordinateSets: {
      "expanded-up": [1, 4],
      "descending-grid": [0, 2],
      "expanded-down": [0, 4],
      normal: [0, 1],
      collapsed: [1, 1],
    },
  },
  {
    letters: "SIGN",
    coordinateSets: {
      "expanded-up": [3, 3],
      "descending-grid": [2, 2],
      "expanded-down": [1, 5],
      normal: [2, 1],
      collapsed: [3, 1],
    },
  },
  {
    letters: "STU",
    coordinateSets: {
      "expanded-up": [2, 5],
      "descending-grid": [0, 3],
      "expanded-down": [0, 6],
      normal: [1, 2],
      collapsed: [2, 2],
    },
  },
  {
    letters: "DI",
    coordinateSets: {
      "expanded-up": [5, 4],
      "descending-grid": [3, 3],
      "expanded-down": [1, 7],
      normal: [4, 2],
      collapsed: [5, 2],
    },
  },
  {
    letters: "O",
    coordinateSets: {
      "expanded-up": [7, 3],
      "descending-grid": [5, 3],
      "expanded-down": [2, 8],
      normal: [6, 2],
      collapsed: [7, 2],
    },
  },
];

type LogoState =
  | "initial" // --> normal | collapsed | descending-grid
  | "expanded" // --> normal | collapsed | descending-grid
  | "scrolling-down" // --> expanded-up
  | "scrolling-up" // --> expanded-down
  | "scrolling-pause"; // --> normal | collapsed | descending-grid
type CoordinateSetKey =
  | "normal" // HANAOKA / DESIGN / _STUDIO
  | "collapsed" // HANAOKA / _DESIGN / __STUDIO
  | "descending-grid" // HANA / OKA / DESIGN / STUDIO
  | "expanded-up" // HA / NA / O / KA / DE / SIGN / STU / DI / O --> UP
  | "expanded-down"; // HA / NA / O / KA / DE / SIGN / STU / DI / O --> DOWN

const EXPANDED_DELAY = 800; // delay to expand after scrolling stops
const PAUSE_TRANSITION_DURATION = 500;

interface AnimatedLogoProps {
  className?: string;
  initialState?: LogoState;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  initialState = "initial",
  className,
}) => {
  const [state, setState] = useState<LogoState>(initialState);
  const [progress, setProgress] = useState(0);
  const [currentRandomSet, setCurrentRandomSet] =
    useState<CoordinateSetKey>("normal");
  const [previousSet, setPreviousSet] = useState<CoordinateSetKey>("normal");
  const logoRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(Date.now());
  const expandedTimer = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const logoOptions: CoordinateSetKey[] = [
    "normal",
    "collapsed",
    "descending-grid",
  ];

  const getCoordinateSet = (state: LogoState): CoordinateSetKey => {
    switch (state) {
      case "initial":
      case "expanded":
      // return "expanded-down";
      case "scrolling-pause":
        return currentRandomSet;
      case "scrolling-down":
        return "expanded-up";
      case "scrolling-up":
        return "expanded-down";
      default:
        return "normal";
    }
  };
  const { trackEvent } = useFathomEvent();

  const handleLogoClick: React.MouseEventHandler<HTMLElement> = (event) => {
    trackEvent("Logo Click");
  };

  useEffect(() => {
    if (["initial", "expanded", "scrolling-pause"].includes(state)) {
      setCurrentRandomSet(getRandom(logoOptions));
    }
  }, [state]);

  useEffect(() => {
    const timer = setTimeout(() => setState("expanded"), 1000);
    return () => clearTimeout(timer);
  }, []);

  const animateToTarget = (target: number, duration: number) => {
    const startTime = performance.now();
    const startProgress = progress;

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const newProgress =
          startProgress + (target - startProgress) * (elapsedTime / duration);
        setProgress(newProgress);
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(target);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimer: NodeJS.Timeout | null = null;
    const scrollDistance = window.innerHeight;

    const handleScroll = () => {
      if (logoRef.current) {
        const currentScrollY = window.scrollY;
        const now = Date.now();
        lastScrollTime.current = now;

        const scrollDiff = currentScrollY - lastScrollY;
        const newProgress = Math.max(
          0,
          Math.min(1, progress + scrollDiff / scrollDistance)
        );
        setProgress(newProgress);

        if (currentScrollY > lastScrollY) {
          setState("scrolling-down");
        } else if (currentScrollY < lastScrollY) {
          setState("scrolling-up");
        }

        lastScrollY = currentScrollY;

        if (scrollTimer) clearTimeout(scrollTimer);
        if (expandedTimer.current) clearTimeout(expandedTimer.current);

        scrollTimer = setTimeout(() => {
          setState("scrolling-pause");
          animateToTarget(1, PAUSE_TRANSITION_DURATION);
        }, 500);

        expandedTimer.current = setTimeout(() => {
          if (Date.now() - lastScrollTime.current >= EXPANDED_DELAY) {
            setState("expanded");
          }
        }, EXPANDED_DELAY);

        if (
          currentScrollY <= 0 ||
          currentScrollY + window.innerHeight >=
            document.documentElement.scrollHeight
        ) {
          setState("expanded");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
      if (expandedTimer.current) clearTimeout(expandedTimer.current);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [progress]);

  useEffect(() => {
    if (state !== "scrolling-down" && state !== "scrolling-up") {
      setPreviousSet(getCoordinateSet(state));
    }
  }, [state]);

  const getChunkStyle = (chunk: Chunk, index: number) => {
    const currentSet = getCoordinateSet(state);
    const targetPosition = chunk.coordinateSets[currentSet];
    let startSet: CoordinateSetKey = previousSet;

    if (
      state === "scrolling-down" ||
      // state === "scrolling-up" ||
      state === "scrolling-pause"
    ) {
      startSet = previousSet;
    } else if (state === "scrolling-up") {
      startSet = getCoordinateSet(state);
    }

    const startPosition = chunk.coordinateSets[startSet];
    const x =
      startPosition[0] + (targetPosition[0] - startPosition[0]) * progress;
    const y =
      startPosition[1] + (targetPosition[1] - startPosition[1]) * progress;

    return {
      display: "inline-block",
      position: "absolute" as const,
      left: `${x}ch`,
      top: `${y}em`,
      transition:
        state === "scrolling-down" || state === "scrolling-up"
          ? "none"
          : `all 0.5s ease-in-out ${index * 100}ms`,
    };
  };

  return (
    <figure
      onClick={handleLogoClick}
      ref={logoRef}
      className={cn("cursor-pointer", className)}
    >
      {LOGO_STRUCTURE.map((chunk, index) => (
        <span
          key={index}
          className={`transition-all duration-200 ${
            state === "initial"
              ? "opacity-0 translate-y-3"
              : "opacity-100 translate-y-0"
          }`}
          style={getChunkStyle(chunk, index)}
        >
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
