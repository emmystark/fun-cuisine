import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: { formats: ["image/avif", "image/webp"] },
  // OG image routes read photos and font files from disk
  outputFileTracingIncludes: {
    "/menu/[slug]/opengraph-image": ["./public/menu/**", "./node_modules/@fontsource/young-serif/files/*.woff", "./node_modules/@fontsource/figtree/files/*.woff"],
    "/menu/[slug]/twitter-image": ["./public/menu/**", "./node_modules/@fontsource/young-serif/files/*.woff", "./node_modules/@fontsource/figtree/files/*.woff"],
  },
};

export default nextConfig;
