import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

export default function AboutPage(): JSX.Element {
  const { t } = useLanguage();

  const values = [
    { title: t.about.value1Title, text: t.about.value1Text },
    { title: t.about.value2Title, text: t.about.value2Text },
    { title: t.about.value3Title, text: t.about.value3Text },
  ];

  return (
    <main id="main-content" className="bg-cream">
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-32 sm:px-6 sm:pt-36">
        <p className="mb-3 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ember">
          <span aria-hidden="true" className="inline-block h-px w-10 bg-gradient-to-r from-ember to-gold" />
          {t.nav.about}
        </p>
        <h1 className="font-display text-4xl font-black tracking-tight text-ink sm:text-6xl">
          {t.about.title}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink/60">{t.about.subtitle}</p>
      </section>

      {/* Story */}
      <Reveal>
        <section aria-labelledby="about-story" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 id="about-story" className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {t.about.storyTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">{t.about.storyP1}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink/70">{t.about.storyP2}</p>
          </div>
          <div className="group relative" aria-hidden="true">
            <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-gold/50 via-transparent to-ember/30 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
            <img
              src="/images/main_2.jpg"
              alt=""
              width="900"
              height="599"
              loading="lazy"
              className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift"
            />
          </div>
        </section>
      </Reveal>

      {/* Values */}
      <Reveal>
        <section aria-labelledby="about-values" className="bg-sand/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 id="about-values" className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {t.about.valuesTitle}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {values.map((v) => (
                <article key={v.title} className="rounded-3xl border border-ink/5 bg-white/70 p-8 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <h3 className="font-display text-xl font-bold text-ink">{v.title}</h3>
                  <p className="mt-3 text-ink/65">{v.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Info */}
      <Reveal>
        <section aria-labelledby="about-info" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 id="about-info" className="font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            {t.about.infoTitle}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-ink/5 bg-white/70 p-8 shadow-card">
              <h3 className="font-display text-xl font-bold text-ink">{t.about.hoursTitle}</h3>
              <ul className="mt-4 space-y-2 text-ink/70">
                <li>{t.info.hoursWeekdays}</li>
                <li>{t.info.hoursWeekend}</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-ink/5 bg-white/70 p-8 shadow-card">
              <h3 className="font-display text-xl font-bold text-ink">{t.about.locationTitle}</h3>
              <address className="mt-4 space-y-1 not-italic text-ink/70">
                <p>{t.info.address}</p>
                <p>{t.info.phone}</p>
                <p>{t.info.email}</p>
              </address>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}
