import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer(): JSX.Element {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <p className="footer-brand">{t.nav.restaurantName}</p>
            <p className="footer-blurb">{t.footer.blurb}</p>
          </div>
          <nav className="col-6 col-md-2" aria-label={t.footer.navLabel}>
            <p className="footer-heading">{t.footer.navTitle}</p>
            <ul className="footer-list">
              <li><Link to="/about">{t.nav.about}</Link></li>
              <li><Link to="/menu">{t.nav.menu}</Link></li>
              <li><Link to="/services">{t.nav.services}</Link></li>
              <li><Link to="/team">{t.nav.team}</Link></li>
              <li><Link to="/news">{t.nav.news}</Link></li>
              <li><Link to="/contact">{t.nav.contact}</Link></li>
            </ul>
          </nav>
          <div className="col-6 col-md-3">
            <p className="footer-heading">{t.footer.contactTitle}</p>
            <address className="footer-list">
              <span>{t.info.address}</span>
              <a href="tel:+3892123456">{t.info.phone}</a>
              <a href="mailto:hello@ohridrestaurant.example">{t.info.email}</a>
            </address>
          </div>
          <div className="col-12 col-md-3">
            <p className="footer-heading">{t.footer.hoursTitle}</p>
            <ul className="footer-list">
              <li>{t.info.hoursWeekdays}</li>
              <li>{t.info.hoursWeekend}</li>
            </ul>
          </div>
        </div>
        <p className="footer-rights">
          © 2026 {t.nav.restaurantName}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
