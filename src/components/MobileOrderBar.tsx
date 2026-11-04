"use client";

import { useCart } from "./CartProvider";
import { naira } from "@/lib/order";

export function MobileOrderBar() {
  const { count, total, open, setOpen } = useCart();
  if (count === 0 || open) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream p-3 md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-13 w-full items-center justify-between rounded-full bg-tomato px-6 font-semibold text-white"
      >
        <span>View order ({count})</span>
        <span className="tabular-nums">{naira(total)}</span>
      </button>
    </div>
  );
}
