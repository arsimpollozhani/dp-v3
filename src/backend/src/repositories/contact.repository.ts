import { prisma } from "../db.js";
import type { ContactBody } from "../schemas/contact.schema.js";

export async function createContactMessage(data: ContactBody) {
  return prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject,
      message: data.message,
    },
  });
}
