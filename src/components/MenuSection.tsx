"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, menu } from "@/data/site";
import { CardAdd } from "./AddToCart";

const idFor = (c: string) => `cat-${c.toLowerCase().replace(/\s+/g, "-")}`;

export function MenuSection() {
  const groups = categories
    .map((c) => ({ name: c, items: menu.filter((m) => m.category === c) }))
    .filter((g) => g.items.length > 0);
  const [active, setActive] = useState<string | undefined>(groups[0]?.name);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.getAttribute("data-cat") || undefined);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    document.querySelectorAll("[data-cat]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="menu" className="section-anchor" aria-labelledby="menu-title">
      <div className="mx-auto max-w-6xl px-4 pt-16 md:pt-24">
        <h2 id="menu-title" className="font-display text-4xl md:text-5xl">The menu</h2>
        <p className="mt-3 max-w-xl text-lg text-cocoa/80">Food, drinks and pastry. Pick a size, add it, and send the whole order on WhatsApp. We reply with your total.</p>
      </div>

      <div className="sticky top-16 z-20 mt-6 border-y border-line bg-cream">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2" aria-label="Menu categories">
          {groups.map((g) => (
            <a
              key={g.name}
              href={`#${idFor(g.name)}`}
              aria-current={active === g.name ? "true" : undefined}
              className={`flex min-h-11 shrink-0 items-center rounded-full px-4 text-[15px] font-semibold transition-colors ${
                active === g.name ? "bg-tomato text-white" : "hover:bg-line/70"
              }`}
            >
              {g.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {groups.map((g, gi) => (
          <div key={g.name} id={idFor(g.name)} data-cat={g.name} className="section-anchor pt-10">
            <h3 className="font-display text-2xl md:text-3xl">{g.name}</h3>
            <ul className="mt-5 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item, i) => (
                <li key={item.slug} className="flex flex-col">
                  <Link href={`/menu/${item.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden photo bg-line">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        className={`object-cover transition-transform duration-500 group-hover:scale-[1.03] ${item.available ? "" : "grayscale-[60%]"}`}
                        priority={gi === 0 && i === 0}
                      />
                      {!item.available && (
                        <span className="absolute left-3 top-3 rounded-full bg-butter px-3 py-1 text-sm font-semibold">Sold out today</span>
                      )}
                    </div>
                    <h4 className="mt-3 font-display text-xl group-hover:text-tomato">{item.name}</h4>
                    <p className="mt-1 line-clamp-2 text-[15px] text-cocoa/75">{item.description}</p>
                  </Link>
                  <div className="mt-3">
                    <CardAdd item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
