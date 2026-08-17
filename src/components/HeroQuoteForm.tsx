import { useState } from "react";
import { Check, Send } from "lucide-react";
import { business } from "../config/business";
import {
  mailtoFallback,
  submitEstimate,
  type EstimateFields,
} from "../lib/submitEstimate";

/**
 * Short capture form shown in the hero, above the fold.
 *
 * Deliberately only asks for what's needed to call someone back — the full
 * quote builder further down the page collects the rest. Both post to the
 * same Netlify form.
 */

const quickServices = [
  "Installation",
  "Repair",
  "Replacement",
] as const;

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-ice/12 bg-navy-950/60 px-4 py-2.5 text-sm text-ice placeholder:text-ice/30 focus:border-blue-400 focus:outline-none";
const labelClass = "font-mono text-[11px] uppercase tracking-wider text-ice/55";

export function HeroQuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<string>(quickServices[0]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please add your name so we know who to reach.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError("Add a phone or email so we can send your estimate.");
      return;
    }
    setError(null);
    setStatus("sending");

    const fields: EstimateFields = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service,
      source: "hero",
    };

    const ok = await submitEstimate(fields);
    if (ok) {
      setStatus("sent");
    } else {
      setStatus("idle");
      mailtoFallback(fields);
    }
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-blue-400/25 bg-navy-900/70 p-7 text-center backdrop-blur-sm"
      >
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-blue-500/15 text-blue-400 ring-1 ring-blue-400/25">
          <Check className="size-6" aria-hidden />
        </span>
        <p className="mt-4 text-lg font-semibold text-ice">
          Thanks, {name.trim().split(" ")[0]} — we've got it.
        </p>
        <p className="mt-2 text-sm text-ice/70">
          We'll reach out to schedule your free on-site estimate. Need us
          sooner? Call{" "}
          <a
            href={business.phone.tel}
            className="font-semibold text-blue-300 underline underline-offset-2 hover:text-blue-200"
          >
            {business.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-blue-400/25 bg-navy-900/70 p-6 backdrop-blur-sm"
      aria-labelledby="hero-form-title"
    >
      <h2 id="hero-form-title" className="text-lg font-semibold text-ice">
        Get your free estimate
      </h2>
      <p className="mt-1 text-xs text-ice/55">
        Takes 30 seconds · no obligation
      </p>

      <div className="mt-5">
        <label htmlFor="hero-name" className={labelClass}>
          Full name
        </label>
        <input
          id="hero-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="hero-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="hero-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="hero-email" className={labelClass}>
            Email
          </label>
          <input
            id="hero-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <fieldset className="mt-4">
        <legend className={labelClass}>What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {quickServices.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setService(option)}
              aria-pressed={service === option}
              className={`cursor-pointer rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors ${
                service === option
                  ? "border-blue-400 bg-blue-500/10 text-ice"
                  : "border-ice/12 text-ice/70 hover:border-ice/30"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3.5 py-2 text-xs text-red-200"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="size-4" aria-hidden />
        {status === "sending" ? "Sending…" : "Request my free estimate"}
      </button>

      <p className="mt-3 text-center text-[11px] text-ice/40">
        Prefer to talk? Call or text {business.phone.display}
      </p>
    </form>
  );
}
