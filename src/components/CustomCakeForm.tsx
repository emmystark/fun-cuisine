"use client";

import { useState } from "react";
import { FulfilmentFields } from "./Fulfilment";
import { buildCustomCakeMessage, isoDaysFromNow, newOrderId, whatsappLink } from "@/lib/order";

const occasions = ["Birthday", "Wedding", "Anniversary", "Baby shower", "Graduation", "Other"];
const sizes = ["6 inch", "8 inch", "10 inch", "12 inch", "Not sure yet"];
const flavours = ["Vanilla", "Chocolate", "Red velvet", "Fruit cake", "Mix of flavours"];
const tiers = ["1", "2", "3", "4 or more"];
// Shown with the naira sign on the site, sent with a plain N in the message.
const budgets = ["Under 50,000", "50,000 to 100,000", "100,000 to 200,000", "Above 200,000"];

export function CustomCakeForm() {
  const [f, setF] = useState({
    name: "", occasion: occasions[0], size: sizes[1], flavour: flavours[0], tiers: tiers[0],
    date: "", text: "", colours: "", budget: budgets[1],
  });
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [area, setArea] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = newOrderId();
    const msg = buildCustomCakeMessage(id, {
      ...f,
      budget: f.budget.replace(/(\d[\d,]*)/g, "N$1"),
      fulfilment: { mode, area },
    });
    window.open(whatsappLink(msg), "_blank", "noopener");
    setSent(id);
  }

  const select = (id: keyof typeof f, label: string, opts: string[], fmt = (o: string) => o) => (
    <div>
      <label htmlFor={`cc-${id}`} className="field-label">{label}</label>
      <select id={`cc-${id}`} className="field" value={f[id]} onChange={set(id)}>
        {opts.map((o) => <option key={o} value={o}>{fmt(o)}</option>)}
      </select>
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="cc-name" className="field-label">Your name</label>
        <input id="cc-name" className="field" required value={f.name} onChange={set("name")} autoComplete="name" />
      </div>
      {select("occasion", "Occasion", occasions)}
      <div>
        <label htmlFor="cc-date" className="field-label">Date needed</label>
        <input id="cc-date" type="date" className="field" required min={isoDaysFromNow(5)} value={f.date} onChange={set("date")} />
      </div>
      {select("size", "Cake size", sizes)}
      {select("flavour", "Flavour", flavours)}
      {select("tiers", "Number of tiers", tiers)}
      {select("budget", "Budget range", budgets, (o) => o.replace(/(\d[\d,]*)/g, "₦$1"))}
      <div className="sm:col-span-2">
        <label htmlFor="cc-text" className="field-label">Text on the cake</label>
        <input id="cc-text" className="field" value={f.text} onChange={set("text")} placeholder="Happy 30th Ada" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cc-colours" className="field-label">Colour theme</label>
        <input id="cc-colours" className="field" value={f.colours} onChange={set("colours")} placeholder="Gold and white" />
      </div>
      <div className="grid gap-4 sm:col-span-2">
        <FulfilmentFields idPrefix="cc" mode={mode} area={area} onMode={setMode} onArea={setArea} />
      </div>
      <p className="rounded-[12px] bg-white p-4 text-[15px] sm:col-span-2">
        Have a picture of the cake you like? Send it in the chat right after your message opens in WhatsApp.
      </p>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto">Send request on WhatsApp</button>
        {sent && <p className="mt-3 text-sm" role="status">Request <strong>{sent}</strong> opened in WhatsApp. Press send there, then add your pictures.</p>}
      </div>
    </form>
  );
}
