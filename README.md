# Fun Cuisine website

The menu and ordering site for funcuisine.com.ng. Customers pick food, add it to their order and send it on WhatsApp. There is no database or payment on the site. Payment happens by transfer inside WhatsApp.

## Changing the menu

Everything you can change is in one file: `src/data/site.ts`. Open it on GitHub, click the pencil icon to edit, make the change, then click "Commit changes". Vercel puts the new version live on its own within about a minute.

A few rules for editing:

- Keep the quote marks `"` around words.
- Keep the commas at the end of lines.

### Prices

The site doesn't show prices. Customers send their order on WhatsApp, and you reply with the total.

### Change the sizes on an item

Find the item by its name. `options` lists the sizes customers can pick, each one in quote marks:

```ts
options: ["Box of 6", "Box of 12"],
```

Add, remove or rename sizes in that list. Every item needs at least one.

### Add an item

1. Put the photo in the `public/menu` folder. Use a simple name with dashes, like `coconut-cake.webp` (JPG is fine too).
2. In `site.ts`, copy a whole item block, from its `{` down to its `},`, and paste it under the last item.
3. Change the details:
   - `slug`: the web address for the item, lowercase with dashes, for example `coconut-cake`. Every item needs a different one.
   - `name`: what customers see.
   - `category`: one of the names in the `categories` list near the top of the file. To add a new category, add it to that list too. The list order is the order on the menu.
   - `description`: one or two short sentences.
   - `image`: `"/menu/coconut-cake.webp"`
   - `options`: the sizes, for example `["Single glass", "Party batch, serves 10"]`.
   - `leadTime`: for example `"Order 2 days ahead"`.
   - `available`: `true`

### Mark an item sold out

Change `available: true` to `available: false` on that item. The site shows "Sold out today" and customers can't add it to an order. Change it back to `true` when it's available again.

### Change the WhatsApp number

At the top of `site.ts`:

```ts
export const WHATSAPP_NUMBER = "2349030987132";
```

Use the full international number with no `+`, no spaces and no leading 0. For example, 0803 123 4567 becomes `2348031234567`.

The printed card has the number on it too. After you change the number, ask your developer to run `node scripts/make-print.mjs` to make a new card.

### Other text

The business name, tagline, about text, delivery areas, Instagram handle, contact email, delivery note and lead time note are all in the `business` section at the top of `site.ts`.

## For developers

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

- `NEXT_PUBLIC_SITE_URL` sets the base URL used in WhatsApp links and Open Graph tags. It defaults to `https://funcuisine.com.ng`.
- `node scripts/process-images.mjs` converts photos in `images-raw/` into WebP files in `public/menu/`.
- `node scripts/make-print.mjs` regenerates `print/funcuisine-qr.png` and `print/funcuisine-a5-card.pdf`.
- WhatsApp preview cards come from `src/app/menu/[slug]/opengraph-image.tsx`. To change where a photo is cropped on its card, edit `focusY` in `src/lib/og.tsx`.
# fun-cuisine
