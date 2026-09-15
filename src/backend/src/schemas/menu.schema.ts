import { z } from "zod";

export const menuQuerySchema = z.object({
  category: z.enum(["starter", "main", "dessert", "drink"]).optional(),
  availableOnly: z.enum(["true", "false"]).optional().default("true"),
});

export type MenuQuery = z.infer<typeof menuQuerySchema>;
