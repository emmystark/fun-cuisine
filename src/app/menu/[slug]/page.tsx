import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, menu } from "@/data/site";
import { naira, plainNaira, startingPrice } from "@/lib/order";
import { ItemOrder } from "@/components/ItemOrder";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return menu.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = menu.find((m) => m.slug === slug);
  if (!item) return {};
  const title = `${item.name} | ${business.name}`;
  const description = `From ${plainNaira(startingPrice(item))}. ${item.description} Order on WhatsApp.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: { title, description, url: `/menu/${item.slug}`, siteName: business.name, locale: "en_NG", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ItemPage({ params }: Props) {
  const { slug } = await params;
  const item = menu.find((m) => m.slug === slug);
  if (!item) notFound();
  const more = menu.filter((m) => m.category === item.category && m.slug !== item.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-4 md:pt-10">
      <Link href="/#menu" className="inline-flex min-h-11 items-center text-[15px] font-medium hover:text-tomato">
        <span aria-hidden="true" className="mr-1.5">&larr;</span> Back to the menu
      </Link>
      <div className="mt-2 grid gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
        <div className="relative aspect-[4/5] overflow-hidden photo bg-line md:aspect-square">
          <Image src={item.image} alt={item.name} fill priority sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
        </div>
        <div className="md:pt-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-cocoa/75">{item.category}</p>
          <h1 className="mt-2 font-display text-4xl leading-tight md:text-5xl">{item.name}</h1>
          <p className="mt-2 text-xl font-semibold text-tomato">From {naira(startingPrice(item))}</p>
          <p className="mt-4 text-lg text-cocoa/85">{item.description}</p>
          <ItemOrder item={item} />
          <p className="mt-6 border-t border-line pt-4 text-[15px] text-cocoa/75">
            <strong className="text-cocoa">{item.leadTime}.</strong> {business.deliveryNote}
          </p>
        </div>
      </div>

      {more.length > 0 && (
        <section className="mt-20" aria-labelledby="more-title">
          <h2 id="more-title" className="font-display text-2xl">More {item.category.toLowerCase()}</h2>
          <ul className="mt-5 grid gap-6 sm:grid-cols-3">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/menu/${m.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden photo">
                    <Image src={m.image} alt={m.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                  </div>
                  <p className="mt-2 font-display text-lg group-hover:text-tomato">{m.name}</p>
                  <p className="text-[15px] font-semibold text-tomato">From {naira(startingPrice(m))}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
