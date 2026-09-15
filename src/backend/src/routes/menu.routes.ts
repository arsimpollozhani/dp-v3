import type { FastifyInstance } from "fastify";
import { getMenuByIdHandler, listMenuHandler } from "../controllers/menu.controller.js";

export async function registerMenuRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/menu", listMenuHandler);
  app.get("/api/menu/:id", getMenuByIdHandler);
}
