import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { MenuItem } from "../api/menu";
import { getMenu } from "../api/menu";
import type { NewsArticle } from "../api/news";
import { getNews } from "../api/news";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import MenuCard from "../components/MenuCard";
import NewsCard from "../components/NewsCard";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

function Eyebrow({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <p className="mb-3 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ember">
      <span aria-hidden="true" className="inline-block h-px w-10 bg-gradient-to-r from-ember to-gold" />
      {children}
    </p>
  );
}

export default function HomePage(): JSX.Element {
  const { t } = useLanguage();
  const [featured, setFeatured] = useState<MenuItem[]>([]);
  const [latest, setLatest] = useState<NewsArticle[]>([]);

  useEffect(() => {
    let cancelled = false;
    getMenu({ availableOnly: true })
      .then((items) => {
        if (!cancelled) setFeatured(items.slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setFeatured([]);
      });
    getNews()
      .then((articles) => {
        if (!cancelled) setLatest(articles.slice(0, 3));
      })
      .catch(() => {
        if (!cancelled) setLatest([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Hero />
      <Marquee items={t.home.marquee} />

      {/* About teaser */}
      <Reveal>
        <section className="bg-cream py-20 sm:py-28" aria-labelledby="home-about">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <Eyebrow>{t.nav.about}</Eyebrow>
              <h2 id="home-about" className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
                {t.home.aboutTitle}
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/70">{t.home.aboutText}</p>
              <Link
                to="/about"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-cream shadow-card transition-all duration-300 hover:bg-coal hover:shadow-lift active:scale-95"
              >
                {t.home.aboutCta}
                <span aria-hidden="true" className="text-gold transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
            <div className="group relative" aria-hidden="true">
              <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-gold/50 via-transparent to-ember/30 blur-xl transition-opacity duration-700 group-hover:opacity-100" />
              <img
                src="/images/main_2.jpg"
                alt=""
                loading="lazy"
                className="relative aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1"
              />
              <div className="absolute -bottom-5 -left-5 animate-float rounded-2xl border border-gold/40 bg-ink/90 px-5 py-3 shadow-lift backdrop-blur">
                <p className="font-display text-2xl font-black text-gold-gradient">est. 2009</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Featured dishes */}
      <Reveal>
        <section className="bg-sand/60 py-20 sm:py-28" aria-labelledby="home-featured">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>{t.nav.menu}</Eyebrow>
                <h2 id="home-featured" className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
                  {t.home.featuredTitle}
                </h2>
                <p className="mt-3 max-w-xl text-lg text-ink/65">{t.home.featuredText}</p>
              </div>
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:border-gold-deep hover:bg-ink hover:text-gold-soft active:scale-95"
              >
                {t.home.viewAllMenu}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => (
                <Reveal key={item.id} delay={Math.min(i, 2) * 120}>
                  <MenuCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* News */}
      <Reveal>
        <section className="bg-cream py-20 sm:py-28" aria-labelledby="home-news">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Eyebrow>{t.nav.news}</Eyebrow>
            <h2 id="home-news" className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
              {t.home.newsTitle}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-ink/65">{t.home.newsText}</p>
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((article, i) => (
                <Reveal key={article.id} delay={Math.min(i, 2) * 120}>
                  <NewsCard article={article} />
                </Reveal>
              ))}
            </div>
            <p className="mt-10">
              <Link to="/news" className="btn-custom btn-outline-custom">
                {t.home.viewAllNews}
              </Link>
            </p>
          </div>
        </section>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <section className="bg-cream px-4 pb-24 sm:px-6" aria-labelledby="home-visit">
          <div className="grain relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center shadow-lift sm:px-12 sm:py-24">
            <div aria-hidden="true" className="absolute inset-0">
              <img src="/images/main_image.jpeg" alt="" loading="lazy" className="h-full w-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/80 to-ink" />
              <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 animate-glow rounded-full bg-gold/25 blur-[110px]" />
            </div>
            <div className="relative">
              <p className="mb-4 text-[0.7rem] font-bold uppercase tracking-[0.3em] text-gold-soft">
                {t.nav.contact}
              </p>
              <h2 id="home-visit" className="font-display mx-auto max-w-2xl text-4xl font-black tracking-tight text-cream sm:text-6xl">
                {t.home.visitTitle}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-cream/70">{t.home.visitText}</p>
              <Link
                to="/contact"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep bg-[length:200%_auto] px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-ink shadow-glow transition-all duration-500 hover:bg-right hover:shadow-lift active:scale-95"
              >
                {t.home.visitCta}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}
