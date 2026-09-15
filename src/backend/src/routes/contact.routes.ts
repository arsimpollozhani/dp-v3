import rateLimit from "@fastify/rate-limit";
import type { FastifyInstance } from "fastify";
import { createContactHandler } from "../controllers/contact.controller.js";

export async function registerContactRoutes(app: FastifyInstance): Promise<void> {
  // Scoped rate limit: only routes in this encapsulated context are limited.
  await app.register(rateLimit, { max: 10, timeWindow: "15 minutes" });
  app.post("/api/contact", createContactHandler);
}
