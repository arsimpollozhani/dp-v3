import { z } from "zod";

export const menuIdParamSchema = z.object({
  id: z.coerce.number().int("Invalid menu id").positive("Invalid menu id"),
});

export const newsSlugParamSchema = z.object({
  slug: z.string().trim().min(1, "Slug is required").max(200),
});

export type MenuIdParam = z.infer<typeof menuIdParamSchema>;
export type NewsSlugParam = z.infer<typeof newsSlugParamSchema>;
