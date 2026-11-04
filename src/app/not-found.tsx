import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/site";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
      <div className="relative aspect-[4/3] overflow-hidden photo">
        <Image src={photos.customOrders} alt="" fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-cocoa/75">Page not found</p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl">This plate is empty.</h1>
        <p className="mt-4 text-lg text-cocoa/80">The page you followed is not here. It may have moved or been taken off the menu.</p>
        <Link href="/#menu" className="btn-primary mt-7">See the menu</Link>
      </div>
    </div>
  );
}
