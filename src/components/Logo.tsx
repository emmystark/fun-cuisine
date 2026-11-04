type Props = { className?: string; showMark?: boolean };

/** Small hand drawn whisk. Uses currentColor so it follows the text colour. */
export function WhiskMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.6 14.2c3.9-3.1 6.9-7 6.1-9.6-.8-2.5-5.4-1.4-8.6 2.4-2.9 3.5-3.4 6.4-1.6 7.6" />
        <path d="M16.2 13.4c1.6-3.2 3.3-6.6 5.4-8.4" />
        <path d="M15.4 14.8c3-1.4 6.7-3.9 8.5-6.6" />
        <path d="M14.6 15.6 6.3 25.7" />
        <path d="M7.9 27.2c-1.1.6-2.4-.2-2.8-1.3-.2-.6 0-1.2.5-1.7" />
      </g>
      <circle cx="25.6" cy="22.8" r="1.6" fill="var(--tomato)" />
    </svg>
  );
}

/** "Fun Cuisine" wordmark with the whisk. */
export function Logo({ className = "", showMark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-cocoa ${className}`}>
      {showMark && <WhiskMark className="h-7 w-7 shrink-0" />}
      <span className="font-display text-[1.35rem] leading-none tracking-tight">Fun Cuisine</span>
    </span>
  );
}
