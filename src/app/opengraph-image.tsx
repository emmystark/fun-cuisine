import { photos } from "@/data/site";
import { renderOg } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fun Cuisine. Food, drinks and pastry in Lagos";

export default function Image() {
  return renderOg({ image: photos.hero, title: "Fun Cuisine", label: "Order on WhatsApp" });
}
