import { LANGS } from "../i18n/dictionaries";
import type { Lang } from "../i18n/dictionaries";
import { useLanguage } from "../i18n/LanguageContext";

const LABELS: Record<Lang, string> = { en: "EN", mk: "МК" };

export default function LanguageSwitcher(): JSX.Element {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label={t.nav.languageLabel}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-btn${lang === code ? " is-active" : ""}`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
