import { SITE_URL, WHATSAPP_NUMBER, type MenuItem } from "@/data/site";

const grouped = (n: number) => n.toLocaleString("en-US");

/** For the website: ₦12,500 */
export const naira = (n: number) => `₦${grouped(n)}`;
/** For WhatsApp messages: N12,500 (the naira sign breaks on some older phones) */
export const plainNaira = (n: number) => `N${grouped(n)}`;

export const startingPrice = (item: MenuItem) => Math.min(...item.options.map((o) => o.price));

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
  price: number;
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
  const total = input.lines.reduce((s, l) => s + l.price * l.qty, 0);
  const items = input.lines.map(
    (l) => `${l.qty} x ${l.name} (${l.option}) : ${plainNaira(l.price * l.qty)}`,
  );
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
    `Total: ${plainNaira(total)}`,
    "",
    ...details,
    "",
    "Photos:",
    ...links,
  ].join("\n");
}

export type CustomCake = {
  name: string;
  occasion: string;
  size: string;
  flavour: string;
  tiers: string;
  date: string;
  text: string;
  colours: string;
  budget: string;
  fulfilment: Fulfilment;
};

export function buildCustomCakeMessage(id: string, c: CustomCake) {
  const rows: [string, string][] = [
    ["Name", c.name],
    ["Occasion", c.occasion],
    ["Cake size", c.size],
    ["Flavour", c.flavour],
    ["Tiers", c.tiers],
    ["Date needed", shortDate(c.date)],
    ["Text on the cake", c.text],
    ["Colour theme", c.colours],
    ["Budget", c.budget],
  ];
  return [
    `Custom cake request ${id}`,
    "",
    ...rows.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim()}`),
    fulfilmentLine(c.fulfilment),
    "",
    "I will send reference pictures next.",
  ].join("\n");
}
