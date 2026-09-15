import cors from "@fastify/cors";
import Fastify from "fastify";
import { registerErrorHandler } from "./plugins/errorHandler.js";
import { registerContactRoutes } from "./routes/contact.routes.js";
import { registerHealthRoutes } from "./routes/health.routes.js";
import { registerMenuRoutes } from "./routes/menu.routes.js";
import { registerNewsRoutes } from "./routes/news.routes.js";
import { registerTeamRoutes } from "./routes/team.routes.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });
  registerErrorHandler(app);
  await app.register(registerHealthRoutes);
  await app.register(registerMenuRoutes);
  await app.register(registerTeamRoutes);
  await app.register(registerNewsRoutes);
  await app.register(registerContactRoutes);

  return app;
}
