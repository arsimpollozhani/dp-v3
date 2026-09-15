import { LANGS } from "../i18n/dictionaries";
import type { Lang } from "../i18n/dictionaries";
import { useLanguage } from "../i18n/LanguageContext";

const LABELS: Record<Lang, string> = { en: "EN", mk: "МК" };

export default function LanguageSwitcher(): JSX.Element {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur"
      role="group"
      aria-label={t.nav.languageLabel}
    >
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-widest transition-all duration-300 active:scale-95 ${
            lang === code
              ? "bg-gradient-to-r from-gold-soft to-gold text-ink shadow-glow"
              : "text-cream/60 hover:text-cream"
          }`}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
