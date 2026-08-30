import { Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { business } from "../config/business";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Colors", href: "#colors" },
  { label: "Warranty", href: "#warranty" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ice/10 bg-navy-950">
      <div className="mx-auto w-full max-w-[90rem] px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size={40} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ice/60">
              {business.legalName} · Licensed &amp; Insured.
              <br />
              {business.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono-label mb-4 text-ice/50">Explore</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-ice/70 transition-colors hover:text-ice"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono-label mb-4 text-ice/50">Get in touch</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={business.phone.tel}
                  className="flex items-center gap-2.5 text-ice/70 transition-colors hover:text-ice"
                >
                  <Phone className="size-4 text-blue-400" aria-hidden />
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={business.email.mailto}
                  className="flex items-center gap-2.5 text-ice/70 transition-colors hover:text-ice"
                >
                  <Mail className="size-4 text-blue-400" aria-hidden />
                  {business.email.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-ice/70">
                <MapPin className="size-4 text-blue-400" aria-hidden />
                {business.location.base} · Serving {business.location.serviceArea}
              </li>
            </ul>
          </div>
        </div>

        {/* Service areas spelled out — the city names were only in the JSON-LD,
            invisible to visitors and to anyone searching for their own town. */}
        <div className="mt-12 border-t border-ice/10 pt-8">
          <p className="font-mono-label mb-4 text-ice/50">Areas we serve</p>
          <ul className="flex flex-wrap gap-2.5">
            {business.location.areasServed.map((city) => (
              <li
                key={city}
                className="rounded-full border border-ice/12 px-3.5 py-1.5 text-sm text-ice/70"
              >
                {city}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ice/50">
            Not sure if we reach you?{" "}
            <a
              href={business.phone.tel}
              className="font-semibold text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Give us a call
            </a>{" "}
            — we cover most of the Triangle.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ice/10 pt-6 text-xs text-ice/45 sm:flex-row">
          <p>
            © {year} {business.legalName}. All rights reserved.
          </p>
          <p>Serving Raleigh &amp; the Triangle, NC · English &amp; Español</p>
        </div>
      </div>
    </footer>
  );
}
