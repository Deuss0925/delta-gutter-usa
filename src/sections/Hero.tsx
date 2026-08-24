import { lazy } from "react";
import { motion } from "motion/react";
import { Phone, ArrowRight } from "lucide-react";
import { LazyScene } from "../components/LazyScene";
import { ButtonLink } from "../components/Button";
import { HeroQuoteForm } from "../components/HeroQuoteForm";
import { business } from "../config/business";
import { useSceneBudget } from "../lib/useSceneBudget";
import { useReducedMotion } from "../lib/useReducedMotion";

const HeroScene = lazy(() => import("../three/HeroScene"));

/** Static poster: a calm navy gradient with a hint of rain — matches the 3D. */
function HeroPoster() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy-900">
      <div
        className="absolute inset-0 bg-grid opacity-60"
        aria-hidden
      />
      <div
        className="absolute -right-24 top-1/4 h-[60vh] w-[60vh] rounded-full bg-blue-500/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950 to-transparent"
        aria-hidden
      />
    </div>
  );
}

export function Hero() {
  const { rainCount, maxDpr, parallax } = useSceneBudget();
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* 3D backdrop */}
      <LazyScene
        className="absolute inset-0 -z-10"
        ariaLabel="3D scene of a home corner with a seamless gutter channeling rainwater away from the foundation"
        Scene={HeroScene}
        sceneProps={{ rainCount, maxDpr, parallax }}
        poster={<HeroPoster />}
      />
      {/* legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/50 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-950 to-transparent"
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-[1.05fr_minmax(0,26rem)]">
        <motion.div
          className="max-w-2xl"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-label text-blue-400">
            Licensed &amp; Insured · Raleigh &amp; the Triangle, NC
          </p>

          <h1 className="mt-6 text-5xl leading-[1.02] text-ice sm:text-6xl lg:text-7xl">
            Seamless gutters,
            <br />
            protecting every{" "}
            <span className="text-blue-400">drop.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-ice/75">
            On-site machine-formed seamless gutters for Raleigh &amp; the
            Triangle — backed by a{" "}
            <span className="font-semibold text-ice">
              10-year labor &amp; 10-year materials warranty
            </span>
            .
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#contact" variant="primary" className="px-7 py-3.5">
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

      {/* scroll hint */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-10 w-6 rounded-full border border-ice/25 p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-blue-400" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
