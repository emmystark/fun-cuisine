"use client";

import { useState } from "react";
import type { MenuItem } from "@/data/site";
import { naira } from "@/lib/order";
import { useCart } from "./CartProvider";
import { Stepper } from "./Stepper";

export function ItemOrder({ item }: { item: MenuItem }) {
  const { add, setOpen } = useCart();
  const [option, setOption] = useState(0);
  const [qty, setQty] = useState(1);
  const opt = item.options[option];

  return (
    <div className="mt-6">
      <fieldset>
        <legend className="field-label">Size</legend>
        <div className="mt-2 grid gap-2">
          {item.options.map((o, i) => (
            <label key={o.label} className={`choice !justify-between px-4 ${option === i ? "choice-on" : ""}`}>
              <input type="radio" name="size" className="sr-only" checked={option === i} onChange={() => setOption(i)} disabled={!item.available} />
              <span>{o.label}</span>
              <span className="font-semibold text-tomato">{naira(o.price)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {item.available ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Stepper value={qty} onChange={setQty} label="Quantity" />
          <button
            type="button"
            className="btn-primary flex-1"
            onClick={() => {
              add({ slug: item.slug, name: item.name, option: opt.label, price: opt.price, image: item.image }, qty);
              setQty(1);
              setOpen(true);
            }}
          >
            Add to order &middot; {naira(opt.price * qty)}
          </button>
        </div>
      ) : (
        <p className="mt-6 rounded-[12px] bg-butter/60 p-4 font-semibold">Sold out today. Check back tomorrow or message us.</p>
      )}
    </div>
  );
}
