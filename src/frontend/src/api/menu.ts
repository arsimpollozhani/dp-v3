import { ApiError } from "./client";

export type MenuCategory = "starter" | "main" | "dessert" | "drink";

export interface MenuItem {
  id: number;
  category: MenuCategory;
  price: number;
  imageUrl?: string | null;
  isAvailable: boolean;
  nameEn: string;
  nameMk: string;
  descEn: string;
  descMk: string;
}

export interface MenuQuery {
  category?: MenuCategory;
  availableOnly?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    category: "starter",
    price: 280.0,
    imageUrl: "/images/shopska_salad.webp",
    isAvailable: true,
    nameEn: "Shopska Salad",
    nameMk: "Шопска салата",
    descEn:
      "Chopped tomatoes, cucumber, peppers and grated white cheese with olive oil.",
    descMk:
      "Сечкани домати, краставица, пиперки и рендано бело сирење со маслиново масло.",
  },
  {
    id: 2,
    category: "starter",
    price: 220.0,
    imageUrl: "/images/selsko_meso.jpg",
    isAvailable: true,
    nameEn: "Selsko Meso",
    nameMk: "Селско месо",
    descEn:
      "Rustic oven-baked pork with mushrooms, peppers and smoked paprika.",
    descMk:
      "Селско свинско месо со печурки, пиперки и чадена пипер, печено во фурна.",
  },
  {
    id: 3,
    category: "main",
    price: 350.0,
    imageUrl: "/images/tavche_gravche.webp",
    isAvailable: true,
    nameEn: "Tavche Gravche",
    nameMk: "Тавче гравче",
    descEn:
      "Slow-baked beans in an earthenware pot with peppers, onion and smoked paprika.",
    descMk:
      "Бавно печен грав во земјена тава со пиперки, кромид и чадена пипер.",
  },
  {
    id: 4,
    category: "main",
    price: 520.0,
    imageUrl: "/images/trout.jpg",
    isAvailable: true,
    nameEn: "Grilled Ohrid-Style Trout",
    nameMk: "Охридска пастрмка на скара",
    descEn:
      "Grilled trout with garlic butter, lemon and blitva, served with baked potatoes.",
    descMk:
      "Пастрмка на скара со путер од лук, лимон и блитва, послужена со печени компири.",
  },
  {
    id: 5,
    category: "dessert",
    price: 180.0,
    imageUrl: "/images/trileche.webp",
    isAvailable: true,
    nameEn: "Trilece",
    nameMk: "Трилече",
    descEn: "Milk-soaked sponge cake with caramel and whipped cream.",
    descMk: "Сунѓерест колач натопен со млеко, со карамел и шлаг.",
  },
  {
    id: 6,
    category: "drink",
    price: 200.0,
    imageUrl: "/images/wine.jpeg",
    isAvailable: true,
    nameEn: "Vranec Red Wine (glass)",
    nameMk: "Вранец црвено вино (чаша)",
    descEn: "Glass of domestic Vranec red wine from the Tikvesh valley.",
    descMk: "Чаша домашно црвено вино вранец од Тиквешијата.",
  },
];

export function getMenu(query: MenuQuery = {}): Promise<MenuItem[]> {
  let items = MENU_ITEMS;
  if (query.category) items = items.filter((i) => i.category === query.category);
  if (query.availableOnly) items = items.filter((i) => i.isAvailable);
  return Promise.resolve(items);
}

export function getMenuItem(id: number): Promise<MenuItem> {
  const item = MENU_ITEMS.find((i) => i.id === id);
  return item
    ? Promise.resolve(item)
    : Promise.reject(new ApiError(404, { error: `Menu item ${id} not found` }));
}
