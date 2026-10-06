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
  void payload;
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: Date.now() }), 400);
  });
}
