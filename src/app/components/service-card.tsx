"use client";
import React, { useEffect, useRef, useState } from "react";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  deliverable: string;
  example: string[];
  svgElement?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  deliverable,
  example,
  svgElement,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ServicecardRef = useRef<HTMLDivElement>(null);

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

    if (ServicecardRef.current) {
      observer.observe(ServicecardRef.current);
    }

    return () => {
      if (ServicecardRef.current) {
        observer.unobserve(ServicecardRef.current);
      }
    };
  }, []);

  return (
    <article
      ref={ServicecardRef}
      className={`flex flex-col gap-16 relative transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {svgElement && (
        <div className="absolute inset-0 opacity-20">{svgElement}</div>
      )}
      <h2 className="-ml-1 relative text-6xl uppercase">{title}</h2>
      <h3 className="text-lg text-neutral-500 leading-snug mb-16">{subtitle}</h3>
      <div className="">
        <p className="small-caps text-neutral-300 mb-4">Deliverable</p>
        <p>{deliverable}</p>
      </div>
      <div>
        <p className="small-caps text-neutral-300 mb-4">For example</p>
        {example.map((line, index) => (
          <p className='mb-4' key={index}>{line}</p>
        ))}
      </div>
    </article>
  );
};

export default ServiceCard;
