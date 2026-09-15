import { useState } from "react";
import type { FormEvent } from "react";
import { ApiError } from "../api/client";
import { postContact } from "../api/contact";
import { useLanguage } from "../i18n/LanguageContext";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+0-9 ()-]{6,20}$/;

const EMPTY: FormValues = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm(): JSX.Element {
  const { t } = useLanguage();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const set = (field: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };

  function validate(v: FormValues): FieldErrors {
    const errs: FieldErrors = {};
    const name = v.name.trim();
    const email = v.email.trim();
    const phone = v.phone.trim();
    const subject = v.subject.trim();
    const message = v.message.trim();
    if (!name) errs.name = t.form.errRequired;
    else if (name.length < 2 || name.length > 80) errs.name = t.form.errNameLength;
    if (!email) errs.email = t.form.errRequired;
    else if (!EMAIL_RE.test(email)) errs.email = t.form.errEmailInvalid;
    if (phone && !PHONE_RE.test(phone)) errs.phone = t.form.errPhoneInvalid;
    if (!subject) errs.subject = t.form.errRequired;
    else if (subject.length < 3 || subject.length > 120) errs.subject = t.form.errSubjectLength;
    if (!message) errs.message = t.form.errRequired;
    else if (message.length < 10 || message.length > 2000) errs.message = t.form.errMessageLength;
    return errs;
  }

  async function onSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;
    setStatus("loading");
    setServerMessage("");
    try {
      await postContact({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiError && err.body?.issues) {
        const mapped: FieldErrors = {};
        for (const issue of err.body.issues) {
          const field = issue.path as keyof FormValues;
          if (field in EMPTY && !mapped[field]) mapped[field] = issue.message;
        }
        setErrors(mapped);
        setServerMessage(err.body.error ?? t.form.errorGeneric);
      } else if (err instanceof ApiError && err.body?.error) {
        setServerMessage(err.body.error);
      } else {
        setServerMessage(t.form.errorGeneric);
      }
    }
  }

  if (status === "success") {
    return (
      <div className="form-panel form-success" role="alert">
        <h2>{t.form.successTitle}</h2>
        <p>{t.form.successText}</p>
        <button
          type="button"
          className="btn-custom btn-outline-custom"
          onClick={() => {
            setValues(EMPTY);
            setErrors({});
            setStatus("idle");
          }}
        >
          {t.form.sendAnother}
        </button>
      </div>
    );
  }

  const field = (
    id: keyof FormValues,
    label: string,
    input: JSX.Element,
    hint?: string,
  ): JSX.Element => (
    <div className="form-field">
      <label htmlFor={`contact-${id}`}>
        {label} {hint && <span className="optional-hint">({hint})</span>}
      </label>
      {input}
      {errors[id] && (
        <p className="field-error" id={`contact-${id}-error`} role="alert">
          {errors[id]}
        </p>
      )}
    </div>
  );

  const invalid = (id: keyof FormValues): boolean => Boolean(errors[id]);

  return (
    <form className="form-panel" onSubmit={onSubmit} noValidate>
      {status === "error" && (
        <div className="form-error" role="alert">
          <strong>{t.form.errorTitle}</strong>
          <p>{serverMessage || t.form.errorGeneric}</p>
        </div>
      )}
      {field(
        "name",
        t.form.name,
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t.form.namePlaceholder}
          value={values.name}
          onChange={set("name")}
          aria-invalid={invalid("name")}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />,
      )}
      {field(
        "email",
        t.form.email,
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t.form.emailPlaceholder}
          value={values.email}
          onChange={set("email")}
          aria-invalid={invalid("email")}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />,
      )}
      {field(
        "phone",
        t.form.phone,
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={t.form.phonePlaceholder}
          value={values.phone}
          onChange={set("phone")}
          aria-invalid={invalid("phone")}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
        />,
        t.form.optional,
      )}
      {field(
        "subject",
        t.form.subject,
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder={t.form.subjectPlaceholder}
          value={values.subject}
          onChange={set("subject")}
          aria-invalid={invalid("subject")}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
        />,
      )}
      {field(
        "message",
        t.form.message,
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={t.form.messagePlaceholder}
          value={values.message}
          onChange={set("message")}
          aria-invalid={invalid("message")}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />,
      )}
      <button
        type="submit"
        className="btn-custom btn-primary-custom"
        disabled={status === "loading"}
      >
        {status === "loading" ? t.form.sending : t.form.submit}
      </button>
    </form>
  );
}
