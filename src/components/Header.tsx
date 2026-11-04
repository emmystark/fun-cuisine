"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useCart } from "./CartProvider";

const links = [
  { href: "/#menu", label: "Menu" },
  { href: "/#custom", label: "Custom Orders" },
  { href: "/#about", label: "About" },
];

export function Header() {
  const { count, setOpen } = useCart();
  return (
    <>
    <header className="sticky top-0 z-30 border-b border-line bg-cream">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex min-h-11 items-center" aria-label="Fun Cuisine home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-[15px] font-medium hover:text-tomato">
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 items-center gap-2 rounded-full border border-cocoa/15 bg-white px-4 text-[15px] font-semibold hover:border-cocoa/40"
          aria-label={`Open your order, ${count} ${count === 1 ? "item" : "items"}`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" />
            <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
          </svg>
          <span>Order</span>
          {count > 0 && (
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-butter px-1.5 text-sm tabular-nums">{count}</span>
          )}
        </button>
      </div>
    </header>
      <nav className="flex gap-6 overflow-x-auto border-b border-line px-4 md:hidden" aria-label="Sections">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="flex min-h-11 shrink-0 items-center text-sm font-medium">
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
