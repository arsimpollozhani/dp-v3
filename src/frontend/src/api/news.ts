import { ApiError } from "./client";

export interface NewsArticle {
  id: number;
  slug: string;
  imageUrl?: string | null;
  publishedAt: string;
  titleEn: string;
  titleMk: string;
  bodyEn: string;
  bodyMk: string;
}

const NEWS: NewsArticle[] = [
  {
    id: 1,
    slug: "garden-terrace-open",
    imageUrl: null,
    publishedAt: "2026-08-24T10:00:00.000Z",
    titleEn: "Our Garden Terrace Is Open",
    titleMk: "Нашата градинарска тераса е отворена",
    bodyEn:
      "Summer evenings are back. Join us on the garden terrace for grilled specials and a glass of Vranec under the lights.",
    bodyMk:
      "Летните вечери се вратија. Придружете ни се на градинарската тераса за специјалитети од скара и чаша вранец под светилките.",
  },
  {
    id: 2,
    slug: "live-music-fridays",
    imageUrl: null,
    publishedAt: "2026-08-31T18:00:00.000Z",
    titleEn: "Live Music Fridays Return",
    titleMk: "Се враќаат музичките петоци",
    bodyEn:
      "Every Friday evening a small acoustic trio plays Macedonian evergreens. Table reservations are recommended.",
    bodyMk:
      "Секој петок навечер мало акустично трио свири македонски евергрини. Се препорачуваат резервации на маса.",
  },
  {
    id: 3,
    slug: "winter-menu-2026",
    imageUrl: null,
    publishedAt: "2026-09-12T09:00:00.000Z",
    titleEn: "Taste Our Autumn Menu",
    titleMk: "Пробајте го нашето есенско мени",
    bodyEn:
      "Slow-cooked tavche gravche, roasted peppers and warm tulumba: our autumn menu celebrates the harvest season.",
    bodyMk:
      "Бавно готвено тавче гравче, печени пиперки и топли тулумби: нашето есенско мени ја слави сезоната на берба.",
  },
];

export function getNews(): Promise<NewsArticle[]> {
  return Promise.resolve(NEWS);
}

export function getNewsBySlug(slug: string): Promise<NewsArticle> {
  const article = NEWS.find((a) => a.slug === slug);
  return article
    ? Promise.resolve(article)
    : Promise.reject(new ApiError(404, { error: `News article "${slug}" not found` }));
}
