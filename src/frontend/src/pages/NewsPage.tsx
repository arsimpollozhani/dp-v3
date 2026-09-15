import { useEffect, useState } from "react";
import type { NewsArticle } from "../api/news";
import { getNews } from "../api/news";
import NewsCard from "../components/NewsCard";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

export default function NewsPage(): JSX.Element {
  const { t } = useLanguage();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const load = (): void => {
    setState("loading");
    getNews()
      .then((data) => {
        setArticles(data);
        setState("ready");
      })
      .catch(() => setState("error"));
  };

  useEffect(() => {
    let cancelled = false;
    getNews()
      .then((data) => {
        if (cancelled) return;
        setArticles(data);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="container py-4" id="main-content">
      <h1>{t.newsPage.title}</h1>
      <p className="section-sub">{t.newsPage.subtitle}</p>
      {state === "loading" && <p role="status">{t.newsPage.loading}</p>}
      {state === "error" && (
        <div role="alert" className="state-panel">
          <p>{t.newsPage.error}</p>
          <button type="button" className="btn-custom btn-outline-custom" onClick={load}>
            {t.newsPage.retry}
          </button>
        </div>
      )}
      {state === "ready" && articles.length === 0 && <p>{t.newsPage.empty}</p>}
      {state === "ready" && articles.length > 0 && (
        <Reveal>
        <div className="row g-3">
          {articles.map((a) => (
            <div key={a.id} className="col-12 col-md-6 col-lg-4">
              <NewsCard article={a} />
            </div>
          ))}
        </div>
        </Reveal>
      )}
    </main>
  );
}
