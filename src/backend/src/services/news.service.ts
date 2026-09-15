import * as newsRepository from "../repositories/news.repository.js";

export async function listNewsPosts() {
  return newsRepository.findNewsPosts();
}

export async function getNewsPostBySlug(slug: string) {
  return newsRepository.findNewsPostBySlug(slug);
}
