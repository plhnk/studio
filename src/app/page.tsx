"use client";
import Services from "../components/services";
import Principles from "../components/principles";
import Arrow from "../components/svg/arrow";
import { scrollDownByPercentage } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <section
        id="Welcome"
        className="h-dvh flex flex-col justify-between pb-3 col-span-full xl:col-span-6 xl:col-start-4"
      >
        <div className="flex flex-col gap-16 my-32">
          <h1 className="-ml-[.5vw] text-[9.6vw] xl:text-9xl leading-tight mt-8 xl:mt-40">
            Sustainably grow <br /> your business <br /> by design <br /> with
            technology.
          </h1>
          <button className="group flex items-center justify-between w-full xl:w-1/2 text-neutral-800 hover:text-red-600">
            Sounds good, let’s talk
            <Arrow className="group-hover:translate-x-2 lg:-translate-x-4 group-hover:text-neutral-950 transition-all duration-200 ease-in-out" />
          </button>
        </div>
        <button
          onClick={() => scrollDownByPercentage(80)}
          className="group flex items-center justify-between w-full xl:w-1/2 mb-12 text-neutral-800"
        >
          Tell me more
          <Arrow className="rotate-90 absolute translate-x-[calc(50vw-2.5rem)] lg:relative lg:translate-x-6 group-hover:translate-y-2 group-hover:text-red-600 transition-all duration-200 ease-in-out" />
        </button>
      </section>
      <Services className="col-span-full md:col-span-4 md:col-start-2 lg:col-start-5" />
      <Principles className="col-span-full md:col-span-4 md:col-start-3 lg:col-start-6" />
      <section id="Why" className="col-span-full">
        <h1 className="-ml-[.5vw] text-[9.6vw] leading-tight mb-8">
          I believe we can <br /> all do better.
          {/* I believe <br /> we can all <br /> do better. */}
        </h1>
        <p className="mb-4">
          Since childhood, I have had an innate desire to build, grow, and
          improve the world around me.
        </p>
        <p className="mb-4">
          Seeing the impact of technology at scale has inspired me to help
          others use these tools responsibly.
        </p>
      </section>
    </>
  );
}
