"use client";
import { cn, getRandom } from "@/lib/utils"; // Utility functions for className concatenation (cn) and generating a random item (getRandom).
import React, { useState, useEffect, useRef } from "react";
import { useFathomEvent } from "@/hooks/useFathom"; // Custom hook for tracking events with Fathom Analytics.
import logoData from "@/lib/data/logo.json"; // Import logo structure data from a JSON file.

type ChunkPosition = [number, number]; // Defines a tuple representing X and Y coordinates.

interface CoordinateSet {
  [key: string]: ChunkPosition; // Each key represents a specific layout, with a value being its coordinates.
}

interface Chunk {
  letters: string; // The text (letters) associated with the chunk of the logo.
  coordinateSets: CoordinateSet; // A set of coordinates for each layout.
}

const LOGO_STRUCTURE: Chunk[] = logoData as unknown as Chunk[]; // Cast the imported JSON data into a Chunk array.

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

const initialLoadDelay = 800; // wait this long to load the logo when the page first loads

interface AnimatedLogoProps {
  className?: string; // Optional className for additional styling.
  initialState?: LogoState; // Optional initial state for the logo.
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  initialState = "initial", // Default logo state.
  className,
}) => {
  const [state, setState] = useState<LogoState>(initialState); // Tracks the current state of the logo.
  const [progress, setProgress] = useState(0); // Progress of the current animation (0-1 range).
  const [currentRandomSet, setCurrentRandomSet] =
    useState<CoordinateSetKey>("normal"); // The current layout set for the logo (randomly selected).
  const [previousSet, setPreviousSet] = useState<CoordinateSetKey>("normal"); // Tracks the previous layout set to animate between transitions.
  const logoRef = useRef<HTMLDivElement>(null); // Reference to the logo container DOM element.
  const lastScrollTime = useRef(Date.now()); // Stores the time of the last scroll event.
  const expandedTimer = useRef<NodeJS.Timeout | null>(null); // Timer for expanding the logo after scrolling stops.
  const animationFrameRef = useRef<number | null>(null); // Reference for managing animation frames (requestAnimationFrame).
  const { trackEvent } = useFathomEvent(); // Initialize Fathom Analytics event tracking.

  const logoOptions: CoordinateSetKey[] = [
    "normal",
    "collapsed",
    "descendingGrid",
  ]; // Possible random logo layouts for static states (initial, expanded, paused).

  // Determines which coordinate set to use based on the current state.
  const getCoordinateSet = (state: LogoState): CoordinateSetKey => {
    switch (state) {
      case "initial":
      case "default":
        // case "expanded":
        // case "scrolling-pause":
        return currentRandomSet; // Use a randomly selected set for these states.
      case "scrolling-down":
        return "expandedUp"; // Use the expanded-up layout while scrolling down.
      case "scrolling-up":
        return "expandedDown"; // Use the expanded-down layout while scrolling up.
      default:
        return "normal"; // Default to the normal layout.
    }
  };

  // Handles clicks on the logo and tracks the event with Fathom.
  const handleLogoClick: React.MouseEventHandler<HTMLElement> = () => {
    setCurrentRandomSet(getRandom(logoOptions));
    trackEvent("Logo Click");
    console.log("clicked");
    console.log(setCurrentRandomSet);
  };

  // Effect to change the random layout set whenever the state changes.
  useEffect(() => {
    // if (["initial", "expanded", "scrolling-pause"].includes(state)) {
    if (["initial", "default"].includes(state)) {
      setCurrentRandomSet(getRandom(logoOptions)); // Select a random layout when in these states.
    }
  }, [state]);

  useEffect(() => {
    const timer = setTimeout(() => setState("default"), initialLoadDelay); // animate in on initial load
    return () => clearTimeout(timer); // Clean up the timer if the component unmounts.
  }, []);

  // Animates the progress from the current value to a target value over a specific duration.
  const animateToTarget = (target: number, duration: number) => {
    const startTime = performance.now(); // Records the start time of the animation.
    const startProgress = progress; // Stores the initial progress value.

    // Recursive animation function.
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime; // Time elapsed since the animation started.
      if (elapsedTime < duration) {
        const newProgress =
          startProgress + (target - startProgress) * (elapsedTime / duration); // Linear interpolation between start and target.
        setProgress(newProgress); // Updates the animation progress.
        animationFrameRef.current = requestAnimationFrame(animate); // Request the next frame of the animation.
      } else {
        setProgress(target); // Ensure we reach the target progress.
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current); // Cancel any ongoing animation if one exists.
    }
    animationFrameRef.current = requestAnimationFrame(animate); // Start a new animation frame.
  };

  // Effect to handle scrolling and animate the logo based on scroll direction.
  useEffect(() => {
    let lastScrollY = window.scrollY; // Store the last Y position of the scroll.
    let scrollTimer: NodeJS.Timeout | null = null; // Timer for detecting scroll pause.
    const scrollDistance = window.innerHeight; // Full screen height, used to normalize scroll distance.

    const handleScroll = () => {
      if (logoRef.current) {
        const currentScrollY = window.scrollY; // Get the current scroll Y position.
        const now = Date.now();
        lastScrollTime.current = now; // Update the time of the last scroll event.

        const scrollDiff = currentScrollY - lastScrollY; // Difference in scroll positions (positive = down, negative = up).
        const newProgress = Math.max(
          0,
          Math.min(1, progress + scrollDiff / scrollDistance)
        ); // Calculate new progress based on scroll distance.
        setProgress(newProgress); // Update the progress of the animation.

        if (currentScrollY > lastScrollY) {
          setState("scrolling-down"); // Change to scrolling-down state if the scroll is downwards.
        } else if (currentScrollY < lastScrollY) {
          setState("scrolling-up"); // Change to scrolling-up state if scrolling upwards.
        }

        lastScrollY = currentScrollY; // Update the last scroll Y position.

        // When user reaches the top or bottom of the page, set the logo to default.
        if (
          currentScrollY <= 0 ||
          currentScrollY + window.innerHeight >=
            document.documentElement.scrollHeight
        ) {
          setState("default");
        }
      }
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener.
    return () => {
      window.removeEventListener("scroll", handleScroll); // Remove scroll event listener on cleanup.
      if (scrollTimer) clearTimeout(scrollTimer); // Clear the scroll timer on cleanup.
      if (expandedTimer.current) clearTimeout(expandedTimer.current); // Clear the expand timer on cleanup.
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current); // Cancel any ongoing animations on cleanup.
    };
  }, [progress]);

  // Update the previous coordinate set when the logo state changes.
  useEffect(() => {
    if (state !== "scrolling-down" && state !== "scrolling-up") {
      setPreviousSet(getCoordinateSet(state)); // Update the previous set unless actively scrolling.
    }
  }, [state]);

  const getChunkStyle = (chunk: Chunk, index: number) => {
    const currentSet = getCoordinateSet(state);
    const targetPosition = chunk.coordinateSets[currentSet];
    let startSet: CoordinateSetKey = previousSet;

    if (
      state === "scrolling-down" ||
      state === "default"
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
