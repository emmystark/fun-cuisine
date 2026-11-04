// All the content you can edit lives in this one file.
// See the README section "Changing the menu" for how.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://funcuisine.com.ng";

// WhatsApp number in international format, no plus sign, no spaces.
export const WHATSAPP_NUMBER = "2348000000000"; // TODO real number

export const business = {
  name: "Fun Cuisine",
  tagline: "Cakes, small chops and home cooking from our Lagos kitchen",
  // TODO replace with her own words
  about:
    "Fun Cuisine is a small Lagos kitchen that does both the oven and the pot. One day it is trays of meat pie and doughnuts for an office, the next it is party jollof and turkey wings for a naming ceremony. Everything is made to order, so it reaches you fresh.",
  areasServed: ["Lekki", "Ajah", "Victoria Island", "Ikoyi", "Surulere", "Yaba"], // TODO confirm areas
  instagram: "funcuisine", // TODO real handle, no @
  deliveryNote: "We deliver within Lagos. Delivery fee depends on your area and we confirm it on WhatsApp.",
  leadTimeNote: "Please order at least 48 hours ahead. Custom cakes need 5 days.",
};

export type MenuOption = { label: string; price: number };
export type MenuItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string; // path inside /public, e.g. "/menu/chocolate-cake.webp"
  options: MenuOption[];
  leadTime: string;
  available: boolean;
};

// Categories in the order they appear on the menu.
export const categories = ["Pastries", "Doughnuts", "Cakes", "Meals"] as const;

export const menu: MenuItem[] = [
  {
    slug: "meat-pie",
    name: "Meat Pie",
    category: "Pastries",
    description: "Buttery shortcrust filled with minced beef, potato and carrot. Golden on top, soft inside.",
    image: "/menu/meat-pie.webp",
    options: [
      { label: "Box of 6", price: 6000 }, // TODO price
      { label: "Box of 12", price: 11500 }, // TODO price
    ],
    leadTime: "Order 24 hours ahead",
    available: true,
  },
  {
    slug: "pastry-box",
    name: "Pastry Box",
    category: "Pastries",
    description: "A mix of sausage rolls, meat pies and chicken pie. Good for the office or a small get together.",
    image: "/menu/pastry-box.webp",
    options: [
      { label: "Box of 6", price: 7000 }, // TODO price
      { label: "Box of 12", price: 13500 }, // TODO price
    ],
    leadTime: "Order 24 hours ahead",
    available: true,
  },
  {
    slug: "ring-doughnuts",
    name: "Ring Doughnuts",
    category: "Doughnuts",
    description: "Soft, fluffy yeast doughnuts. Plain with a light sugar coat, or glazed on request.",
    image: "/menu/ring-doughnuts.webp",
    options: [
      { label: "Box of 6", price: 4500 }, // TODO price
      { label: "Box of 12", price: 8500 }, // TODO price
    ],
    leadTime: "Order 24 hours ahead",
    available: true,
  },
  {
    slug: "filled-doughnuts",
    name: "Filled Doughnuts",
    category: "Doughnuts",
    description: "Big round doughnuts filled with custard or jam. Tell us which filling in your note.",
    image: "/menu/filled-doughnuts.webp",
    options: [
      { label: "Box of 4", price: 5000 }, // TODO price
      { label: "Box of 8", price: 9500 }, // TODO price
    ],
    leadTime: "Order 24 hours ahead",
    available: true,
  },
  {
    slug: "chocolate-swiss-roll",
    name: "Chocolate Swiss Roll",
    category: "Cakes",
    description: "Moist chocolate sponge rolled up with fresh whipped cream.",
    image: "/menu/chocolate-swiss-roll.webp",
    options: [
      { label: "Full roll", price: 9000 }, // TODO price
      { label: "Half roll", price: 5000 }, // TODO price
    ],
    leadTime: "Order 48 hours ahead",
    available: true,
  },
  {
    slug: "rice-and-chicken-plate",
    name: "Jollof and Fried Rice Plate",
    category: "Meals",
    description: "Smoky jollof, fried rice, dodo and a piece of chicken. Lunch sorted.",
    image: "/menu/rice-and-chicken-plate.webp",
    options: [
      { label: "1 plate", price: 5500 }, // TODO price
    ],
    leadTime: "Order a day ahead",
    available: true,
  },
  {
    slug: "party-jollof-rice",
    name: "Party Jollof Rice",
    category: "Meals",
    description: "Proper party jollof with that bottom pot smoke. Comes in trays for your event.",
    image: "/menu/party-jollof-rice.webp",
    options: [
      { label: "Small tray, serves 10", price: 35000 }, // TODO price
      { label: "Big tray, serves 25", price: 80000 }, // TODO price
    ],
    leadTime: "Order 3 days ahead",
    available: true,
  },
  {
    slug: "grilled-turkey-wings",
    name: "Grilled Turkey Wings",
    category: "Meals",
    description: "Well seasoned turkey wings, grilled till the skin is crisp. Pairs well with the jollof.",
    image: "/menu/grilled-turkey-wings.webp",
    options: [
      { label: "Pack of 5", price: 20000 }, // TODO price
      { label: "Tray of 20", price: 75000 }, // TODO price
    ],
    leadTime: "Order 2 days ahead",
    available: true,
  },
];

// Photos used outside the menu.
export const photos = {
  hero: "/menu/rice-and-chicken-plate.webp",
  about: "/menu/meat-pie.webp",
  customOrders: "/menu/chocolate-swiss-roll.webp",
};
