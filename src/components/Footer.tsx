import Link from "next/link";
import { Logo } from "./Logo";
import { WHATSAPP_NUMBER, business } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-cocoa/80">{business.tagline}.</p>
          <p className="mt-4 max-w-sm text-sm text-cocoa/70">{business.leadTimeNote}</p>
        </div>
        <div>
          <h2 className="font-display text-lg">Talk to us</h2>
          <ul className="mt-3 space-y-1">
            <li><a className="flex min-h-11 items-center hover:text-tomato" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener">WhatsApp +{WHATSAPP_NUMBER}</a></li>
            <li><a className="flex min-h-11 items-center hover:text-tomato" href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noopener">Instagram @{business.instagram}</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg">We deliver to</h2>
          <p className="mt-3 text-cocoa/80">{business.areasServed.join(", ")}</p>
          <p className="mt-2 text-sm text-cocoa/70">Somewhere else in Lagos? Ask us.</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl justify-between border-t border-line px-4 py-5 text-sm text-cocoa/75">
        <span>&copy; {new Date().getFullYear()} {business.name}</span>
        <Link href="/#menu" className="hover:text-tomato">Menu</Link>
      </div>
    </footer>
  );
}
