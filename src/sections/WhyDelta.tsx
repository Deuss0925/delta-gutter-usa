import { Check, Phone } from "lucide-react";
import { ButtonLink } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { business } from "../config/business";
import homePhoto from "../assets/projects/delta-home-white.webp";

const commitments = [
  "Seamless runs machine-formed on site",
  "Clear written quote before work begins",
  "Installation to manufacturer specifications",
  "Old materials and job-site debris hauled away",
];

export function WhyDelta() {
  return (
    <section className="relative isolate min-h-[42rem] overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
      <img
        src={homePhoto}
        alt="Completed white gutter and downspout system on a home"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_22%]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,20,31,0.18)_0%,rgba(4,20,31,0.58)_48%,rgba(4,20,31,0.96)_100%)]" aria-hidden />

      <div className="mx-auto flex min-h-[30rem] w-full max-w-[90rem] items-center justify-end px-5 sm:px-8">
        <Reveal className="w-full max-w-xl rounded-3xl border border-white/15 bg-navy-950/82 p-7 shadow-2xl backdrop-blur-md sm:p-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
            Why Delta Gutter USA
          </p>
          <h2 className="mt-4 text-4xl leading-tight text-white sm:text-5xl">
            The details matter after the rain starts.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/72">
            We build the complete system around your home: gutters, miters,
            hangers, elbows and downspouts working together to move water away.
          </p>

          <ul className="mt-7 grid gap-3">
            {commitments.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm font-semibold text-white/90">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500 text-navy-950">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact" variant="primary">Get a Free Estimate</ButtonLink>
            <ButtonLink href={business.phone.tel} variant="secondary">
              <Phone className="size-4" aria-hidden />
              {business.phone.display}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
