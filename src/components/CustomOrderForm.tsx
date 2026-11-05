"use client";

import { useState } from "react";
import { FulfilmentFields } from "./Fulfilment";
import { buildCustomOrderMessage, isoDaysFromNow, newOrderId, whatsappLink } from "@/lib/order";
import { CAKE_ORDER_TYPE, customOrderTypes, occasions } from "@/data/site";

const sizes = ["6 inch", "8 inch", "10 inch", "12 inch", "Not sure yet"];
const flavours = ["Vanilla", "Chocolate", "Red velvet", "Fruit cake", "Mix of flavours"];
const tiers = ["1", "2", "3", "4 or more"];
// Shown with the naira sign on the site, sent with a plain N in the message.
const budgets = ["Under 50,000", "50,000 to 100,000", "100,000 to 200,000", "Above 200,000"];

export function CustomOrderForm() {
  const [f, setF] = useState({
    name: "", orderType: customOrderTypes[0], occasion: occasions[0], quantity: "", details: "",
    date: "", budget: budgets[1],
    size: sizes[1], flavour: flavours[0], tiers: tiers[0], text: "", colours: "",
  });
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [area, setArea] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const isCake = f.orderType === CAKE_ORDER_TYPE;
  const minDays = isCake ? 5 : 2;

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const id = newOrderId();
    const msg = buildCustomOrderMessage(
      id,
      { ...f, budget: f.budget.replace(/(\d[\d,]*)/g, "N$1"), fulfilment: { mode, area } },
      CAKE_ORDER_TYPE,
    );
    window.open(whatsappLink(msg), "_blank", "noopener");
    setSent(id);
  }

  const select = (id: keyof typeof f, label: string, opts: string[], fmt = (o: string) => o) => (
    <div>
      <label htmlFor={`co-${id}`} className="field-label">{label}</label>
      <select id={`co-${id}`} className="field" value={f[id]} onChange={set(id)}>
        {opts.map((o) => <option key={o} value={o}>{fmt(o)}</option>)}
      </select>
    </div>
  );

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="co-name" className="field-label">Your name</label>
        <input id="co-name" className="field" required value={f.name} onChange={set("name")} autoComplete="name" />
      </div>
      {select("orderType", "What do you want to order?", customOrderTypes)}
      {select("occasion", "Occasion", occasions)}
      <div className="sm:col-span-2">
        <label htmlFor="co-quantity" className="field-label">Quantity or size</label>
        <input id="co-quantity" className="field" value={f.quantity} onChange={set("quantity")} placeholder="e.g. 2 trays serving 25, or a box of 12" />
      </div>
      <div>
        <label htmlFor="co-date" className="field-label">Date needed</label>
        <input id="co-date" type="date" className="field" required min={isoDaysFromNow(minDays)} value={f.date} onChange={set("date")} />
      </div>
      {select("budget", "Budget range", budgets, (o) => o.replace(/(\d[\d,]*)/g, "₦$1"))}

      {isCake && (
        <>
          {select("size", "Cake size", sizes)}
          {select("flavour", "Flavour", flavours)}
          {select("tiers", "Number of tiers", tiers)}
          <div>
            <label htmlFor="co-text" className="field-label">Text on the cake</label>
            <input id="co-text" className="field" value={f.text} onChange={set("text")} placeholder="Happy 30th Ada" />
          </div>
          <div>
            <label htmlFor="co-colours" className="field-label">Colour theme</label>
            <input id="co-colours" className="field" value={f.colours} onChange={set("colours")} placeholder="Gold and white" />
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label htmlFor="co-details" className="field-label">Tell us more</label>
        <textarea id="co-details" className="field min-h-28" value={f.details} onChange={set("details")} placeholder="What you have in mind, allergies, a flavour or filling you like" />
      </div>
      <div className="grid gap-4 sm:col-span-2">
        <FulfilmentFields idPrefix="co" mode={mode} area={area} onMode={setMode} onArea={setArea} />
      </div>
      <p className="rounded-[12px] bg-white p-4 text-[15px] sm:col-span-2">
        Have a picture of what you like? Send it in the chat right after your message opens in WhatsApp.
      </p>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto">Send request on WhatsApp</button>
        {sent && <p className="mt-3 text-sm" role="status">Request <strong>{sent}</strong> opened in WhatsApp. Press send there, then add your pictures.</p>}
      </div>
    </form>
  );
}
