// One-off: turns the raw photos in /images-raw into web-ready WebP files in /public/menu.
// Run with: node scripts/process-images.mjs
import sharp from "sharp";
import { statSync } from "node:fs";

const jobs = [
  { src: "chat-1.jpg", out: "meat-pie" },
  { src: "zip-5.jpg", out: "pastry-box" },
  { src: "zip-6.jpg", out: "ring-doughnuts" },
  { src: "zip-4.jpg", out: "filled-doughnuts" },
  { src: "swiss-roll-2.webp", out: "chocolate-swiss-roll" },
  // crop off the caption text burned into the bottom of the photo
  { src: "chat-3.jpg", out: "rice-and-chicken-plate", crop: { left: 0, top: 60, width: 969, height: 1050 } },
  { src: "zip-1.jpg", out: "party-jollof-rice" },
  { src: "zip-3.jpg", out: "grilled-turkey-wings" },
  // drinks: each raw photo is a 4 photo collage with a caption in the middle, so crop one clean quarter
  { src: "drinks-4.jpg", out: "margarita", crop: { left: 0, top: 548, width: 384, height: 500 } },
  { src: "drinks-5.jpg", out: "long-island-iced-tea", crop: { left: 370, top: 0, width: 340, height: 470 } },
  { src: "drinks-6.jpg", out: "negroni", crop: { left: 0, top: 0, width: 368, height: 478 } },
  { src: "drinks-7.jpg", out: "blue-lagoon", crop: { left: 372, top: 545, width: 345, height: 498 } },
];

for (const j of jobs) {
  let img = sharp(`images-raw/${j.src}`).rotate();
  if (j.crop) img = img.extract(j.crop);
  const out = `public/menu/${j.out}.webp`;
  await img.resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  console.log(out, Math.round(statSync(out).size / 1024) + "KB");
}
