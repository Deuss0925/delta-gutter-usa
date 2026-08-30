import { ArrowRight, Phone } from "lucide-react";
import { ButtonLink } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { business } from "../config/business";
import gutterPhoto from "../assets/projects/delta-guard-long.webp";

export function PhotoCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <img
        src={gutterPhoto}
        alt="Long gutter run fitted along a shingle roof"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_52%]"
      />
      <div className="absolute inset-0 -z-10 bg-navy-950/75" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_40%,rgba(10,144,200,0.28),transparent_38%)]" aria-hidden />

      <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
          Protect your home from the roofline down
        </p>
        <h2 className="mt-5 text-4xl text-white sm:text-6xl">
          Ready for gutters built to fit your home?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">
          Schedule a free on-site estimate anywhere in Raleigh and the Triangle.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="#contact" variant="primary" className="px-8 py-3.5">
            Request an estimate
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href={business.phone.tel} variant="secondary" className="px-8 py-3.5">
            <Phone className="size-4" aria-hidden />
            Call {business.phone.display}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
