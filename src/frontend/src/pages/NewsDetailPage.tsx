import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiError } from "../api/client";
import type { NewsArticle } from "../api/news";
import { getNewsBySlug } from "../api/news";
import { useLanguage } from "../i18n/LanguageContext";
import { pick } from "../i18n/pick";

export default function NewsDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "notFound" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    if (!slug) {
      setState("notFound");
      return;
    }
    setState("loading");
    getNewsBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setArticle(data);
        setState("ready");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) setState("notFound");
        else setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="container py-4 article-page" id="main-content">
      {state === "loading" && <p role="status">{t.newsPage.loading}</p>}
      {state === "error" && (
        <div role="alert" className="state-panel">
          <p>{t.newsPage.detailError}</p>
          <Link to="/news" className="btn-custom btn-outline-custom">
            {t.newsPage.backToNews}
          </Link>
        </div>
      )}
      {state === "notFound" && (
        <div className="state-panel">
          <h1>{t.newsPage.notFoundTitle}</h1>
          <p>{t.newsPage.notFoundText}</p>
          <Link to="/news" className="btn-custom btn-outline-custom">
            {t.newsPage.backToNews}
          </Link>
        </div>
      )}
      {state === "ready" && article && (
        <article>
          <p>
            <Link to="/news" className="card-link">
              ← {t.newsPage.backToNews}
            </Link>
          </p>
          <h1>{pick(article, "title", lang)}</h1>
          <p className="article-date">
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString(lang)}
            </time>
          </p>
          <div className="article-media" aria-hidden="true">
            <img
              src={article.imageUrl ?? "/images/news.svg"}
              alt=""
              loading="lazy"
            />
          </div>
          {pick(article, "body", lang)
            .split(/\n+/)
            .map((para, i) => (
              <p key={i}>{para}</p>
            ))}
        </article>
      )}
    </main>
  );
}
