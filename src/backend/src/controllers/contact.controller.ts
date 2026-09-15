import type { FastifyReply, FastifyRequest } from "fastify";
import { contactBodySchema } from "../schemas/contact.schema.js";
import * as contactService from "../services/contact.service.js";

export async function createContactHandler(request: FastifyRequest, reply: FastifyReply) {
  const body = contactBodySchema.parse(request.body);
  const created = await contactService.createContactMessage(body);
  return reply.code(201).send({ id: created.id, message: "Message received" });
}
