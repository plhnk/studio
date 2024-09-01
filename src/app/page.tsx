import Image from "next/image";
import Services from "./components/services";
import Principles from "./components/principles";

export default function Home() {
  return (
    <main className="">
      <section>
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
    </main>
  );
}
