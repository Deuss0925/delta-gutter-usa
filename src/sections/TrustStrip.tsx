import {
  BadgeCheck,
  ClipboardCheck,
  Languages,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "../components/Reveal";

function WarrantyBadge({ kind, accent = false }: { kind: string; accent?: boolean }) {
  return (
    <div className="relative flex size-32 items-center justify-center rounded-full border-[3px] border-navy-950 bg-white p-2 shadow-[0_10px_24px_rgba(4,20,31,0.12)]">
      <div className="flex size-full flex-col items-center justify-center rounded-full border border-dashed border-navy-950/45 text-center">
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-steel">
          Written warranty
        </span>
        <strong className={`mt-0.5 font-display text-4xl font-black leading-none ${accent ? "text-blue-600" : "text-navy-950"}`}>
          10
        </strong>
        <span className="font-display text-sm font-black uppercase tracking-wide text-navy-950">
          Years
        </span>
      </div>
      <span className={`absolute inset-x-[-9px] bottom-[21px] py-1 text-center font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white shadow-md ${accent ? "bg-blue-600" : "bg-navy-950"}`}>
        {kind}
      </span>
      <span className={`absolute -left-[9px] bottom-[13px] size-0 border-y-[8px] border-r-[9px] border-y-transparent ${accent ? "border-r-blue-600" : "border-r-navy-950"}`} aria-hidden />
      <span className={`absolute -right-[9px] bottom-[13px] size-0 border-y-[8px] border-l-[9px] border-y-transparent ${accent ? "border-l-blue-600" : "border-l-navy-950"}`} aria-hidden />
    </div>
  );
}

function ShieldBadge() {
  return (
    <div
      className="flex h-32 w-36 flex-col items-center justify-center bg-navy-950 px-5 pb-5 pt-3 text-center text-white shadow-[0_10px_24px_rgba(4,20,31,0.18)]"
      style={{ clipPath: "polygon(50% 0, 93% 16%, 88% 70%, 50% 100%, 12% 70%, 7% 16%)" }}
    >
      <ShieldCheck className="size-10 text-blue-300" strokeWidth={2.2} aria-hidden />
      <strong className="mt-1 font-display text-sm font-black uppercase leading-tight tracking-wide">
        Licensed
      </strong>
      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.15em] text-blue-200">
        &amp; fully insured
      </span>
    </div>
  );
}

function RoundBadge({
  Icon,
  kicker,
  title,
  subtitle,
  filled = false,
}: {
  Icon: typeof Ruler;
  kicker: string;
  title: string;
  subtitle: string;
  filled?: boolean;
}) {
  return (
    <div className={`flex size-32 flex-col items-center justify-center rounded-full border-[3px] p-3 text-center shadow-[0_10px_24px_rgba(4,20,31,0.12)] ${filled ? "border-blue-600 bg-blue-600 text-white" : "border-navy-950 bg-white text-navy-950"}`}>
      <Icon className={`size-8 ${filled ? "text-white" : "text-blue-600"}`} strokeWidth={2.1} aria-hidden />
      <span className={`mt-1 font-mono text-[7px] font-bold uppercase tracking-[0.17em] ${filled ? "text-white/75" : "text-steel"}`}>
        {kicker}
      </span>
      <strong className="mt-0.5 font-display text-sm font-black uppercase leading-none">
        {title}
      </strong>
      <span className={`mt-1 text-[9px] font-bold uppercase leading-none tracking-wide ${filled ? "text-white/80" : "text-steel"}`}>
        {subtitle}
      </span>
    </div>
  );
}

const badges = [
  {
    label: "Seamless gutter runs made on site",
    node: <RoundBadge Icon={Ruler} kicker="Machine formed" title="On Site" subtitle="Seamless runs" />,
  },
  { label: "10-year labor warranty", node: <WarrantyBadge kind="Labor" accent /> },
  { label: "Licensed and fully insured", node: <ShieldBadge /> },
  { label: "10-year materials warranty", node: <WarrantyBadge kind="Materials" /> },
  {
    label: "Free on-site estimates",
    node: <RoundBadge Icon={ClipboardCheck} kicker="No-cost visit" title="Free" subtitle="On-site estimate" filled />,
  },
  {
    label: "Service in English and Spanish",
    node: <RoundBadge Icon={Languages} kicker="We speak" title="EN / ES" subtitle="English · Español" />,
  },
];

export function TrustStrip() {
  return (
    <section
      id="credentials"
      aria-label="Delta Gutter USA credentials and service commitments"
      className="relative overflow-hidden border-y-4 border-blue-500 bg-white text-ink"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_50%_0%,rgba(10,144,200,0.10),transparent_65%)]" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <div className="mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-14 bg-blue-500/40" aria-hidden />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600">
            The Delta standard
          </p>
          <span className="h-px w-14 bg-blue-500/40" aria-hidden />
        </div>

        <div className="grid grid-cols-2 items-start gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map(({ label, node }, index) => (
            <Reveal key={label} delay={index * 0.05} className="flex flex-col items-center">
              {node}
              <span className="sr-only">{label}</span>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-9 flex max-w-xl items-center justify-center gap-2 rounded-full border border-slate-200 bg-surface px-4 py-2 text-center text-xs font-semibold text-steel">
          <BadgeCheck className="size-4 shrink-0 text-blue-600" aria-hidden />
          Credentials and warranty details available with your written estimate.
        </div>
      </div>
    </section>
  );
}
