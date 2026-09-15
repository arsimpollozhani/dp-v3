import { prisma } from "../db.js";

export async function findNewsPosts() {
  return prisma.newsPost.findMany({
    orderBy: { publishedAt: "desc" },
  });
}

export async function findNewsPostBySlug(slug: string) {
  return prisma.newsPost.findUnique({ where: { slug } });
}
