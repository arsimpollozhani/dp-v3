import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero(): JSX.Element {
  const { t } = useLanguage();

  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        src="/images/main_image.jpeg"
        alt=""
        aria-hidden="true"
        className="hero-bg"
      />
      <div className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-8">
            <p className="hero-eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title" className="hero-title">{t.hero.title}</h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/menu" className="btn-custom btn-primary-custom">
                {t.hero.ctaMenu}
              </Link>
              <Link to="/contact" className="btn-custom btn-outline-custom">
                {t.hero.ctaContact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
