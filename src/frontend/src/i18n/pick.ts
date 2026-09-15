import type { Lang } from "./dictionaries";

/**
 * Pick a localized field from a DB object.
 * e.g. pick(item, "name", "mk") -> item.nameMk ?? item.nameEn
 */
export function pick<T extends object>(
  obj: T,
  base: string,
  lang: Lang,
): string {
  const record = obj as Record<string, unknown>;
  const cap = lang.charAt(0).toUpperCase() + lang.slice(1);
  const localized = record[`${base}${cap}`];
  if (typeof localized === "string" && localized.length > 0) return localized;
  const fallback = record[`${base}En`];
  return typeof fallback === "string" ? fallback : "";
}
