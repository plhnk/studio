"use client";
import React from "react";
import ServiceCard from "./service-card";
import servicesData from "@/lib/data/services.json";
import ServiceSprite from "@/components/svg/service-sprite";
import { cn } from "@/lib/utils";

interface ServicesProps {
  className?: string;
}

const Services: React.FC<ServicesProps> = ({ className }) => {
  return (
    <article id="What" className={cn("mb-80", className)}>
      <ServiceSprite />
      <h1 className="small-caps mb-16 text-neutral-600">What We Do</h1>
      <div className="grid gap-80">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            subtitle={service.subtitle}
            deliverable={service.deliverable}
            example={service.example}
          />
        ))}
      </div>
    </article>
  );
};

export default Services;
