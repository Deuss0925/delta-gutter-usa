import { motion } from "motion/react";
import {
  Home,
  ArrowDownToLine,
  Recycle,
  Wrench,
  Hammer,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { services, specChips } from "../config/content";
import { useReducedMotion } from "../lib/useReducedMotion";

const icons: Record<string, LucideIcon> = {
  Home,
  ArrowDownToLine,
  Recycle,
  Wrench,
  Hammer,
  Palette,
};

export function Services() {
  const reduced = useReducedMotion();

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we do"
        title="Everything your gutters need, done right."
        intro="Machine-formed on-site, installed to spec, and cleaned up when we leave — the full seamless gutter system for Triangle homes."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.icon] ?? Wrench;
          return (
            <Reveal key={service.id} delay={(i % 3) * 0.08} as="div">
              <motion.article
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full rounded-2xl border border-ice/10 bg-navy-800/40 p-6 transition-colors hover:border-blue-400/40 hover:bg-navy-800/70"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-blue-500/12 text-blue-400 ring-1 ring-blue-400/20 transition-colors group-hover:bg-blue-500/20">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-xl text-ice">{service.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ice/70">
                  {service.body}
                </p>
              </motion.article>
            </Reveal>
          );
        })}
      </div>

      {/* Spec chips */}
      <Reveal className="mt-10 flex flex-wrap gap-2.5" delay={0.1}>
        {specChips.map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-ice/12 bg-white/[0.03] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ice/75"
          >
            {chip}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
