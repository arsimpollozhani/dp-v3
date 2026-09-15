import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

export default function AboutPage(): JSX.Element {
  const { t } = useLanguage();

  return (
    <main className="container py-4" id="main-content">
      <h1>{t.about.title}</h1>
      <p className="section-sub">{t.about.subtitle}</p>
      <section aria-labelledby="about-story" className="section">
        <h2 id="about-story">{t.about.storyTitle}</h2>
        <p>{t.about.storyP1}</p>
        <p>{t.about.storyP2}</p>
      </section>
      <Reveal>
      <section aria-labelledby="about-values" className="section about-values">
        <h2 id="about-values">{t.about.valuesTitle}</h2>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <article className="value-card">
              <h3>{t.about.value1Title}</h3>
              <p>{t.about.value1Text}</p>
            </article>
          </div>
          <div className="col-12 col-md-4">
            <article className="value-card">
              <h3>{t.about.value2Title}</h3>
              <p>{t.about.value2Text}</p>
            </article>
          </div>
          <div className="col-12 col-md-4">
            <article className="value-card">
              <h3>{t.about.value3Title}</h3>
              <p>{t.about.value3Text}</p>
            </article>
          </div>
        </div>
      </section>
      </Reveal>
      <section aria-labelledby="about-info" className="section">
        <h2 id="about-info">{t.about.infoTitle}</h2>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <h3>{t.about.hoursTitle}</h3>
            <ul className="info-list">
              <li>{t.info.hoursWeekdays}</li>
              <li>{t.info.hoursWeekend}</li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <h3>{t.about.locationTitle}</h3>
            <address>
              {t.info.address}
              <br />
              {t.info.phone}
              <br />
              {t.info.email}
            </address>
          </div>
        </div>
      </section>
    </main>
  );
}
