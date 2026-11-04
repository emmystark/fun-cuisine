// All the content you can edit lives in this one file.
// See the README section "Changing the menu" for how.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://funcuisine.com.ng";

// WhatsApp number in international format, no plus sign, no spaces.
export const WHATSAPP_NUMBER = "2348000000000"; // TODO real number

export const business = {
  name: "Fun Cuisine",
  tagline: "Food, pastries and drinks from our Lagos kitchen",
  // TODO replace with her own words
  about:
    "Fun Cuisine is a small Lagos kitchen that does the pot, the oven and the bar. One day it is trays of meat pie and doughnuts for an office, the next it is party jollof, turkey wings and a round of cocktails for a birthday. Everything is made to order, so it reaches you fresh.",
  areasServed: ["Lekki", "Ajah", "Victoria Island", "Ikoyi", "Surulere", "Yaba"], // TODO confirm areas
  instagram: "funcuisine", // TODO real handle, no @
  email: "order@funcuisine.com.ng",
  deliveryNote: "We deliver within Lagos. Delivery fee depends on your area and we confirm it on WhatsApp.",
  leadTimeNote: "Please order at least 48 hours ahead. Custom cakes need 5 days.",
};

export type MenuItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string; // path inside /public, e.g. "/menu/chocolate-cake.webp"
  options: string[]; // sizes the customer can pick, e.g. ["Box of 6", "Box of 12"]
  leadTime: string;
  available: boolean;
};

// Categories in the order they appear on the menu.
export const categories = ["Food", "Drinks", "Pastry"] as const;

export const menu: MenuItem[] = [
  // Food
  {
    slug: "party-jollof-rice",
    name: "Party Jollof Rice",
    category: "Food",
    description: "Proper party jollof with that bottom pot smoke. Comes in trays for your event.",
    image: "/menu/party-jollof-rice.webp",
    options: ["Small tray, serves 10", "Big tray, serves 25"],
    leadTime: "Order 3 days ahead",
    available: true,
  },
  {
    slug: "rice-and-chicken-plate",
    name: "Jollof and Fried Rice Plate",
    category: "Food",
    description: "Smoky jollof, fried rice, dodo and a piece of chicken. Lunch sorted.",
    image: "/menu/rice-and-chicken-plate.webp",
    options: ["1 plate"],
    leadTime: "Order a day ahead",
    available: true,
  },
  {
    slug: "grilled-turkey-wings",
    name: "Grilled Turkey Wings",
    category: "Food",
    description: "Well seasoned turkey wings, grilled till the skin is crisp. Pairs well with the jollof.",
    image: "/menu/grilled-turkey-wings.webp",
    options: ["Pack of 5", "Tray of 20"],
    leadTime: "Order 2 days ahead",
    available: true,
  },

  // Drinks
  {
    slug: "margarita",
    name: "Margarita",
    category: "Drinks",
    description: "Tequila, fresh lime and a spicy chilli salt rim. Ask for mango or pineapple if you want it fruity.",
    image: "/menu/margarita.webp",
    options: ["Single glass", "Party batch, serves 10"],
    leadTime: "Order a day ahead",
    available: true,
  },
  {
    slug: "long-island-iced-tea",
    name: "Long Island Iced Tea",
    category: "Drinks",
    description: "Five spirits, lemon and a splash of cola over plenty of ice. Strong, so take it easy.",
    image: "/menu/long-island-iced-tea.webp",
    options: ["Single glass", "Party batch, serves 10"],
    leadTime: "Order a day ahead",
    available: true,
  },
  {
    slug: "negroni",
    name: "Negroni",
    category: "Drinks",
    description: "Gin, Campari and sweet vermouth, stirred over a big ice cube with orange peel.",
    image: "/menu/negroni.webp",
    options: ["Single glass", "Party batch, serves 10"],
    leadTime: "Order a day ahead",
    available: true,
  },
  {
    slug: "blue-lagoon",
    name: "Blue Lagoon",
    category: "Drinks",
    description: "Vodka, blue curacao and lemonade. Bright blue, cold and easy to drink.",
    image: "/menu/blue-lagoon.webp",
    options: ["Single glass", "Party batch, serves 10"],
    leadTime: "Order a day ahead",
    available: true,
  },

  // Pastry
  {
    slug: "meat-pie",
    name: "Meat Pie",
    category: "Pastry",
    description: "Buttery shortcrust filled with minced beef, potato and carrot. Golden on top, soft inside.",
    image: "/menu/meat-pie.webp",
    options: ["Box of 6", "Box of 12"],
    leadTime: "Order 24 hours ahead",
    available: true,
  },
  {
    slug: "pastry-box",
    name: "Pastry Box",
    category: "Pastry",
    description: "A mix of sausage rolls, meat pies and chicken pie. Good for the office or a small get together.",
    image: "/menu/pastry-box.webp",
    options: ["Box of 6", "Box of 12"],
    leadTime: "Order 24 hours ahead",
    available: true,
  },
  {
    slug: "ring-doughnuts",
    name: "Ring Doughnuts",
    category: "Pastry",
    description: "Soft, fluffy yeast doughnuts. Plain with a light sugar coat, or glazed on request.",
    image: "/menu/ring-doughnuts.webp",
    options: ["Box of 6", "Box of 12"],
    leadTime: "Order 24 hours ahead",
    available: true,
  },
  {
    slug: "filled-doughnuts",
    name: "Filled Doughnuts",
    category: "Pastry",
    description: "Big round doughnuts filled with custard or jam. Tell us which filling in your note.",
    image: "/menu/filled-doughnuts.webp",
    options: ["Box of 4", "Box of 8"],
    leadTime: "Order 24 hours ahead",
    available: true,
  },
  {
    slug: "chocolate-swiss-roll",
    name: "Chocolate Swiss Roll",
    category: "Pastry",
    description: "Moist chocolate sponge rolled up with fresh whipped cream.",
    image: "/menu/chocolate-swiss-roll.webp",
    options: ["Full roll", "Half roll"],
    leadTime: "Order 48 hours ahead",
    available: true,
  },
];

// Photos used outside the menu.
export const photos = {
  hero: "/menu/rice-and-chicken-plate.webp",
  about: "/menu/meat-pie.webp",
  customOrders: "/menu/chocolate-swiss-roll.webp",
};
