import { motion } from "motion/react";
import { Section, SectionHeading } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { processSteps } from "../config/content";
import { useReducedMotion } from "../lib/useReducedMotion";

export function Process() {
  const reduced = useReducedMotion();

  return (
    <Section id="process" tone="light">
      <SectionHeading
        tone="light"
        eyebrow="How it works"
        title="Four honest steps, no surprises."
        intro="From your first call to a spotless job site — here's exactly what to expect."
      />

      <div className="relative">
        {/* connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-ink/10 lg:block" aria-hidden>
          <motion.div
            className="h-full origin-left bg-blue-500"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={reduced ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <ol className="grid gap-8 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.12} className="relative">
              <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-2xl bg-blue-500 font-display text-xl font-extrabold text-navy-950 shadow-lg shadow-blue-500/20">
                {step.n}
              </span>
              <h3 className="mt-5 text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-steel">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
