import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { MenuItem } from "../api/menu";
import { getMenu } from "../api/menu";
import type { NewsArticle } from "../api/news";
import { getNews } from "../api/news";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import NewsCard from "../components/NewsCard";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

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
      <Reveal>
      <section className="section" aria-labelledby="home-about">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-6">
              <h2 id="home-about">{t.home.aboutTitle}</h2>
              <p>{t.home.aboutText}</p>
              <Link to="/about" className="btn-custom btn-outline-custom">
                {t.home.aboutCta}
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <div className="teaser-art" aria-hidden="true">
                <img src="/images/main_2.jpg" alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </Reveal>
      <Reveal>
      <section className="section section-alt" aria-labelledby="home-featured">
        <div className="container">
          <h2 id="home-featured">{t.home.featuredTitle}</h2>
          <p className="section-sub">{t.home.featuredText}</p>
          <div className="row g-3">
            {featured.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <MenuCard item={item} />
              </div>
            ))}
          </div>
          <p className="mt-3">
            <Link to="/menu" className="btn-custom btn-primary-custom">
              {t.home.viewAllMenu}
            </Link>
          </p>
        </div>
      </section>
      </Reveal>
      <Reveal>
      <section className="section" aria-labelledby="home-news">
        <div className="container">
          <h2 id="home-news">{t.home.newsTitle}</h2>
          <p className="section-sub">{t.home.newsText}</p>
          <div className="row g-3">
            {latest.map((article) => (
              <div key={article.id} className="col-12 col-md-6 col-lg-4">
                <NewsCard article={article} />
              </div>
            ))}
          </div>
          <p className="mt-3">
            <Link to="/news" className="btn-custom btn-outline-custom">
              {t.home.viewAllNews}
            </Link>
          </p>
        </div>
      </section>
      </Reveal>
      <Reveal>
      <section className="section section-cta" aria-labelledby="home-visit">
        <div className="container text-center">
          <h2 id="home-visit">{t.home.visitTitle}</h2>
          <p>{t.home.visitText}</p>
          <Link to="/contact" className="btn-custom btn-primary-custom">
            {t.home.visitCta}
          </Link>
        </div>
      </section>
      </Reveal>
    </>
  );
}
