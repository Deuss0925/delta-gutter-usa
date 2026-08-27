import { Reveal } from "../components/Reveal";
import {
  BilingualSeal,
  FacebookReviewsSeal,
  FreeEstimateSeal,
  GoogleReviewsSeal,
  InsuredSeal,
  LaborWarrantySeal,
  MaterialsWarrantySeal,
} from "../components/Seals";

/**
 * Credential band.
 *
 * Sits on white on purpose: cutting the dark page makes the seals read as
 * certification marks rather than decoration, which is what earns the glance.
 * Every seal maps to a claim in the official document package — nothing here
 * is aspirational.
 */

// Tailwind only sees class names written out in full, so the sizes are
// literal strings rather than built from a flag.
const round = "size-20 sm:size-24";
const shield = "h-20 w-[6.25rem] sm:h-24 sm:w-[7.5rem]";
const badge = "h-16 w-[5.4rem] sm:h-[4.5rem] sm:w-24";

const seals = [
  { Seal: GoogleReviewsSeal, label: "5-star rated on Google", size: badge },
  { Seal: LaborWarrantySeal, label: "10-year labor warranty", size: round },
  {
    Seal: MaterialsWarrantySeal,
    label: "10-year materials warranty",
    size: round,
  },
  { Seal: InsuredSeal, label: "Licensed & fully insured", size: shield },
  { Seal: FreeEstimateSeal, label: "Free on-site estimates", size: round },
  { Seal: BilingualSeal, label: "English & Español", size: round },
  { Seal: FacebookReviewsSeal, label: "5-star rated on Facebook", size: badge },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Delta Gutter USA credentials"
      className="border-y-[3px] border-blue-500 bg-white"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-6 px-5 py-8 sm:gap-x-12 sm:px-8">
        {seals.map(({ Seal, label, size }, i) => (
          <Reveal key={label} delay={i * 0.06}>
            <Seal className={size} />
            <span className="sr-only">{label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
