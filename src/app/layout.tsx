import type { Metadata, Viewport } from "next";
import { Young_Serif, Figtree } from "next/font/google";
import { SITE_URL, business } from "@/data/site";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import "./globals.css";

const youngSerif = Young_Serif({ weight: "400", subsets: ["latin"], variable: "--font-young-serif" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

const title = `${business.name} | Food, drinks and pastry in Lagos`;
const description = "Party jollof, cocktails, meat pies and doughnuts, made to order in Lagos. Order on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: business.name, locale: "en_NG", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#FBF4EA" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${youngSerif.variable} ${figtree.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <MobileOrderBar />
        </CartProvider>
      </body>
    </html>
  );
}
