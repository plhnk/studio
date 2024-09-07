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
  const serviceCardRef = useRef<HTMLDivElement>(null);

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

    if (serviceCardRef.current) {
      observer.observe(serviceCardRef.current);
    }

    return () => {
      if (serviceCardRef.current) {
        observer.unobserve(serviceCardRef.current);
      }
    };
  }, []);

  return (
    <article
      ref={serviceCardRef}
      className={`flex flex-col gap-16 relative transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute w-dvw md:w-fit md:right-0 md:left-auto md:overflow-visible -left-4 -top-36 sm:-top-64 -z-[1] overflow-hidden">
        <ServiceIllustration
          className="w-56 sm:w-80 float-right md:-mr-12 sm:-mr-16 -mr-24"
          name={illustrationName}
          isVisible={isVisible}
        />
      </div>
      <h2 className="-ml-1 relative text-6xl uppercase text-merino-950 text-shadow-outline shadow-merino-50/20">{title}</h2>
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
