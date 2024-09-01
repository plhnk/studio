import Image from "next/image";
import Services from "./components/services";

export default function Home() {
  return (
    <main className="">
      <section>
        <h1 className="text-[8.5vw] leading-tight mb-8">
          Sustainably grow <br /> your business <br /> by design <br /> with
          technology.
        </h1>
        <div className="flex flex-col gap-16">
          <a>Sounds good, let’s talk</a>
          <a>Tell me more</a>
        </div>
      </section>
      <section>
        <Services />
      </section>
    </main>
  );
}
