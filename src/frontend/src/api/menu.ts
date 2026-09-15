import { apiGet } from "./client";

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

export function getMenu(query: MenuQuery = {}): Promise<MenuItem[]> {
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.availableOnly !== undefined) {
    params.set("availableOnly", String(query.availableOnly));
  }
  const suffix = params.toString() ? `?${params.toString()}` : "";
  return apiGet<MenuItem[]>(`/api/menu${suffix}`);
}

export function getMenuItem(id: number): Promise<MenuItem> {
  return apiGet<MenuItem>(`/api/menu/${id}`);
}
