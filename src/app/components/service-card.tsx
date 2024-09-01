"use client";
import React, { useEffect, useRef, useState } from "react";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  deliverable: string;
  example: string;
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
      className={`relative transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {svgElement && (
        <div className="absolute inset-0 opacity-20">{svgElement}</div>
      )}
      <h2 className="relative text-2xl font-bold mb-4">{title}</h2>
      <h3 className="text-lg text-gray-700 mb-4">{subtitle}</h3>
      <div className="mb-4">
        <p className="small-caps text-gray-500 mb-1">
          Deliverable
        </p>
        <p>{deliverable}</p>
      </div>
      <div>
        <p className="small-caps text-gray-500 mb-1">
          For example
        </p>
        <p>{example}</p>
      </div>
    </article>
  );
};

export default ServiceCard;
