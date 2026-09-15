import type { FastifyReply, FastifyRequest } from "fastify";
import { menuQuerySchema } from "../schemas/menu.schema.js";
import { menuIdParamSchema } from "../schemas/params.schema.js";
import * as menuService from "../services/menu.service.js";

export async function listMenuHandler(request: FastifyRequest, reply: FastifyReply) {
  const query = menuQuerySchema.parse(request.query);
  const items = await menuService.listMenuItems(query);
  return reply.code(200).send(items);
}

export async function getMenuByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const params = menuIdParamSchema.parse(request.params);
  const item = await menuService.getMenuItemById(params.id);
  if (item === null) {
    return reply.code(404).send({ error: "Menu item not found" });
  }
  return reply.code(200).send(item);
}
