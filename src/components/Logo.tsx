import logo from "../assets/delta-gutter-logo.webp";
import { business } from "../config/business";

type LogoProps = {
  /** Height of the logo image in px; the light card scales around it. */
  size?: number;
  className?: string;
};

/**
 * The wordmark uses dark navy ink, so on the dark site it sits inside a light
 * rounded card — the exact treatment used on the official document package.
 */
export function Logo({ size = 34, className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center rounded-xl bg-surface px-3 py-2 shadow-sm ring-1 ring-ink/5 ${className}`}
    >
      <img
        src={logo}
        alt={`${business.brand} logo`}
        height={size}
        style={{ height: size, width: "auto" }}
        className="block select-none"
        draggable={false}
      />
    </span>
  );
}
