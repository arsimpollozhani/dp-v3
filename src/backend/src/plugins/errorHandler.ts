import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function registerErrorHandler(
  app: import("fastify").FastifyInstance,
): void {
  app.setErrorHandler(
    (error: FastifyError | Error, _request: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof ZodError) {
        return reply.code(400).send({
          error: "Validation failed",
          issues: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      const rawStatus = (error as FastifyError).statusCode;
      const statusCode = typeof rawStatus === "number" ? rawStatus : 500;

      if (statusCode >= 500 || Number.isNaN(statusCode)) {
        return reply.code(500).send({ error: "Internal server error" });
      }

      return reply.code(statusCode as number).send({ error: error.message });
    },
  );
}
