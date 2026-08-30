import { Check, Wrench, PackageCheck, Clock } from "lucide-react";
import { Section, SectionHeading } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { CountUp } from "../components/CountUp";
import { ButtonLink } from "../components/Button";
import { warranty } from "../config/content";
import { business } from "../config/business";

const cards = [
  { ...warranty.labor, icon: Wrench },
  { ...warranty.materials, icon: PackageCheck },
];

export function Warranty() {
  return (
    <Section id="warranty" tone="light">
      <SectionHeading
        tone="light"
        eyebrow="Backed in writing"
        title={
          <>
            A decade of coverage on{" "}
            <span className="text-blue-600">labor and materials.</span>
          </>
        }
        intro="Two separate 10-year warranties — one for our workmanship, one for the materials — so your investment is protected long after the ladders come down."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {cards.map((card, i) => (
          <Reveal key={card.title} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_16px_44px_rgba(4,20,31,0.08)] transition-colors hover:border-blue-500/40">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20">
                    <card.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-2xl text-ink">{card.title}</h3>
                </div>
                <div className="text-right leading-none">
                  <span className="font-display text-6xl font-extrabold text-blue-600 sm:text-7xl">
                    <CountUp to={card.years} />
                  </span>
                  <span className="mt-1 block font-mono text-xs uppercase tracking-[0.2em] text-steel">
                    Years
                  </span>
                </div>
              </div>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {card.covers.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[15px] text-steel"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-blue-600"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal
        delay={0.15}
        className="mt-8 flex flex-col items-center justify-between gap-5 rounded-2xl border border-blue-500/20 bg-blue-500/[0.06] p-6 sm:flex-row"
      >
        <p className="flex items-center gap-3 text-center text-ink sm:text-left">
          <Clock className="size-5 shrink-0 text-blue-600" aria-hidden />
          <span className="font-semibold">
            {business.credentials.claimsWindow}.
          </span>
          <span className="text-steel">
            Certificate of Insurance available on request.
          </span>
        </p>
        <ButtonLink href="#contact" variant="primary" className="shrink-0">
          Get a Free Estimate
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
