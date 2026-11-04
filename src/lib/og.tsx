import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Where the food sits in each photo, from 0 (top) to 1 (bottom). Used to crop the preview card.
const focusY: Record<string, number> = {
  "/menu/meat-pie.webp": 0.56,
  "/menu/pastry-box.webp": 0.45,
  "/menu/ring-doughnuts.webp": 0.4,
  "/menu/filled-doughnuts.webp": 0.4,
  "/menu/chocolate-swiss-roll.webp": 0.6,
  "/menu/rice-and-chicken-plate.webp": 0.5,
  "/menu/party-jollof-rice.webp": 0.4,
  "/menu/grilled-turkey-wings.webp": 0.45,
};

async function cropPhoto(image: string, width: number, height: number) {
  const file = path.join(process.cwd(), "public", image);
  const meta = await sharp(file).metadata();
  const scale = Math.max(width / meta.width!, height / meta.height!);
  const w = Math.round(meta.width! * scale);
  const h = Math.round(meta.height! * scale);
  const fy = focusY[image] ?? 0.5;
  const top = Math.max(0, Math.min(h - height, Math.round(h * fy - height / 2)));
  const left = Math.round((w - width) / 2);
  return sharp(file).resize(w, h).extract({ left, top, width, height }).jpeg({ quality: 82 }).toBuffer();
}

const fontFile = (pkg: string, file: string) =>
  readFile(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

/** Photo across the whole card, with a cream bar at the bottom holding the name and price. */
export async function renderOg({ image, title, price }: { image: string; title: string; price: string }) {
  const BAR = 150;
  const photo = await cropPhoto(image, ogSize.width, ogSize.height - BAR);
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const [serif, sans] = await Promise.all([
    fontFile("young-serif", "young-serif-latin-400-normal.woff"),
    fontFile("figtree", "figtree-latin-600-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#FBF4EA" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={ogSize.width} height={ogSize.height - BAR} alt="" style={{ objectFit: "cover" }} />
        <div
          style={{
            height: BAR, display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 56px", borderTop: "6px solid #D6452A", color: "#3A2418",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Young Serif", fontSize: 54, lineHeight: 1.05 }}>{title}</div>
            <div style={{ fontFamily: "Figtree", fontSize: 26, marginTop: 6, opacity: 0.75 }}>Fun Cuisine &middot; funcuisine.com.ng</div>
          </div>
          {price ? (
            <div style={{ fontFamily: "Figtree", fontSize: 40, color: "#D6452A", display: "flex" }}>{price}</div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Young Serif", data: serif, weight: 400, style: "normal" },
        { name: "Figtree", data: sans, weight: 600, style: "normal" },
      ],
    },
  );
}
