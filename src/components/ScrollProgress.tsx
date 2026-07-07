import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "../lib/useReducedMotion";

/** Thin blue progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400"
      style={{ scaleX }}
    />
  );
}
