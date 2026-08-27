/**
 * Hand-drawn credential seals.
 *
 * Deliberately SVG rather than image files: they stay sharp at any size, weigh
 * almost nothing, and pick up the brand palette instead of being baked in.
 * Only claims backed by the official document package get a seal here.
 */

const NAVY = "#04141F";
const BLUE = "#0A90C8";

type SealProps = { className?: string };

function WarrantySeal({
  years,
  kind,
  ribbon,
  className,
}: SealProps & { years: number; kind: string; ribbon: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label={`${years} year ${kind.toLowerCase()} warranty`}
    >
      <circle cx="60" cy="60" r="52" fill="none" stroke={NAVY} strokeWidth="2" />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke={NAVY}
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <text
        x="60"
        y="45"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="8.5"
        letterSpacing="1.3"
        fill={NAVY}
      >
        WARRANTY
      </text>
      <rect x="14" y="51" width="92" height="21" fill={ribbon} />
      <path
        d="M14 51 L6 56 L14 61 Z M106 51 L114 56 L106 61 Z"
        fill={NAVY}
        opacity="0.75"
      />
      <text
        x="60"
        y="66"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="15"
        fontWeight="bold"
        fill="#ffffff"
      >
        {years} YEARS
      </text>
      <text
        x="60"
        y="84"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="8"
        letterSpacing="1"
        fill={NAVY}
      >
        {kind}
      </text>
    </svg>
  );
}

export function LaborWarrantySeal({ className }: SealProps) {
  return (
    <WarrantySeal years={10} kind="LABOR" ribbon={BLUE} className={className} />
  );
}

export function MaterialsWarrantySeal({ className }: SealProps) {
  return (
    <WarrantySeal
      years={10}
      kind="MATERIALS"
      ribbon={NAVY}
      className={className}
    />
  );
}

export function InsuredSeal({ className }: SealProps) {
  return (
    <svg
      viewBox="0 0 150 120"
      className={className}
      role="img"
      aria-label="Licensed and fully insured"
    >
      <path
        d="M75 10 L128 26 V62 C128 90 104 106 75 112 C46 106 22 90 22 62 V26 Z"
        fill={NAVY}
      />
      <path
        d="M75 18 L120 31 V62 C120 85 100 99 75 104 C50 99 30 85 30 62 V31 Z"
        fill="none"
        stroke={BLUE}
        strokeWidth="1.5"
      />
      <path
        d="M58 60 L70 72 L94 46"
        fill="none"
        stroke="#2FB1E8"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="75"
        y="88"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="8.5"
        letterSpacing="0.8"
        fill="#ffffff"
      >
        LICENSED
      </text>
      <text
        x="75"
        y="99"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="8.5"
        letterSpacing="0.8"
        fill="#ffffff"
      >
        &amp; INSURED
      </text>
    </svg>
  );
}

export function FreeEstimateSeal({ className }: SealProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Free on-site estimates"
    >
      <circle cx="60" cy="60" r="50" fill={BLUE} />
      <circle cx="60" cy="60" r="43" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <text
        x="60"
        y="52"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="19"
        fontWeight="bold"
        fill="#ffffff"
      >
        FREE
      </text>
      <line x1="32" y1="59" x2="88" y2="59" stroke="#ffffff" strokeWidth="1" />
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="8.5"
        letterSpacing="0.6"
        fill="#ffffff"
      >
        ON-SITE
      </text>
      <text
        x="60"
        y="86"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="8.5"
        letterSpacing="0.6"
        fill="#ffffff"
      >
        ESTIMATES
      </text>
    </svg>
  );
}

/**
 * Review badges. These carry other companies' brand colours, so they stay
 * visually true to Google's and Facebook's marks rather than being recoloured
 * to our palette.
 */
export function GoogleReviewsSeal({ className }: SealProps) {
  return (
    <svg
      viewBox="0 0 130 96"
      className={className}
      role="img"
      aria-label="Five star rated on Google Reviews"
    >
      <text
        x="65"
        y="14"
        textAnchor="middle"
        fontSize="10"
        letterSpacing="0.5"
        fill="#5F5E5A"
      >
        5 Star
      </text>
      <text x="65" y="32" textAnchor="middle" fontSize="15" fill="#F5B400">
        ★★★★★
      </text>
      <text
        x="65"
        y="70"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="34"
      >
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#EA4335">o</tspan>
        <tspan fill="#FBBC05">o</tspan>
        <tspan fill="#4285F4">g</tspan>
        <tspan fill="#34A853">l</tspan>
        <tspan fill="#EA4335">e</tspan>
      </text>
      <text
        x="65"
        y="88"
        textAnchor="middle"
        fontSize="12"
        letterSpacing="1.2"
        fill="#5F5E5A"
      >
        Reviews
      </text>
    </svg>
  );
}

export function FacebookReviewsSeal({ className }: SealProps) {
  return (
    <svg
      viewBox="0 0 130 96"
      className={className}
      role="img"
      aria-label="Five star rated on Facebook Reviews"
    >
      <rect x="49" y="4" width="32" height="32" rx="7" fill="#1877F2" />
      <path
        d="M70 15h-2.6c-.5 0-.9.4-.9 1v2.2H70l-.4 3.4h-3.1V30h-3.6v-8.4H60v-3.4h2.9V15.6c0-2.4 1.5-3.6 3.7-3.6H70z"
        fill="#ffffff"
      />
      <text
        x="65"
        y="60"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="23"
        fill="#1c1e21"
      >
        facebook
      </text>
      <text
        x="65"
        y="78"
        textAnchor="middle"
        fontSize="12"
        letterSpacing="1"
        fill="#5F5E5A"
      >
        Reviews
      </text>
      <text x="65" y="93" textAnchor="middle" fontSize="13" fill="#F5B400">
        ★★★★★
      </text>
    </svg>
  );
}

export function BilingualSeal({ className }: SealProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="We speak English and Spanish"
    >
      <circle cx="60" cy="60" r="50" fill="none" stroke={NAVY} strokeWidth="2" />
      <circle cx="60" cy="60" r="43" fill="#F2F6F9" />
      <text
        x="60"
        y="54"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="16"
        fontWeight="bold"
        fill={NAVY}
      >
        EN
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="16"
        fontWeight="bold"
        fill={BLUE}
      >
        ES
      </text>
      <text
        x="60"
        y="90"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="7"
        letterSpacing="0.7"
        fill={NAVY}
      >
        WE SPEAK BOTH
      </text>
    </svg>
  );
}
