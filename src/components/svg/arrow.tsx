import React from "react";
import { cn } from "@/lib//utils";

interface ArrowProps {
  className?: string;
}

const Arrow: React.FC<ArrowProps> = ({ className }) => {
  return (
      <svg
      className={cn("w-12", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    >
      <path d="M40 16L46 24L40 32" />
      <path d="M2 24H46" />
    </svg>
  );
};

export default Arrow;
