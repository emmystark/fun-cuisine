// Makes the QR code and the A5 table card for events.
// Run with: node scripts/make-print.mjs   (reads the WhatsApp number from src/data/site.ts)
import { readFileSync, writeFileSync } from "node:fs";
import QRCode from "qrcode";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const URL = "https://funcuisine.com.ng";
const site = readFileSync("src/data/site.ts", "utf8");
const number = site.match(/WHATSAPP_NUMBER = "(\d+)"/)[1];
const pretty = `+${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6, 9)} ${number.slice(9)}`;

const cocoa = "#3A2418";
const qrPng = await QRCode.toBuffer(URL, {
  width: 2400, margin: 2, errorCorrectionLevel: "H", color: { dark: cocoa, light: "#FFFFFF" },
});
writeFileSync("print/funcuisine-qr.png", qrPng);

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const doc = await PDFDocument.create();
doc.registerFontkit(fontkit);
doc.setTitle("Fun Cuisine table card");
const serif = await doc.embedFont(readFileSync("node_modules/@fontsource/young-serif/files/young-serif-latin-400-normal.woff"));
const sans = await doc.embedFont(readFileSync("node_modules/@fontsource/figtree/files/figtree-latin-600-normal.woff"));
const sansReg = await doc.embedFont(readFileSync("node_modules/@fontsource/figtree/files/figtree-latin-400-normal.woff"));

const W = 419.53, H = 595.28; // A5 in points
const page = doc.addPage([W, H]);
page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: hex("#FBF4EA") });
const center = (text, font, size, y, color = hex(cocoa)) =>
  page.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color });

// wordmark: whisk + name
const name = "Fun Cuisine", nameSize = 40;
const nameW = serif.widthOfTextAtSize(name, nameSize);
const markW = 38, gap = 8, startX = (W - (markW + gap + nameW)) / 2, baseY = H - 108;
const whisk = [
  "M17.6 14.2c3.9-3.1 6.9-7 6.1-9.6-.8-2.5-5.4-1.4-8.6 2.4-2.9 3.5-3.4 6.4-1.6 7.6",
  "M16.2 13.4c1.6-3.2 3.3-6.6 5.4-8.4", "M15.4 14.8c3-1.4 6.7-3.9 8.5-6.6",
  "M14.6 15.6 6.3 25.7", "M7.9 27.2c-1.1.6-2.4-.2-2.8-1.3-.2-.6 0-1.2.5-1.7",
];
const scale = markW / 32, markTop = baseY + 34;
for (const d of whisk) page.drawSvgPath(d, { x: startX, y: markTop, scale, borderColor: hex(cocoa), borderWidth: 1.8, borderLineCap: 1 });
page.drawCircle({ x: startX + 25.6 * scale, y: markTop - 22.8 * scale, size: 1.6 * scale, color: hex("#D6452A") });
page.drawText(name, { x: startX + markW + gap, y: baseY, size: nameSize, font: serif, color: hex(cocoa) });

center("Food, drinks and pastry in Lagos", sansReg, 13, baseY - 30, hex("#6b5446"));

// QR on a white tile
const qr = await doc.embedPng(qrPng);
const q = 230, qx = (W - q) / 2, qy = 170;
page.drawRectangle({ x: qx - 14, y: qy - 14, width: q + 28, height: q + 28, color: rgb(1, 1, 1), borderColor: hex("#E8DCCB"), borderWidth: 1 });
page.drawImage(qr, { x: qx, y: qy, width: q, height: q });

center("Scan to see the menu and order", serif, 22, qy - 52);
center("funcuisine.com.ng", sans, 14, qy - 76, hex("#D6452A"));

page.drawLine({ start: { x: 60, y: 62 }, end: { x: W - 60, y: 62 }, thickness: 1, color: hex("#E8DCCB") });
center(`WhatsApp ${pretty}`, sans, 14, 38);

writeFileSync("print/funcuisine-a5-card.pdf", await doc.save());
console.log("Wrote print/funcuisine-qr.png and print/funcuisine-a5-card.pdf for", URL, "with", pretty);
