'use client';
import Services from "../components/services";
import Principles from "../components/principles";
import Arrow from "../components/svg/arrow";
import { scrollDownByPercentage } from "@/lib/utils";

export default function Home() {
  return (
    <>
      <section
        id="Welcome"
        className="h-dvh flex flex-col justify-between pb-3"
      >
        <div className="flex flex-col gap-16 my-32">
          <h1 className="-ml-[.5vw] text-[9.6vw] leading-tight mt-8">
            Sustainably grow <br /> your business <br /> by design <br /> with
            technology.
          </h1>
          <button className="group flex items-center justify-between w-full text-neutral-800 hover:text-red-500">
            Sounds good, let’s talk
            <Arrow className="group-hover:translate-x-2 group-hover:text-neutral-950 transition-all duration-200 ease-in-out" />
          </button>
        </div>
        <button
          onClick={() => scrollDownByPercentage(80)}
          className="group flex items-center justify-between w-full mb-12 text-neutral-800"
        >
          Tell me more
          <Arrow className="rotate-90 absolute translate-x-[calc(50vw-2.5rem)] group-hover:translate-y-2 group-hover:text-red-500 transition-all duration-200 ease-in-out" />
        </button>
      </section>
      <Services />
      <Principles />
      <section id="Why">
        <h1 className="-ml-[.5vw] text-[9.6vw] leading-tight mb-8">
          I believe we can <br /> all do better.
          {/* I believe <br /> we can all <br /> do better. */}
        </h1>
        <p>
          Since childhood, I have had an innate desire to build, grow, and
          improve the world around me.
        </p>
        <p>
          Seeing the impact of technology at scale has inspired me to help
          others use these tools responsibly.
        </p>
      </section>
    </>
  );
}
