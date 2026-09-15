import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const LINKS = [
  { to: "/", end: true, key: "home" },
  { to: "/about", end: false, key: "about" },
  { to: "/menu", end: false, key: "menu" },
  { to: "/services", end: false, key: "services" },
  { to: "/team", end: false, key: "team" },
  { to: "/news", end: false, key: "news" },
  { to: "/contact", end: false, key: "contact" },
] as const;

export default function Header(): JSX.Element {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = (): void => setOpen(false);

  return (
    <header
      className={`glass-dark fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-shadow duration-500 ${
        scrolled ? "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]" : "shadow-none"
      }`}
    >
      <a className="skip-link" href="#main-content">
        {t.nav.skipLink}
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-3" onClick={close}>
          <span
            aria-hidden="true"
            className="font-display grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-gold-soft via-gold to-gold-deep text-2xl font-black text-ink shadow-glow transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-105"
          >
            O
          </span>
          <span className="leading-tight">
            <span className="font-display block text-lg font-bold tracking-wide text-cream">
              {t.nav.restaurantName}
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold-soft/80">
              {t.nav.tagline}
            </span>
          </span>
        </Link>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-xl text-cream transition hover:border-gold/60 hover:text-gold-soft lg:hidden"
          aria-expanded={open}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="transition-transform duration-300">
            {open ? "✕" : "☰"}
          </span>
        </button>
        <nav
          aria-label={t.nav.primaryNav}
          className={`${
            open ? "flex" : "hidden"
          } absolute inset-x-3 top-full flex-col gap-1 rounded-2xl border border-white/10 bg-ink/95 p-3 shadow-lift backdrop-blur-xl lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0`}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={close}
                  className={({ isActive }) =>
                    `link-underline block rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-gold-soft ${
                      isActive ? "active text-gold" : "text-cream/85"
                    }`
                  }
                >
                  {t.nav[l.key]}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-2 lg:ml-3 lg:mt-0">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
