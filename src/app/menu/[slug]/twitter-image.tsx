import { menu } from "@/data/site";
import { plainNaira, startingPrice } from "@/lib/order";
import { renderOg } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fun Cuisine menu item";

export function generateStaticParams() {
  return menu.map((m) => ({ slug: m.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = menu.find((m) => m.slug === slug)!;
  return renderOg({ image: item.image, title: item.name, price: `From ${plainNaira(startingPrice(item))}` });
}
