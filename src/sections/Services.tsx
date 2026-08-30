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
import installPhoto from "../assets/projects/delta-home-white.webp";
import downspoutPhoto from "../assets/projects/delta-downspout-brown.webp";
import replacementPhoto from "../assets/projects/delta-before.webp";
import accessoriesPhoto from "../assets/projects/delta-miter.webp";
import repairPhoto from "../assets/projects/delta-eave-blue.webp";
import colorPhoto from "../assets/projects/delta-home-yellow.webp";

const icons: Record<string, LucideIcon> = {
  Home,
  ArrowDownToLine,
  Recycle,
  Wrench,
  Hammer,
  Palette,
};

const photos: Record<string, { src: string; position: string }> = {
  installation: { src: installPhoto, position: "object-[50%_24%]" },
  downspouts: { src: downspoutPhoto, position: "object-[50%_35%]" },
  replacement: { src: replacementPhoto, position: "object-[50%_20%]" },
  accessories: { src: accessoriesPhoto, position: "object-[50%_18%]" },
  repairs: { src: repairPhoto, position: "object-[50%_15%]" },
  color: { src: colorPhoto, position: "object-[50%_18%]" },
};

export function Services() {
  const reduced = useReducedMotion();

  return (
    <Section id="services" tone="light" className="relative overflow-hidden">
      <SectionHeading
        tone="light"
        eyebrow="What we do"
        title="Complete gutter care for your home."
        intro="Machine-formed on-site, installed to spec, and cleaned up when we leave — the full seamless gutter system for Triangle homes."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.icon] ?? Wrench;
          const photo = photos[service.id];
          return (
            <Reveal key={service.id} delay={(i % 3) * 0.08} as="div">
              <motion.article
                whileHover={reduced ? undefined : { y: -7 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative min-h-[22rem] overflow-hidden rounded-2xl bg-navy-950 shadow-[0_18px_45px_rgba(4,20,31,0.16)] sm:min-h-[25rem]"
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${photo.position}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/5" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-white/20 bg-navy-950/65 text-blue-300 backdrop-blur-sm">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-2xl text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {service.body}
                </p>
                </div>
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
            className="rounded-full border border-slate-300 bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-steel shadow-sm"
          >
            {chip}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
