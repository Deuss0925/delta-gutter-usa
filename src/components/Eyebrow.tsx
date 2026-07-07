type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

/** Monospace uppercase label — echoes the invoice's "SECTION 01 —" style. */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`font-mono-label inline-flex items-center gap-2 text-blue-400 ${className}`}
    >
      <span aria-hidden className="h-px w-6 bg-blue-500/60" />
      {children}
    </span>
  );
}
