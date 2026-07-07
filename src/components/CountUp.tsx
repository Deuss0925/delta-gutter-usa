import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../lib/useReducedMotion";

type CountUpProps = {
  to: number;
  duration?: number;
  className?: string;
};

/** Counts 0 → `to` once when scrolled into view. Jumps to final under reduced motion. */
export function CountUp({ to, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduced, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
