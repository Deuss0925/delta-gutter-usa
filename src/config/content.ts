// All copy below is sourced verbatim/derived from the official Delta Gutter USA
// proposal/invoice/warranty package. No invented testimonials, counts, or prices.

export const services = [
  {
    id: "installation",
    icon: "Home",
    title: "Seamless Gutter Installation",
    body: "K-Style & Half-Round, machine-formed on-site for a seamless run. Available in aluminum, copper & box-style.",
  },
  {
    id: "downspouts",
    icon: "ArrowDownToLine",
    title: "Downspouts & Elbows",
    body: "2x3 and 3x4 downspouts with A/B elbows that move water away from the foundation — your #1 defense against water damage.",
  },
  {
    id: "replacement",
    icon: "Recycle",
    title: "Gutter Replacement & Tear-Down",
    body: "Remove & haul away your old system. We leave the site cleaner than we found it.",
  },
  {
    id: "accessories",
    icon: "Wrench",
    title: "Diverters, Miters & Accessories",
    body: "Diverters, inside/outside miters, hidden hangers and wedges — installed to manufacturer spec.",
  },
  {
    id: "repairs",
    icon: "Hammer",
    title: "Repairs & Maintenance",
    body: "Leak repairs, re-pitching, resealing seams and hanger replacement to keep your system flowing.",
  },
  {
    id: "color",
    icon: "Palette",
    title: "Color-Matched Systems",
    body: "A wide range of colors for gutters and downspouts to match your home's exterior.",
  },
] as const;

export const specChips = [
  "K-Style",
  "Half Round",
  "Aluminum",
  "Copper",
  "Box Gutters",
  '5" & 6" Profiles',
  "1–4 Stories",
] as const;

export const warranty = {
  labor: {
    years: 10,
    title: "Labor Warranty",
    covers: [
      "Installation leaks",
      "Improper pitch",
      "Loose or failed hangers",
      "Downspout connections",
      "Seam separations",
      "Workmanship",
    ],
  },
  materials: {
    years: 10,
    title: "Materials Warranty",
    covers: [
      "Gutter & downspout sections",
      "End caps & miters",
      "Hangers & wedges",
      "Fasteners",
      "Elbows & diverters",
      "Sealants",
    ],
  },
} as const;

export const processSteps = [
  {
    n: "01",
    title: "Reach out",
    body: "Call or message us with your home and what you need. English & Español.",
  },
  {
    n: "02",
    title: "Free on-site estimate",
    body: "We measure your home in person — no guesswork, no obligation.",
  },
  {
    n: "03",
    title: "Clear written quote",
    body: "A transparent, itemized quote in writing before any work begins.",
  },
  {
    n: "04",
    title: "Install + spotless cleanup",
    body: "Professional install with debris hauled away and a clean job site.",
  },
] as const;

// Care guide — the 6 real maintenance tips, phrased as questions for the FAQ accordion.
export const careFaqs = [
  {
    q: "How often should I clean my gutters?",
    a: "Clean them at least twice a year to keep water flowing freely and prevent overflow.",
  },
  {
    q: "How do I know my downspouts are working?",
    a: "Check that water flows freely from each downspout during rain — pooling or slow drainage is an early warning sign.",
  },
  {
    q: "What should I do after a heavy storm?",
    a: "Inspect your gutters and downspouts after strong storms for debris, sagging, or loose sections.",
  },
  {
    q: "How do I keep seams from leaking?",
    a: "Periodically check the sealant at end caps and miters — these are the spots most likely to need resealing over time.",
  },
  {
    q: "Can I lean a ladder against my gutters?",
    a: "No — never rest a ladder against the gutters. It can bend or detach them. Use standoffs or lean against the fascia only.",
  },
  {
    q: "Who should I call for repairs?",
    a: "Call Delta first. Third-party work on your system can void your warranty, so let us handle repairs and maintenance.",
  },
] as const;

// Real payment / insurance FAQs.
export const businessFaqs = [
  {
    q: "How does payment work?",
    a: "A deposit is collected when you accept the quote, with the balance due once the work is completed.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes — Delta Gutter USA is licensed and fully insured. A Certificate of Insurance is available upon request.",
  },
] as const;

// Popular aluminum finishes for the live 3D configurator.
export const gutterColors = [
  { name: "White", hex: "#F4F4F1" },
  { name: "Almond", hex: "#E7DCC5" },
  { name: "Clay", hex: "#C9B69B" },
  { name: "Musket Brown", hex: "#5A4634" },
  { name: "Bronze", hex: "#4B3B2A" },
  { name: "Black", hex: "#1E1E1E" },
  { name: "Colonial Gray", hex: "#8C9195" },
  { name: "Wicker", hex: "#D8CBB0" },
] as const;

export type GutterProfile = "kstyle" | "halfround";
