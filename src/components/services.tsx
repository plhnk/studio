"use client";
import React from "react";
import ServiceCard from "./service-card";
import servicesData from "@/lib/data/services.json";

const Services: React.FC = () => {
  return (
    <article id="#What" className='mb-80'>
      <h1 className='small-caps mb-16 text-neutral-600'>What We Do</h1>
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
