import { apiPost } from "./client";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResult {
  id: number;
  message?: string;
}

export function postContact(payload: ContactPayload): Promise<ContactResult> {
  return apiPost<ContactPayload, ContactResult>("/api/contact", payload);
}
