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

  return (
    <article
      ref={ServicecardRef}
      className={`flex flex-col gap-16 relative transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute w-dvw md:w-fit md:right-0 md:left-auto md:overflow-visible -left-4 -top-64 -z-[1] overflow-hidden">
        <ServiceIllustration
          className="w-80 float-right md:-mr-12 -mr-16"
          name={illustrationName}
        />
      </div>
      <h2 className="-ml-1 relative text-6xl uppercase text-merino-950">{title}</h2>
      <h3 className="text-lg text-merino-900 leading-snug mb-16">
        {subtitle}
      </h3>
      <div className="">
        <p className="small-caps text-neutral-400 mb-4">Deliverable</p>
        <p>{deliverable}</p>
      </div>
      <div>
        <p className="small-caps text-neutral-400 mb-4">For example</p>
        {example.map((line, index) => (
          <p className="text-pretty mb-4" key={index}>
            {line}
          </p>
        ))}
      </div>
    </article>
  );
};

export default ServiceCard;
