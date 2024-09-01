'use client';
import React, { useEffect, useState } from "react";
import ServiceCard from "./service-card";
import servicesData from "@/lib/data/services.json";

interface Service {
  title: string;
  subtitle: string;
  deliverable: string;
  example: string[];
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices(servicesData);
  }, []);

  return (
    <section className="grid gap-8">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          subtitle={service.subtitle}
          deliverable={service.deliverable}
          example={service.example.join(" ")}
        />
      ))}
    </section>
  );
};

export default Services;
