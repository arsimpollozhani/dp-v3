import { z } from "zod";

const phoneRegex = /^[+0-9 ()-]{6,20}$/;

export const contactBodySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Invalid email").max(254),
  phone: z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine((v) => v === undefined || phoneRegex.test(v), {
      message: "Invalid phone number",
    }),
  subject: z.string().trim().min(3, "Subject is required").max(120),
  message: z.string().trim().min(10, "Message is required").max(2000),
});

export type ContactBody = z.infer<typeof contactBodySchema>;
