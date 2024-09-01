'use client';
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
      className={`relative transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative">
        <h1 className="text-3xl font-bold mb-4 relative z-10">{title}</h1>
        <p className="absolute inset-0 text-6xl font-bold text-gray-200 z-0 leading-none">
          {hiragana}
        </p>
      </div>
      {description.map((desc, index) => (
        <p key={index} className="text-lg text-gray-700 mb-4">
          {desc}
        </p>
      ))}
      <p className="text-md text-gray-800">{parseBoldText(summary)}</p>
    </section>
  );
};

export default PrincipleCard;
