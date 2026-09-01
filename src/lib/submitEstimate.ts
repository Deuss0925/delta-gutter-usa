import { business } from "../config/business";

/**
 * Shared submit path for every estimate request on the site — the short hero
 * form and the full quote builder both land in the same Netlify inbox.
 *
 * Netlify picks up submissions posted as url-encoded pairs to any path on the
 * site, matched to the hidden <form name="estimate"> declared in index.html.
 */

export type EstimateFields = {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  stories?: string;
  linearFt?: string;
  notes?: string;
  /** Where on the page the request came from — useful when reading submissions. */
  source: "hero" | "quote-builder";
};

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

export function buildSummary(f: EstimateFields) {
  return [
    "Hi Delta Gutter USA, I'd like a free estimate.",
    "",
    f.service ? `• Service: ${f.service}` : "",
    f.stories
      ? `• Home: ${f.stories} ${f.stories === "1" ? "story" : "stories"}${
          f.linearFt ? ` · ~${f.linearFt} linear ft` : ""
        }`
      : "",
    `• Name: ${f.name}`,
    f.phone ? `• Phone: ${f.phone}` : "",
    f.email ? `• Email: ${f.email}` : "",
    f.notes ? `• Notes: ${f.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Resolves true when Netlify accepted the request. On any failure the caller
 * should fall back to the mailto handoff rather than dropping the lead.
 */
export async function submitEstimate(fields: EstimateFields): Promise<boolean> {
  const payload: Record<string, string> = {
    "form-name": "estimate",
    "bot-field": "",
  };
  for (const [key, value] of Object.entries(fields)) {
    if (value) payload[key] = String(value);
  }

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}

/** Prepared email link shown only after the visitor explicitly chooses it. */
export function estimateMailto(fields: EstimateFields) {
  return business.links.mailto(
    `Free estimate request — ${fields.name}`,
    buildSummary(fields)
  );
}
