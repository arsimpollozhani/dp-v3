import en from "./en.json";
import mk from "./mk.json";

export type Lang = "en" | "mk";

export type Dictionary = typeof en;

const dictionaries: Record<Lang, Dictionary> = {
  en,
  mk: mk as Dictionary,
};

export const LANGS: Lang[] = ["en", "mk"];

export const LANG_STORAGE_KEY = "lang";

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] ?? en;
}

export function isLang(value: string | null): value is Lang {
  return value === "en" || value === "mk";
}
