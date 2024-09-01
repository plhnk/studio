import Image from "next/image";
import Services from "./components/services";
import Principles from "./components/principles";

export default function Home() {
  return (
    <main className="">
      <section id="#Welcome">
        <h1 className="text-[8.5vw] leading-tight mb-8">
          Sustainably grow <br /> your business <br /> by design <br /> with
          technology.
        </h1>
        <div className="flex flex-col gap-16 mb-80">
          <a>Sounds good, let’s talk</a>
          <a>Tell me more</a>
        </div>
      </section>
      <Services />
      <Principles />
      <section id="#Why">
        <h1 className="text-[8.5vw] leading-tight mb-8">
          I believe <br /> we can all <br /> do better.
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
    </main>
  );
}
