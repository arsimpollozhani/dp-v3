import ContactForm from "../components/ContactForm";
import { useLanguage } from "../i18n/LanguageContext";

export default function ContactPage(): JSX.Element {
  const { t } = useLanguage();

  return (
    <main className="container py-4" id="main-content">
      <h1>{t.contactPage.title}</h1>
      <p className="section-sub">{t.contactPage.subtitle}</p>
      <div className="row g-4">
        <div className="col-12 col-md-5">
          <section aria-labelledby="contact-info" className="card-custom">
            <div className="card-body-custom">
              <h2 id="contact-info" className="card-title-custom">
                {t.contactPage.infoTitle}
              </h2>
              <address className="info-grid">
                <div className="info-row">
                  <span className="info-label">{t.info.addressLabel}</span>
                  <span>{t.info.address}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">{t.form.phone}</span>
                  <a href="tel:+3892123456">{t.info.phone}</a>
                </div>
                <div className="info-row">
                  <span className="info-label">{t.form.email}</span>
                  <a href="mailto:hello@ohridrestaurant.example">{t.info.email}</a>
                </div>
                <div className="info-row">
                  <span className="info-label">{t.about.hoursTitle}</span>
                  <ul className="info-list">
                    <li>{t.info.hoursWeekdays}</li>
                    <li>{t.info.hoursWeekend}</li>
                  </ul>
                </div>
              </address>
            </div>
          </section>
        </div>
        <div className="col-12 col-md-7">
          <section aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="visually-hidden">
              {t.contactPage.formTitle}
            </h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
}
