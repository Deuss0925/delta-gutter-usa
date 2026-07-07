import { useEffect, useState } from "react";

export type SceneBudget = {
  isMobile: boolean;
  rainCount: number;
  maxDpr: number;
  parallax: boolean;
};

function compute(): SceneBudget {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;
  return {
    isMobile,
    rainCount: isMobile ? 600 : 1500,
    maxDpr: isMobile ? 1.5 : 2,
    parallax: !isMobile,
  };
}

/** Adaptive 3D budget: keeps particle counts and DPR mobile-safe. */
export function useSceneBudget(): SceneBudget {
  const [budget, setBudget] = useState<SceneBudget>(compute);

  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setBudget(compute()));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return budget;
}
