import type { FastifyInstance } from "fastify";

// Placeholder route so the scaffold can boot and be health-checked.
// Feature routes (menu, team, news, contact) will be added per feature.
export async function registerHealthRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/health", async () => ({ status: "ok" }));
}
