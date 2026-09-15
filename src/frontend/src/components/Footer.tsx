import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer(): JSX.Element {
  const { t } = useLanguage();

  return (
    <footer className="grain relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-black tracking-tight">
              {t.nav.restaurantName.split(" ")[0]}{" "}
              <span className="text-gold-gradient">{t.nav.restaurantName.split(" ").slice(1).join(" ")}</span>
            </p>
            <p className="mt-4 max-w-xs leading-relaxed text-cream/60">{t.footer.blurb}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-soft">
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              {t.nav.tagline}
            </p>
          </div>
          <nav aria-label={t.footer.navLabel}>
            <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-gold-soft/70">
              {t.footer.navTitle}
            </p>
            <ul className="space-y-3">
              {[
                ["/about", t.nav.about],
                ["/menu", t.nav.menu],
                ["/services", t.nav.services],
                ["/team", t.nav.team],
                ["/news", t.nav.news],
                ["/contact", t.nav.contact],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="link-underline text-cream/70 transition-colors duration-300 hover:text-gold-soft"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-gold-soft/70">
              {t.footer.contactTitle}
            </p>
            <address className="space-y-3 not-italic text-cream/70">
              <span className="block">{t.info.address}</span>
              <a href="tel:+3892123456" className="block transition-colors hover:text-gold-soft">
                {t.info.phone}
              </a>
              <a
                href="mailto:hello@ohridrestaurant.example"
                className="block break-all transition-colors hover:text-gold-soft"
              >
                {t.info.email}
              </a>
            </address>
          </div>
          <div>
            <p className="mb-5 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-gold-soft/70">
              {t.footer.hoursTitle}
            </p>
            <ul className="space-y-3 text-cream/70">
              <li>{t.info.hoursWeekdays}</li>
              <li>{t.info.hoursWeekend}</li>
            </ul>
          </div>
        </div>
        <p className="mt-14 border-t border-white/10 pt-6 text-sm text-cream/40">
          © 2026 {t.nav.restaurantName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
