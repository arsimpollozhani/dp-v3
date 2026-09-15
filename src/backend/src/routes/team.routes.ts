import type { FastifyInstance } from "fastify";
import { listTeamHandler } from "../controllers/team.controller.js";

export async function registerTeamRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/team", listTeamHandler);
}
