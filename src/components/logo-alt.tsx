"use client";
import { useEffect, useState, useRef } from "react";
import logoData from "../lib/data/logo.json"; // Adjust path if necessary

type CoordinateState =
  | "expandedUp"
  | "descendingGrid"
  | "expandedDown"
  | "normal"
  | "collapsed";

interface Chunk {
  letters: string;
  coordinateSets: {
    expandedUp: number[];
    descendingGrid: number[];
    expandedDown: number[];
    normal: number[];
    collapsed: number[];
  };
}

const Logo = ({ className }: { className?: string }) => {
  const logoRef = useRef<HTMLElement>(null);
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<
    "scrolling-up" | "scrolling-down" | "rest"
  >("rest");
  const [progress, setProgress] = useState(0); // Progress between 0 and 1
  const [logoCoordinates, setLogoCoordinates] = useState<number[][]>(() =>
    getInitialCoordinates()
  );
  const [state, setState] = useState<CoordinateState>("normal");
  const animationFrameRef = useRef<number | null>(null);

  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollDistance = 500; // Adjust this to match the scroll range for full movement

  const EXPANDED_DELAY = 1000; // Adjust based on how long before expanded state sets
  const PAUSE_TRANSITION_DURATION = 300; // Duration for the transition to pause state
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

  // Get the initial coordinate set for 'normal'
  function getInitialCoordinates() {
    return logoData.map((chunk: Chunk) => chunk.coordinateSets.normal);
  }

  // Function to handle scroll
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const now = Date.now();
    lastScrollTime.current = now;

    const scrollDiff = currentScrollY - lastScrollY.current;
    const newProgress = Math.max(
      0,
      Math.min(1, progress + scrollDiff / scrollDistance)
    );
    setProgress(newProgress);

    if (currentScrollY > lastScrollY.current) {
      setScrollDirection("scrolling-down");
      setState("expandedDown"); // Move to expanded down when scrolling down
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection("scrolling-up");
      setState("expandedUp"); // Move to expanded up when scrolling up
    }

    lastScrollY.current = currentScrollY;

    // Set scroll timeout for pause state
    setTimeout(() => {
      setState("normal");
      animateToTarget(1, PAUSE_TRANSITION_DURATION);
    }, 500);

    // After delay, set to expanded if no scroll
    setTimeout(() => {
      if (Date.now() - lastScrollTime.current >= EXPANDED_DELAY) {
        setState("expandedDown");
      }
    }, EXPANDED_DELAY);

    // Handle the top and bottom edges of the page
    if (
      currentScrollY <= 0 ||
      currentScrollY + window.innerHeight >=
        document.documentElement.scrollHeight
    ) {
      setState("expandedUp");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [progress]);

  // Function to calculate new coordinates based on the progress
  const getChunkStyle = (chunk: Chunk, index: number) => {
    const [x, y] = logoCoordinates[index];

    const scrollFactor =
      scrollDirection === "scrolling-down" ? progress : -progress;

    return {
      display: "inline-block",
      position: "absolute" as const,
      left: `${x + scrollFactor * 5}ch`, // Adjust the multiplier for speed
      top: `${y + scrollFactor * 2}em`, // Adjust the multiplier for speed
      transition: `all 0.5s ease-in-out`, // Smooth transition
    };
  };

  return (
    <figure
      onClick={() => setState("collapsed")} // Example: Collapse logo on click
      ref={logoRef}
      className={className}
    >
      {logoData.map((chunk: Chunk, index: number) => (
        <span key={index} style={getChunkStyle(chunk, index)}>
          {chunk.letters}
        </span>
      ))}
    </figure>
  );
};

export default Logo;
