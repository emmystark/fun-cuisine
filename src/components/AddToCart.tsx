"use client";

import { useState } from "react";
import type { MenuItem } from "@/data/site";
import { naira } from "@/lib/order";
import { useCart } from "./CartProvider";

/** Size picker plus Add button used on menu cards. */
export function CardAdd({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [option, setOption] = useState(0);
  const [added, setAdded] = useState(false);

  if (!item.available) {
    return <p className="flex min-h-11 items-center text-sm font-semibold text-cocoa/75">Sold out today</p>;
  }

  const opt = item.options[option];
  return (
    <div className="flex gap-2">
      {item.options.length > 1 && (
        <select
          aria-label={`Size for ${item.name}`}
          value={option}
          onChange={(e) => setOption(Number(e.target.value))}
          className="h-11 min-w-0 flex-1 rounded-full border border-line bg-white px-3 text-sm"
        >
          {item.options.map((o, i) => (
            <option key={o.label} value={i}>{o.label} &middot; {naira(o.price)}</option>
          ))}
        </select>
      )}
      <button
        type="button"
        onClick={() => {
          add({ slug: item.slug, name: item.name, option: opt.label, price: opt.price, image: item.image });
          setAdded(true);
          setTimeout(() => setAdded(false), 1400);
        }}
        className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold text-white transition-colors ${
          added ? "bg-cocoa" : "bg-tomato hover:bg-[#bd3a21]"
        } ${item.options.length > 1 ? "" : "flex-1"}`}
        aria-label={`Add ${item.name}, ${opt.label}, to order`}
      >
        {added ? "Added" : "Add"}
      </button>
    </div>
  );
}
