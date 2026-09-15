import type { MenuQuery } from "../schemas/menu.schema.js";
import * as menuRepository from "../repositories/menu.repository.js";

export async function listMenuItems(query: MenuQuery) {
  const items = await menuRepository.findMenuItems({
    category: query.category,
    availableOnly: query.availableOnly === "true",
  });
  return items.map((item) => ({ ...item, price: Number(item.price) }));
}

export async function getMenuItemById(id: number) {
  const item = await menuRepository.findMenuItemById(id);
  if (item === null) return null;
  return { ...item, price: Number(item.price) };
}
