import { SITE_URL, WHATSAPP_NUMBER } from "@/data/site";

export const newOrderId = () => `FC${Math.floor(1000 + Math.random() * 9000)}`;

/** "2026-11-14" -> "Sat 14 Nov" */
export function shortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const day = date.toLocaleDateString("en-GB", { weekday: "short" });
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  return `${day} ${d} ${month}`;
}

/** Local date as yyyy-mm-dd, offset by some days. Used for the date picker minimum. */
export function isoDaysFromNow(days = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export const itemUrl = (slug: string) => `${SITE_URL.replace(/\/$/, "")}/menu/${slug}`;

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export type CartLine = {
  slug: string;
  name: string;
  option: string;
  qty: number;
  image: string;
};

export type Fulfilment = { mode: "pickup" | "delivery"; area?: string };

const fulfilmentLine = (f: Fulfilment) =>
  f.mode === "delivery" ? `Delivery to: ${f.area?.trim()}` : "Pickup: I will pick up";

export function buildOrderMessage(input: {
  id: string;
  lines: CartLine[];
  name: string;
  date: string;
  fulfilment: Fulfilment;
  note?: string;
}) {
  const items = input.lines.map((l) => `${l.qty} x ${l.name} (${l.option})`);
  const details = [
    `Name: ${input.name.trim()}`,
    `Date needed: ${shortDate(input.date)}`,
    fulfilmentLine(input.fulfilment),
  ];
  if (input.note?.trim()) details.push(`Note: ${input.note.trim()}`);
  const links = [...new Set(input.lines.map((l) => l.slug))].map(itemUrl);

  return [
    `New order ${input.id}`,
    "",
    ...items,
    "",
    ...details,
    "",
    "Photos:",
    ...links,
  ].join("\n");
}

export type CustomOrder = {
  name: string;
  orderType: string;
  occasion: string;
  quantity: string;
  details: string;
  date: string;
  budget: string;
  fulfilment: Fulfilment;
  // Only used when orderType is the cake type.
  size?: string;
  flavour?: string;
  tiers?: string;
  text?: string;
  colours?: string;
};

export function buildCustomOrderMessage(id: string, c: CustomOrder, cakeType: string) {
  const isCake = c.orderType === cakeType;
  const rows: [string, string | undefined][] = [
    ["Name", c.name],
    ["Order type", c.orderType],
    ["Occasion", c.occasion],
    ["Quantity or size", c.quantity],
    ["Date needed", c.date ? shortDate(c.date) : ""],
    ["Budget", c.budget],
  ];
  if (isCake) {
    rows.push(
      ["Cake size", c.size],
      ["Flavour", c.flavour],
      ["Tiers", c.tiers],
      ["Text on the cake", c.text],
      ["Colour theme", c.colours],
    );
  }
  return [
    `Custom order request ${id}`,
    "",
    ...rows.filter(([, v]) => v?.trim()).map(([k, v]) => `${k}: ${v!.trim()}`),
    "",
    "Details:",
    c.details.trim() || "-",
    "",
    fulfilmentLine(c.fulfilment),
    "",
    "I will send reference pictures next.",
  ].join("\n");
}
