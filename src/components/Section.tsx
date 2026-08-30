import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** "dark" (navy) or "light" (surface) band. */
  tone?: "dark" | "light";
};

export function Section({
  id,
  children,
  className = "",
  tone = "dark",
}: SectionProps) {
  const toneClass =
    tone === "light" ? "bg-surface text-ink" : "bg-navy-900 text-ice";
  return (
    <section
      id={id}
      className={`scroll-mt-20 py-16 sm:py-24 lg:py-28 ${toneClass} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
}: SectionHeadingProps) {
  const introColor = tone === "light" ? "text-steel" : "text-ice/70";
  const titleColor = tone === "light" ? "text-ink" : "text-ice";
  const alignment =
    align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";
  return (
    <Reveal className={`mb-10 sm:mb-12 ${alignment}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] ${titleColor}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg ${introColor}`}>{intro}</p>}
    </Reveal>
  );
}
