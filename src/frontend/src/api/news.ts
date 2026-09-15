import { apiGet } from "./client";

export interface NewsArticle {
  id: number;
  slug: string;
  imageUrl?: string | null;
  publishedAt: string;
  titleEn: string;
  titleMk: string;
  titleSq: string;
  bodyEn: string;
  bodyMk: string;
  bodySq: string;
}

export function getNews(): Promise<NewsArticle[]> {
  return apiGet<NewsArticle[]>("/api/news");
}

export function getNewsBySlug(slug: string): Promise<NewsArticle> {
  return apiGet<NewsArticle>(`/api/news/${encodeURIComponent(slug)}`);
}
