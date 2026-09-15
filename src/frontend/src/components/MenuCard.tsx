import type { MenuItem } from "../api/menu";
import { useLanguage } from "../i18n/LanguageContext";
import { pick } from "../i18n/pick";

export function formatPrice(price: number, currency: string): string {
  const rounded = Number.isInteger(price) ? price.toFixed(0) : price.toFixed(2);
  return `${rounded} ${currency}`;
}

export default function MenuCard({ item }: { item: MenuItem }): JSX.Element {
  const { lang, t } = useLanguage();

  return (
    <article className="card-custom menu-card">
      <div className="card-media" aria-hidden="true">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt="" loading="lazy" />
        ) : (
          <img src="/images/shopska_salad.jpeg" alt="" loading="lazy" />
        )}
        {!item.isAvailable && <span className="badge-soldout">{t.menuPage.unavailable}</span>}
      </div>
      <div className="card-body-custom">
        <div className="d-flex justify-content-between align-items-baseline gap-2">
          <h3 className="card-title-custom">{pick(item, "name", lang)}</h3>
          <span className="price">{formatPrice(item.price, t.menuPage.currency)}</span>
        </div>
        <p className="card-text-custom">{pick(item, "desc", lang)}</p>
      </div>
    </article>
  );
}
