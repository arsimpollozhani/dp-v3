import type { FastifyReply, FastifyRequest } from "fastify";
import * as teamService from "../services/team.service.js";

export async function listTeamHandler(_request: FastifyRequest, reply: FastifyReply) {
  const members = await teamService.listTeamMembers();
  return reply.code(200).send(members);
}
