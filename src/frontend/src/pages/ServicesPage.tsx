import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

// Assumption: there is no /api/services endpoint by design, so this page is
// fully static and driven by i18n dictionaries (no backend calls).
export default function ServicesPage(): JSX.Element {
  const { t } = useLanguage();

  const services = [
    { title: t.services.service1Title, text: t.services.service1Text },
    { title: t.services.service2Title, text: t.services.service2Text },
    { title: t.services.service3Title, text: t.services.service3Text },
    { title: t.services.service4Title, text: t.services.service4Text },
  ];

  return (
    <main className="container py-4" id="main-content">
      <h1>{t.services.title}</h1>
      <p className="section-sub">{t.services.subtitle}</p>
      <Reveal>
      <div className="row g-3">
        {services.map((s) => (
          <div key={s.title} className="col-12 col-md-6">
            <article className="card-custom">
              <div className="card-body-custom">
                <h2 className="card-title-custom">{s.title}</h2>
                <p className="card-text-custom">{s.text}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
      </Reveal>
      <section className="section section-cta text-center mt-4" aria-labelledby="services-cta">
        <h2 id="services-cta">{t.services.ctaTitle}</h2>
        <p>{t.services.ctaText}</p>
        <Link to="/contact" className="btn-custom btn-primary-custom">
          {t.services.ctaButton}
        </Link>
      </section>
    </main>
  );
}
