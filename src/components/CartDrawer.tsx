"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { Stepper } from "./Stepper";
import { FulfilmentFields } from "./Fulfilment";
import { business } from "@/data/site";
import { buildOrderMessage, isoDaysFromNow, naira, newOrderId, whatsappLink } from "@/lib/order";

export function CartDrawer() {
  const { lines, total, open, setOpen, setQty, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [sentId, setSentId] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const minDate = isoDaysFromNow(0);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const id = newOrderId();
    const msg = buildOrderMessage({ id, lines, name, date, fulfilment: { mode, area }, note });
    window.open(whatsappLink(msg), "_blank", "noopener");
    setSentId(id);
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${open ? "visible" : "pointer-events-none invisible"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-cocoa/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        tabIndex={-1}
        inert={!open}
        className={`absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col rounded-t-[20px] bg-cream outline-none transition-transform duration-300 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[440px] md:rounded-none ${
          open ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-x-full md:translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 className="font-display text-2xl">Your order</h2>
          <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-line/60" aria-label="Close">
            <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {lines.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-display text-xl">Nothing here yet</p>
              <p className="mt-2 text-cocoa/75">Pick something from the menu and it will show up here.</p>
              <Link href="/#menu" onClick={() => setOpen(false)} className="btn-primary mt-6">See the menu</Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-line">
                {lines.map((l) => (
                  <li key={l.slug + l.option} className="flex gap-3 py-4">
                    <Image src={l.image} alt="" width={72} height={72} className="h-[72px] w-[72px] shrink-0 rounded-[12px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold leading-snug">{l.name}</p>
                          <p className="text-sm text-cocoa/70">{l.option} &middot; {naira(l.price)}</p>
                        </div>
                        <p className="font-semibold tabular-nums text-tomato">{naira(l.price * l.qty)}</p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Stepper value={l.qty} min={1} onChange={(n) => setQty(l.slug, l.option, n)} label={`Quantity of ${l.name}`} />
                        <button type="button" onClick={() => remove(l.slug, l.option)} className="min-h-11 px-2 text-sm font-medium underline underline-offset-4 hover:text-tomato">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline justify-between border-t border-cocoa/20 py-4">
                <span className="font-semibold">Total</span>
                <span className="font-display text-2xl tabular-nums">{naira(total)}</span>
              </div>
              <p className="text-sm text-cocoa/70">Delivery fee is confirmed on WhatsApp. {business.leadTimeNote}</p>

              <form onSubmit={send} className="mt-6 space-y-4">
                <h3 className="font-display text-xl">Your details</h3>
                <div>
                  <label htmlFor="c-name" className="field-label">Name</label>
                  <input id="c-name" className="field" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="c-date" className="field-label">Date needed</label>
                  <input id="c-date" type="date" className="field" required min={minDate} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <FulfilmentFields idPrefix="c" mode={mode} area={area} onMode={setMode} onArea={setArea} />
                <div>
                  <label htmlFor="c-note" className="field-label">Note <span className="font-normal text-cocoa/75">(optional)</span></label>
                  <textarea id="c-note" className="field min-h-20" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Writing on a cake, allergies, gate code" />
                </div>
                <button type="submit" className="btn-primary w-full">Send order on WhatsApp</button>
                {sentId && (
                  <div className="rounded-[12px] border border-line bg-white p-4 text-sm" role="status">
                    <p>
                      Order <strong>{sentId}</strong> opened in WhatsApp. Press send there and we will reply to confirm.
                    </p>
                    <button
                      type="button"
                      onClick={() => { clear(); setSentId(null); setOpen(false); }}
                      className="mt-2 min-h-11 font-semibold underline underline-offset-4 hover:text-tomato"
                    >
                      Clear cart
                    </button>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
