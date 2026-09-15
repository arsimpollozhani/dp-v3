import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header(): JSX.Element {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const close = (): void => setOpen(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        {t.nav.skipLink}
      </a>
      <div className="container d-flex align-items-center justify-content-between gap-3 py-2">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-text">
            <span className="brand-name">{t.nav.restaurantName}</span>
            <span className="brand-tagline">{t.nav.tagline}</span>
          </span>
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
        <nav aria-label={t.nav.primaryNav} className={`site-nav${open ? " is-open" : ""}`}>
          <ul className="nav-list">
            <li><NavLink to="/" end onClick={close}>{t.nav.home}</NavLink></li>
            <li><NavLink to="/about" onClick={close}>{t.nav.about}</NavLink></li>
            <li><NavLink to="/menu" onClick={close}>{t.nav.menu}</NavLink></li>
            <li><NavLink to="/services" onClick={close}>{t.nav.services}</NavLink></li>
            <li><NavLink to="/team" onClick={close}>{t.nav.team}</NavLink></li>
            <li><NavLink to="/news" onClick={close}>{t.nav.news}</NavLink></li>
            <li><NavLink to="/contact" onClick={close}>{t.nav.contact}</NavLink></li>
          </ul>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
