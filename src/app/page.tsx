import Image from "next/image";
import { business, menu, photos } from "@/data/site";
import { MenuSection } from "@/components/MenuSection";
import { CustomOrderForm } from "@/components/CustomOrderForm";

const steps = [
  { n: "1", title: "Pick your food", body: "Choose sizes and how many. Everything goes into one order." },
  { n: "2", title: "Send it on WhatsApp", body: "Your order opens in WhatsApp, already written out. Just press send." },
  { n: "3", title: "Confirm and pay", body: "We reply with your total and delivery fee. You pay by transfer, and we get to work." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-4 pt-6 md:grid-cols-[1fr_1.1fr] md:gap-12 md:pt-14">
        <div className="order-2 md:order-1">
          <p className="inline-block rounded-full bg-butter px-3 py-1 text-sm font-semibold">Made to order in Lagos</p>
          <h1 className="mt-4 font-display text-[2.6rem] leading-[1.05] md:text-6xl">
            Party jollof and fresh pastry for every occasion.
          </h1>
          <p className="mt-5 max-w-md text-lg text-cocoa/80">
            Food, drinks and pastry for your home, your office or your owambe. Pick what you want and send it straight to us on WhatsApp.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#menu" className="btn-primary">See the menu</a>
            <a href="#custom" className="btn-secondary">Make a custom order</a>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/3.4] overflow-hidden photo md:order-2">
          <Image
            src={photos.hero}
            alt="Jollof rice, fried rice, fried plantain and chicken on a black plate"
            fill
            priority
            sizes="(min-width: 768px) 560px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <MenuSection />

      {/* Custom orders */}
      <section id="custom" className="section-anchor mt-24 border-y border-line bg-[#F6EBDC]" aria-labelledby="custom-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <h2 id="custom-title" className="font-display text-4xl md:text-5xl">Custom orders</h2>
            <p className="mt-4 max-w-md text-lg text-cocoa/80">
              Trays for your owambe, pastry for the office, drinks for your party, or a cake for someone special. Tell us what you need and your budget, and we will work it out with you on WhatsApp.
            </p>
            <p className="mt-3 text-cocoa/70">{business.customOrderNote}</p>
            <div className="relative mt-8 hidden aspect-[4/5] overflow-hidden photo md:block">
              <Image src={photos.customOrders} alt="Slices of chocolate swiss roll with cream filling" fill sizes="440px" className="object-cover" />
            </div>
          </div>
          <CustomOrderForm />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24" aria-labelledby="how-title">
        <h2 id="how-title" className="font-display text-3xl md:text-4xl">How ordering works</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-t-2 border-cocoa pt-4">
              <span className="font-display text-3xl text-tomato">{s.n}</span>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-cocoa/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* About */}
      <section id="about" className="section-anchor mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 md:grid-cols-2 md:pb-28" aria-labelledby="about-title">
        <div className="relative aspect-[4/5] overflow-hidden photo md:aspect-[5/6]">
          <Image src={photos.about} alt="Freshly baked meat pies packed in a box" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 id="about-title" className="font-display text-4xl md:text-5xl">From our kitchen</h2>
          <p className="mt-5 text-lg leading-relaxed text-cocoa/85">{business.about}</p>
          <p className="mt-4 text-cocoa/75">{menu.length} things on the menu right now, and custom orders made the way you want them.</p>
        </div>
      </section>
    </>
  );
}
