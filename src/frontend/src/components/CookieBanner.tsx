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
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={t.cookie.label}>
      <p className="cookie-text">{t.cookie.text}</p>
      <div className="d-flex gap-2">
        <button type="button" className="btn-custom btn-primary-custom btn-sm-custom" onClick={() => persist("accepted")}>
          {t.cookie.accept}
        </button>
        <button type="button" className="btn-custom btn-outline-custom btn-sm-custom" onClick={() => persist("declined")}>
          {t.cookie.decline}
        </button>
      </div>
    </div>
  );
}
