import { Link } from "react-router-dom";
import type { NewsArticle } from "../api/news";
import { useLanguage } from "../i18n/LanguageContext";
import { pick } from "../i18n/pick";

function excerpt(body: string, max = 140): string {
  const flat = body.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max)}…` : flat;
}

export default function NewsCard({ article }: { article: NewsArticle }): JSX.Element {
  const { lang, t } = useLanguage();
  const body = pick(article, "body", lang);

  return (
    <article className="card-custom">
      <div className="card-media" aria-hidden="true">
        {article.imageUrl ? (
          <img src={article.imageUrl} alt="" loading="lazy" />
        ) : (
          <img src="/images/news.svg" alt="" loading="lazy" />
        )}
      </div>
      <div className="card-body-custom">
        <h3 className="card-title-custom">{pick(article, "title", lang)}</h3>
        <p className="card-text-custom">{excerpt(body)}</p>
        <Link to={`/news/${article.slug}`} className="card-link">
          {t.newsPage.readMore}
        </Link>
      </div>
    </article>
  );
}
