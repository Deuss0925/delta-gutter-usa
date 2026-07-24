// Delta Gutter USA — single source of truth for all business data.
// If a real detail changes, edit it here only. Do NOT hardcode contact info elsewhere.

const PHONE_DIGITS = "19843329551"; // E.164 without '+', used for tel/wa links

export const business = {
  brand: "Delta Gutter USA",
  legalName: "Delta Gutters USA L.L.C.",
  tagline: "Seamless gutters, protecting every drop.",

  phone: {
    display: "(984) 332-9551",
    tel: `tel:+${PHONE_DIGITS}`,
    digits: PHONE_DIGITS,
  },

  email: {
    address: "deltagutterusa@gmail.com",
    mailto: "mailto:deltagutterusa@gmail.com",
  },

  location: {
    base: "Willow Spring, NC",
    addressLocality: "Willow Spring",
    addressRegion: "NC",
    serviceArea: "Raleigh & the Triangle, NC",
    // Cities used for JSON-LD areaServed. Street address is intentionally NOT published.
    areasServed: ["Raleigh", "Durham", "Cary", "Apex", "The Triangle"],
  },

  languages: "English & Español",

  credentials: {
    insured: "Licensed & fully insured",
    coiNote: "Certificate of Insurance available upon request",
    laborWarrantyYears: 10,
    materialsWarrantyYears: 10,
    claimsWindow: "Claims answered within 5 business days",
  },

  domain: "deltagutterusa.com",
  url: "https://deltagutterusa.com",

  // Prefilled outreach links (message bodies are built dynamically by the quote builder)
  links: {
    // SMS directo a la línea de la oficina. "?&body=" funciona tanto en iOS como en Android.
    sms: (message: string) =>
      `sms:+${PHONE_DIGITS}?&body=${encodeURIComponent(message)}`,
    mailto: (subject: string, body: string) =>
      `mailto:deltagutterusa@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`,
  },
} as const;

export type Business = typeof business;
