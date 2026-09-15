import { useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

const STORAGE_KEY = "cookie-consent";

export default function CookieBanner(): JSX.Element {
  const { t } = useLanguage();
  const [visible, setVisible] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === null;
    } catch {
      return true;
    }
  });

  if (!visible) return <></>;

  const persist = (value: "accepted" | "declined"): void => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, date: new Date().toISOString() }),
      );
    } catch {
      // Storage unavailable: still hide the banner for this session.
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.cookie.label}
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-3xl animate-fade-up flex-wrap items-center gap-4 rounded-3xl border border-gold/25 bg-ink/90 p-5 text-cream shadow-lift backdrop-blur-xl sm:p-6"
    >
      <p className="min-w-[16rem] flex-1 text-sm leading-relaxed text-cream/75">{t.cookie.text}</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => persist("accepted")}
          className="rounded-full bg-gradient-to-r from-gold-soft to-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-ink shadow-glow transition-all duration-300 hover:shadow-lift active:scale-95"
        >
          {t.cookie.accept}
        </button>
        <button
          type="button"
          onClick={() => persist("declined")}
          className="rounded-full border border-cream/25 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-cream/80 transition-all duration-300 hover:border-gold/60 hover:text-gold-soft active:scale-95"
        >
          {t.cookie.decline}
        </button>
      </div>
    </div>
  );
}
