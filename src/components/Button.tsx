import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer focus-visible:outline-2 whitespace-nowrap";

const variants: Record<Variant, string> = {
  // navy-950 text on blue-500 = 5.19:1 contrast (AA for normal text). Verified.
  primary:
    "bg-blue-500 text-navy-950 hover:bg-blue-400 hover:-translate-y-0.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-400/30",
  secondary:
    "border border-ice/20 bg-white/5 text-ice backdrop-blur-sm hover:border-blue-400/60 hover:bg-white/10 hover:-translate-y-0.5",
  ghost: "text-ice/80 hover:text-ice",
};

export function ButtonLink({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
