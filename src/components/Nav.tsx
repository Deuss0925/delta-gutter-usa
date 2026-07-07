import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";
import { business } from "../config/business";
import { useReducedMotion } from "../lib/useReducedMotion";

const links = [
  { label: "Services", href: "#services" },
  { label: "Colors", href: "#colors" },
  { label: "Warranty", href: "#warranty" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-ice/10 bg-navy-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#home" className="flex items-center" aria-label={`${business.brand} home`}>
          <Logo size={30} />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ice/75 transition-colors hover:text-ice"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href={business.phone.tel} variant="primary">
            <Phone className="size-4" aria-hidden />
            {business.phone.display}
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-ice lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="lg:hidden"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col gap-1 border-t border-ice/10 bg-navy-950/95 px-5 py-4 backdrop-blur-md">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-ice/85 transition-colors hover:bg-white/5 hover:text-ice"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <ButtonLink
                  href={business.phone.tel}
                  variant="primary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  <Phone className="size-4" aria-hidden />
                  Call {business.phone.display}
                </ButtonLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
