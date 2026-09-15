import type { FastifyInstance } from "fastify";
import { getNewsBySlugHandler, listNewsHandler } from "../controllers/news.controller.js";

export async function registerNewsRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/news", listNewsHandler);
  app.get("/api/news/:slug", getNewsBySlugHandler);
}
