import { prisma } from "../db.js";

export interface MenuFilter {
  category?: string;
  availableOnly: boolean;
}

export async function findMenuItems(filter: MenuFilter) {
  return prisma.menuItem.findMany({
    where: {
      ...(filter.category ? { category: filter.category } : {}),
      ...(filter.availableOnly ? { isAvailable: true } : {}),
    },
    orderBy: { id: "asc" },
  });
}

export async function findMenuItemById(id: number) {
  return prisma.menuItem.findUnique({ where: { id } });
}
