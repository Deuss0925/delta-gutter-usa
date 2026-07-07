import { useState, useId } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { careFaqs, businessFaqs } from "../config/content";
import { useReducedMotion } from "../lib/useReducedMotion";

const allFaqs = [...careFaqs, ...businessFaqs];

function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const panelId = useId();
  const btnId = useId();

  return (
    <div className="border-b border-ice/10">
      <h3>
        <button
          id={btnId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
        >
          <span className="text-lg font-semibold text-ice">{q}</span>
          <ChevronDown
            className={`size-5 shrink-0 text-blue-400 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-ice/70">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Care & questions"
          title="Keep your gutters flowing."
          intro="Simple maintenance tips and straight answers — so your system keeps protecting your home for years."
        />

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-ice/10 bg-navy-800/30 px-6">
            {allFaqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                q={faq.q}
                a={faq.a}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
