"use client";
import Services from "../components/services";
import Principles from "../components/principles";
import Arrow from "../components/svg/arrow";
import { scrollDownByPercentage } from "@/lib/utils";
import Link from "next/link";
import { useFathomEvent } from "@/hooks/useFathom";

export default function Home() {
  const { trackEvent } = useFathomEvent();
  const handleScrollClick = () => {
    trackEvent("Homepage Scroll Button Click");
    scrollDownByPercentage(84);
  };
  return (
    <>
      <section
        id="Welcome"
        className="h-dvh flex flex-col pb-3 col-span-full xl:col-span-10 xl:col-start-2"
      >
        <div className="flex flex-col grow justify-center gap-16">
          <h1 className="-ml-[.5vw] text-[9.6vw] xl:text-9xl leading-none mt-8">
            Sustainably grow <br /> your business <br /> by design <br /> with
            technology.
          </h1>
          <Link
            className="group flex items-center justify-between w-full md:w-1/2 text-neutral-950 hover:text-red-600"
            href="/contact"
          >
            Sounds good, let’s talk
            <Arrow className="group-hover:translate-x-4 group-hover:text-neutral-950 transition-all duration-200 ease-in-out" />
          </Link>
        </div>
        <button
          onClick={handleScrollClick}
          className="group flex items-center justify-between w-full md:w-1/2 mb-12 text-neutral-950"
        >
          Tell me more
          <Arrow className="rotate-90 absolute translate-x-[calc(50vw-2.5rem)] md:relative md:translate-x-6 group-hover:translate-y-2 group-hover:text-red-600 transition-all duration-200 ease-in-out" />
        </button>
      </section>
      <Services className="col-span-full md:col-span-4 md:col-start-2 lg:col-start-4" />
      <Principles className="col-span-full md:col-span-4 md:col-start-3 lg:col-start-5" />
      <section id="Why" className="col-span-full grid grid-cols-subgrid">
        <h1 className="-ml-[.5vw] text-[9.6vw] leading-none mb-8 col-span-full">
          I believe we can <br /> all do better.
        </h1>
        <div className="flex flex-col gap-4 col-span-3">
          <p>
            Since childhood, I’ve had an innate desire to build, grow, and
            improve the world around me.
          </p>
          <p>
            Seeing the impact of technology at scale has inspired me to help
            others use these tools responsibly.
          </p>
        </div>
      </section>
    </>
  );
}
