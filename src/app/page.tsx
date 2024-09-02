import Services from "../components/services";
import Principles from "../components/principles";
import Arrow from "../components/svg/arrow";

export default function Home() {
  return (
    <main>
      <section id="#Welcome">
        <h1 className="-ml-[.5vw] text-[9.6vw] leading-tight mb-8">
          Sustainably grow <br /> your business <br /> by design <br /> with
          technology.
        </h1>
        <div className="flex flex-col gap-16 mb-80">
          <button className="flex items-center justify-between w-full">
            Sounds good, let’s talk
            <Arrow />
          </button>
          <button className="flex items-center justify-between w-full">
            Tell me more
            <Arrow className="rotate-90 absolute translate-x-[calc(50vw-2.5rem)]" />
          </button>
        </div>
      </section>
      <Services />
      <Principles />
      <section id="#Why">
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
    </main>
  );
}
