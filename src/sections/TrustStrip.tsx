import { BadgeCheck, CalendarCheck2, Languages, Ruler, ShieldCheck } from "lucide-react";
import { Reveal } from "../components/Reveal";

const credentials = [
  { Icon: Ruler, top: "Made on site", bottom: "Seamless gutter runs" },
  { Icon: CalendarCheck2, top: "10-year", bottom: "Labor warranty" },
  { Icon: BadgeCheck, top: "10-year", bottom: "Materials warranty" },
  { Icon: ShieldCheck, top: "Licensed", bottom: "Fully insured" },
  { Icon: Languages, top: "English", bottom: "Y Español" },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Delta Gutter USA service commitments"
      className="border-b border-slate-200 bg-white text-ink shadow-[0_12px_40px_rgba(4,20,31,0.08)]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 px-5 py-7 sm:px-8 md:grid-cols-5">
        {credentials.map(({ Icon, top, bottom }, i) => (
          <Reveal key={`${top}-${bottom}`} delay={i * 0.05} className="flex items-center gap-3 border-slate-200 px-3 py-3 md:border-r md:last:border-r-0">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
              <Icon className="size-5" strokeWidth={2.2} aria-hidden />
            </span>
            <span>
              <strong className="block text-sm font-extrabold leading-tight text-ink">{top}</strong>
              <span className="mt-0.5 block text-xs leading-tight text-steel">{bottom}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
