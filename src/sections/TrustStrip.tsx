import { ShieldCheck, Wrench, PackageCheck, ClipboardCheck } from "lucide-react";
import { Reveal } from "../components/Reveal";

const items = [
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Wrench, label: "10-Yr Labor Warranty" },
  { icon: PackageCheck, label: "10-Yr Materials Warranty" },
  { icon: ClipboardCheck, label: "Free On-Site Estimates" },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why homeowners choose Delta Gutter USA"
      className="border-y border-ice/10 bg-navy-950"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px overflow-hidden px-0 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={item.label}
            delay={i * 0.06}
            className="flex items-center justify-center gap-3 px-5 py-6 text-center"
          >
            <item.icon
              className="size-5 shrink-0 text-blue-400"
              aria-hidden
            />
            <span className="text-sm font-semibold text-ice sm:text-base">
              {item.label}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
