"use client";
import React, { useEffect, useRef, useState } from "react";

interface PrincipleCardProps {
  title: string;
  hiragana: string;
  description: string[];
  summary: string;
}

const PrincipleCard: React.FC<PrincipleCardProps> = ({
  title,
  hiragana,
  description,
  summary,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const parseBoldText = (text: string) => {
    const parts = text.split("*");
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <section
      ref={cardRef}
      className={`flex flex-col gap-16 relative transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative mb-16">
        <h1 className="-ml-0.5 text-4xl relative z-10">{title}</h1>
        <span className="absolute text-nowrap text-8xl text-gray-100 z-0 pl-2.5 -left-4 md:-left-8 -top-8 w-dvw overflow-hidden"> 
          {hiragana}
        </span>
      </div>
      <div>
        {description.map((desc, index) => (
          <p key={index} className="text-pretty text-lg text-gray-700 mb-4">
            {desc}
          </p>
        ))}
      </div>
      <p className="text-md text-gray-800">{parseBoldText(summary)}</p>
    </section>
  );
};

export default PrincipleCard;
