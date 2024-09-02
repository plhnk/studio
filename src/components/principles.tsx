"use client";
import React from "react";
import PrincipleCard from "./principle-card";
import principlesData from "@/lib/data/principles.json";
import { cn } from "@/lib/utils";

interface PrinciplesProps {
  className?: string;
}

const Principles: React.FC<PrinciplesProps> = ({ className }) => {
  return (
    <article id="How" className={cn("mb-80", className)}>
      <h1 className="small-caps mb-16 text-neutral-600">How We Work</h1>
      <div className="grid gap-80">
        {principlesData.map((principle, index) => (
          <PrincipleCard
            key={index}
            title={principle.title}
            hiragana={principle.hiragana}
            description={principle.description}
            summary={principle.summary}
          />
        ))}
      </div>
    </article>
  );
};

export default Principles;
