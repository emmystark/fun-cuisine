"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartLine } from "@/lib/order";

const KEY = "funcuisine-cart-v1";

type Cart = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (slug: string, option: string, qty: number) => void;
  remove: (slug: string, option: string) => void;
  clear: () => void;
};

const CartContext = createContext<Cart | null>(null);

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

const same = (l: CartLine, slug: string, option: string) => l.slug === slug && l.option === option;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // storage blocked or corrupt: start with an empty cart
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      // storage full or blocked: cart still works for this visit
    }
  }, [lines, loaded]);

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => same(l, line.slug, line.option));
      if (found) return prev.map((l) => (l === found ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
      return [...prev, { ...line, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, option: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !same(l, slug, option))
        : prev.map((l) => (same(l, slug, option) ? { ...l, qty: Math.min(99, qty) } : l)),
    );
  }, []);

  const remove = useCallback(
    (slug: string, option: string) => setLines((prev) => prev.filter((l) => !same(l, slug, option))),
    [],
  );

  const value = useMemo<Cart>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.price, 0),
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear: () => setLines([]),
    }),
    [lines, open, add, setQty, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
