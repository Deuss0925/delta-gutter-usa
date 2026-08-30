import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { ButtonLink } from "../components/Button";
import { HeroQuoteForm } from "../components/HeroQuoteForm";
import { business } from "../config/business";
import { useReducedMotion } from "../lib/useReducedMotion";
import heroPhoto from "../assets/projects/delta-home-yellow.webp";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex items-center overflow-hidden bg-navy-950 lg:min-h-[100svh]"
    >
      <img
        src={heroPhoto}
        alt="Finished gutter and downspout installation on a Triangle-area home"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_28%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,20,31,0.96)_0%,rgba(4,20,31,0.84)_42%,rgba(4,20,31,0.38)_72%,rgba(4,20,31,0.48)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-950 to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-9 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 xl:grid-cols-[1.15fr_minmax(22rem,27rem)] xl:gap-16 xl:pb-24 xl:pt-36">
        <motion.div
          className="max-w-2xl"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="inline-flex rounded-full border border-blue-400/35 bg-navy-950/45 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-blue-300 backdrop-blur-sm">
            Local gutter specialists · Raleigh &amp; the Triangle
          </p>

          <h1 className="mt-5 max-w-3xl text-[2.7rem] leading-[0.98] text-white sm:mt-6 sm:text-6xl xl:text-[4.75rem]">
            Seamless gutters.
            <span className="block text-blue-300">Built around your home.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:mt-6 sm:text-xl">
            Installation, replacement and repair for Triangle homes — formed
            on site and backed by 10-year labor and materials warranties.
          </p>

          <ul className="mt-6 grid max-w-xl gap-3 text-sm font-semibold text-white/90 sm:mt-7 sm:grid-cols-3">
            {["Free on-site estimates", "Licensed & insured", "English & Español"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0 text-blue-300" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <ButtonLink href="#contact" variant="primary" className="px-7 py-3.5 shadow-xl shadow-navy-950/30">
              Get a Free Estimate
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink
              href={business.phone.tel}
              variant="secondary"
              className="px-7 py-3.5"
            >
              <Phone className="size-4" aria-hidden />
              Call {business.phone.display}
            </ButtonLink>
          </div>
        </motion.div>

        {/* Above-the-fold capture — most visitors never scroll to the full
            quote builder, so the short version lives here too. */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroQuoteForm />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" aria-hidden />
    </section>
  );
}
