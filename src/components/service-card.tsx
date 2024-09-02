"use client";
import React, { useEffect, useRef, useState } from "react";
import ServiceIllustration from "../components/svg/service-illustration";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  deliverable: string;
  example: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  deliverable,
  example,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ServicecardRef = useRef<HTMLDivElement>(null);

  const illustrationName = title.toLowerCase();

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

  // Helper function to split the title if needed
  const renderTitle = () => {
    if (title === "Develop" || title === "Maintain") {
      const firstPart = title.slice(0, 5);
      const secondPart = title.slice(5);

      return (
        <>
          <span>{firstPart}</span>
          <span className="text-white">{secondPart}</span>
        </>
      );
    }

    return title;
  };

  return (
    <article
      ref={ServicecardRef}
      className={`flex flex-col gap-16 relative transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute w-dvw -left-4 -top-56 -z-[1] overflow-hidden">
        <ServiceIllustration
          className="w-72 float-right -mr-12"
          name={illustrationName}
        />
      </div>
      <h2 className="-ml-1 relative text-6xl uppercase">{renderTitle()}</h2>
      <h3 className="text-lg text-neutral-500 leading-snug mb-16">
        {subtitle}
      </h3>
      <div className="">
        <p className="small-caps text-neutral-300 mb-4">Deliverable</p>
        <p>{deliverable}</p>
      </div>
      <div>
        <p className="small-caps text-neutral-300 mb-4">For example</p>
        {example.map((line, index) => (
          <p className="mb-4" key={index}>
            {line}
          </p>
        ))}
      </div>
    </article>
  );
};

export default ServiceCard;