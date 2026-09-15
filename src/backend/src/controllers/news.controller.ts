import type { FastifyReply, FastifyRequest } from "fastify";
import { newsSlugParamSchema } from "../schemas/params.schema.js";
import * as newsService from "../services/news.service.js";

export async function listNewsHandler(_request: FastifyRequest, reply: FastifyReply) {
  const posts = await newsService.listNewsPosts();
  return reply.code(200).send(posts);
}

export async function getNewsBySlugHandler(request: FastifyRequest, reply: FastifyReply) {
  const params = newsSlugParamSchema.parse(request.params);
  const post = await newsService.getNewsPostBySlug(params.slug);
  if (post === null) {
    return reply.code(404).send({ error: "News post not found" });
  }
  return reply.code(200).send(post);
}
