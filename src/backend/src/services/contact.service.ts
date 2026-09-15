import type { ContactBody } from "../schemas/contact.schema.js";
import * as contactRepository from "../repositories/contact.repository.js";

export async function createContactMessage(data: ContactBody) {
  return contactRepository.createContactMessage(data);
}
