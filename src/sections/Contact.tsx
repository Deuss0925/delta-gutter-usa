import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Languages,
  ArrowLeft,
  ArrowRight,
  Check,
  MessageSquare,
  Send,
} from "lucide-react";
import { Section, SectionHeading } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { business } from "../config/business";
import { services } from "../config/content";
import { useReducedMotion } from "../lib/useReducedMotion";

type FormState = {
  service: string;
  stories: number;
  linearFt: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

const initial: FormState = {
  service: "",
  stories: 1,
  linearFt: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

const steps = ["Service", "Your home", "Your details"];

// Los links sms: solo funcionan en dispositivos con app de mensajes (movil).
// En escritorio no hacen nada, asi que ahi copiamos el mensaje y mostramos el numero.
function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  const mobileUA = /Android|iPhone|iPad|iPod|Windows Phone|Mobile/i.test(
    navigator.userAgent
  );
  return coarsePointer || mobileUA;
}

function buildSummary(f: FormState) {
  const lines = [
    "Hi Delta Gutter USA, I'd like a free estimate.",
    "",
    `• Service: ${f.service || "Not specified"}`,
    `• Home: ${f.stories} ${f.stories === 1 ? "story" : "stories"}${
      f.linearFt ? ` · ~${f.linearFt} linear ft` : ""
    }`,
    `• Name: ${f.name}`,
    f.phone ? `• Phone: ${f.phone}` : "",
    f.email ? `• Email: ${f.email}` : "",
    f.notes ? `• Notes: ${f.notes}` : "",
  ].filter(Boolean);
  return lines.join("\n");
}

/** Netlify expects url-encoded pairs, same shape a native form POST would send. */
function encodeForNetlify(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

type SubmitStatus = "idle" | "sending" | "sent" | "failed";

const directCards = [
  {
    icon: Phone,
    label: "Call or text",
    value: business.phone.display,
    href: business.phone.tel,
  },
  {
    icon: Mail,
    label: "Email",
    value: business.email.address,
    href: business.email.mailto,
  },
  {
    icon: MapPin,
    label: "Service area",
    value: business.location.serviceArea,
    href: undefined,
  },
  {
    icon: Languages,
    label: "We speak",
    value: business.languages,
    href: undefined,
  },
];

export function Contact() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initial);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setCopied(false); // el mensaje copiado queda obsoleto al editar
  };

  const summary = useMemo(() => buildSummary(form), [form]);

  const validate = (): boolean => {
    if (!form.name.trim()) {
      setError("Please add your name so we know who to reach.");
      return false;
    }
    if (!form.phone.trim() && !form.email.trim()) {
      setError("Add a phone or email so we can send your estimate.");
      return false;
    }
    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      setError("That email doesn't look quite right — mind checking it?");
      return false;
    }
    setError(null);
    return true;
  };

  const openSms = () => {
    if (!validate()) return;
    if (isMobileDevice()) {
      window.location.href = business.links.sms(summary);
      return;
    }
    // Escritorio: sms: no abre nada -> copiamos el mensaje y mostramos el numero.
    navigator.clipboard?.writeText(summary).catch(() => {});
    setCopied(true);
  };
  const openEmail = () => {
    if (!validate()) return;
    window.location.href = business.links.mailto(
      `Free estimate request — ${form.name}`,
      summary
    );
  };

  /**
   * Primary path: POST straight to Netlify so the request is captured whether
   * or not the visitor ever opens their mail app. If that call fails we fall
   * back to the mailto handoff rather than losing the lead.
   */
  const submit = async () => {
    if (!validate()) return;
    setStatus("sending");
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForNetlify({
          "form-name": "estimate",
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          stories: String(form.stories),
          linearFt: form.linearFt,
          notes: form.notes,
        }),
      });
      if (!response.ok) throw new Error(`Netlify responded ${response.status}`);
      setStatus("sent");
    } catch {
      setStatus("failed");
      window.location.href = business.links.mailto(
        `Free estimate request — ${form.name}`,
        summary
      );
    }
  };

  const canNext = step === 0 ? !!form.service : true;

  return (
    <Section id="contact" className="bg-navy-950">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
        {/* Quote builder */}
        <div>
          <SectionHeading
            eyebrow="Get a free estimate"
            title="Build your quote in 30 seconds."
            intro="Tell us a little about your home and we'll follow up with a free, no-obligation on-site estimate."
          />

          {/* progress */}
          <div className="mb-8 flex items-center gap-2" aria-hidden>
            {steps.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`h-1.5 w-full rounded-full transition-colors ${
                    i <= step ? "bg-blue-500" : "bg-ice/12"
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Step {step + 1} of {steps.length}: {steps[step]}
          </p>

          {status === "sent" ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl border border-blue-400/25 bg-navy-800/40 p-8 text-center sm:p-10"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-blue-500/15 text-blue-400 ring-1 ring-blue-400/25">
                <Check className="size-7" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ice">
                Got it, {form.name.split(" ")[0]} — your request is in.
              </h3>
              <p className="mt-3 text-sm text-ice/70">
                We'll be in touch to schedule your free on-site estimate. Need
                us sooner? Call or text{" "}
                <a
                  href={business.phone.tel}
                  className="font-semibold text-blue-300 underline underline-offset-2 hover:text-blue-200"
                >
                  {business.phone.display}
                </a>
                .
              </p>
            </div>
          ) : (
          <div className="rounded-3xl border border-ice/10 bg-navy-800/40 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={reduced ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduced ? undefined : { opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && (
                  <fieldset>
                    <legend className="text-sm font-semibold text-ice">
                      What can we help with?
                    </legend>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => set("service", s.title)}
                          aria-pressed={form.service === s.title}
                          className={`cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                            form.service === s.title
                              ? "border-blue-400 bg-blue-500/10 text-ice"
                              : "border-ice/12 text-ice/75 hover:border-ice/30"
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <fieldset>
                      <legend className="text-sm font-semibold text-ice">
                        How many stories is your home?
                      </legend>
                      <div className="mt-4 flex gap-2">
                        {[1, 2, 3, 4].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => set("stories", n)}
                            aria-pressed={form.stories === n}
                            className={`h-12 flex-1 cursor-pointer rounded-xl border text-base font-semibold transition-colors ${
                              form.stories === n
                                ? "border-blue-400 bg-blue-500/10 text-ice"
                                : "border-ice/12 text-ice/75 hover:border-ice/30"
                            }`}
                          >
                            {n}
                            {n === 4 ? "+" : ""}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div>
                      <label
                        htmlFor="linearFt"
                        className="text-sm font-semibold text-ice"
                      >
                        Approx. linear feet of gutter{" "}
                        <span className="font-normal text-ice/50">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="linearFt"
                        type="text"
                        inputMode="numeric"
                        value={form.linearFt}
                        onChange={(e) =>
                          set(
                            "linearFt",
                            e.target.value.replace(/[^\d]/g, "")
                          )
                        }
                        placeholder="e.g. 120"
                        className="mt-2 w-full rounded-xl border border-ice/12 bg-navy-950/60 px-4 py-3 text-ice placeholder:text-ice/35 focus:border-blue-400 focus:outline-none"
                      />
                      <p className="mt-2 text-xs text-ice/50">
                        Not sure? Leave it blank — we'll measure during your
                        free estimate.
                      </p>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-sm font-semibold text-ice"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        className="mt-2 w-full rounded-xl border border-ice/12 bg-navy-950/60 px-4 py-3 text-ice placeholder:text-ice/35 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="phone"
                          className="text-sm font-semibold text-ice"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          className="mt-2 w-full rounded-xl border border-ice/12 bg-navy-950/60 px-4 py-3 text-ice placeholder:text-ice/35 focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold text-ice"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          className="mt-2 w-full rounded-xl border border-ice/12 bg-navy-950/60 px-4 py-3 text-ice placeholder:text-ice/35 focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="notes"
                        className="text-sm font-semibold text-ice"
                      >
                        Notes{" "}
                        <span className="font-normal text-ice/50">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Anything we should know about your home or timeline?"
                        className="mt-2 w-full resize-none rounded-xl border border-ice/12 bg-navy-950/60 px-4 py-3 text-ice placeholder:text-ice/35 focus:border-blue-400 focus:outline-none"
                      />
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200"
                      >
                        {error}
                      </p>
                    )}

                    {copied && (
                      <p
                        role="status"
                        aria-live="polite"
                        className="flex flex-wrap items-center gap-x-1.5 rounded-lg border border-blue-400/30 bg-blue-500/10 px-4 py-2.5 text-sm text-ice/90"
                      >
                        <Check className="size-4 shrink-0 text-blue-400" aria-hidden />
                        Message copied — text us at
                        <a
                          href={business.phone.tel}
                          className="font-semibold text-blue-300 underline underline-offset-2 hover:text-blue-200"
                        >
                          {business.phone.display}
                        </a>
                      </p>
                    )}

                    {status === "failed" && (
                      <p
                        role="alert"
                        className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-100"
                      >
                        We couldn't send that automatically — we've opened your
                        email app with the details, or call us at{" "}
                        <a
                          href={business.phone.tel}
                          className="font-semibold underline underline-offset-2"
                        >
                          {business.phone.display}
                        </a>
                        .
                      </p>
                    )}

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={submit}
                        disabled={status === "sending"}
                        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Send className="size-4" aria-hidden />
                        {status === "sending"
                          ? "Sending…"
                          : "Request my free estimate"}
                      </button>
                      <p className="mt-3 text-center text-xs text-ice/45">
                        No obligation. We'll reach out to schedule your on-site
                        visit.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5 border-t border-ice/10 pt-4 sm:flex-row">
                      <button
                        type="button"
                        onClick={openSms}
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-ice/20 bg-white/5 px-6 py-3 text-sm font-semibold text-ice transition-colors hover:border-blue-400/60 hover:bg-white/10"
                      >
                        <MessageSquare className="size-4" aria-hidden />
                        Send via Text
                      </button>
                      <button
                        type="button"
                        onClick={openEmail}
                        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-ice/20 bg-white/5 px-6 py-3 text-sm font-semibold text-ice transition-colors hover:border-blue-400/60 hover:bg-white/10"
                      >
                        <Mail className="size-4" aria-hidden />
                        Send via Email
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* nav buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-ice/60 transition-colors hover:text-ice disabled:cursor-not-allowed disabled:opacity-0"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back
              </button>
              {step < steps.length - 1 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                  disabled={!canNext}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white/5 px-5 py-2.5 text-sm font-semibold text-ice transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              )}
            </div>
          </div>
          )}
        </div>

        {/* Direct contact cards */}
        <Reveal delay={0.1}>
          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
            {directCards.map((c) => {
              const inner = (
                <>
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-blue-500/12 text-blue-400 ring-1 ring-blue-400/20">
                    <c.icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-mono text-xs uppercase tracking-wider text-ice/55">
                    {c.label}
                  </p>
                  <p className="mt-1 font-semibold text-ice">{c.value}</p>
                </>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  className="rounded-2xl border border-ice/10 bg-navy-800/40 p-6 transition-colors hover:border-blue-400/40 hover:bg-navy-800/70"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={c.label}
                  className="rounded-2xl border border-ice/10 bg-navy-800/40 p-6"
                >
                  {inner}
                </div>
              );
            })}
            <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.06] p-6 sm:col-span-2">
              <p className="flex items-center gap-2 text-sm text-ice/80">
                <Check className="size-4 shrink-0 text-blue-400" aria-hidden />
                Free on-site estimates · clear written quotes · clean job site,
                debris hauled away.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
