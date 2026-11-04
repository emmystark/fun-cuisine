"use client";

type Props = { value: number; onChange: (n: number) => void; label: string; min?: number };

export function Stepper({ value, onChange, label, min = 1 }: Props) {
  const btn =
    "grid h-11 w-11 place-items-center text-xl leading-none text-cocoa transition-colors hover:bg-line/60 disabled:opacity-35";
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white" role="group" aria-label={label}>
      <button type="button" className={`${btn} rounded-l-full`} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Reduce quantity">
        <span aria-hidden="true">&minus;</span>
      </button>
      <span className="min-w-8 text-center font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className={`${btn} rounded-r-full`} onClick={() => onChange(value + 1)} disabled={value >= 99} aria-label="Increase quantity">
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}
