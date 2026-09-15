import { useEffect, useMemo, useState } from "react";
import type { MenuCategory, MenuItem } from "../api/menu";
import { getMenu } from "../api/menu";
import MenuCard from "../components/MenuCard";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

type Filter = "all" | MenuCategory;

export default function MenuPage(): JSX.Element {
  const { t } = useLanguage();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    // Only available dishes are shown (backend default availableOnly=true).
    getMenu({ availableOnly: true })
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  const filters: Array<{ key: Filter; label: string }> = [
    { key: "all", label: t.menuPage.filterAll },
    { key: "starter", label: t.menuPage.filterStarter },
    { key: "main", label: t.menuPage.filterMain },
    { key: "dessert", label: t.menuPage.filterDessert },
    { key: "drink", label: t.menuPage.filterDrink },
  ];

  const retry = (): void => {
    setState("loading");
    getMenu({ availableOnly: true })
      .then((data) => {
        setItems(data);
        setState("ready");
      })
      .catch(() => setState("error"));
  };

  return (
    <main className="container py-4" id="main-content">
      <h1>{t.menuPage.title}</h1>
      <p className="section-sub">{t.menuPage.subtitle}</p>
      <div className="filter-row" role="group" aria-label={t.menuPage.title}>
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`filter-btn${filter === f.key ? " is-active" : ""}`}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {state === "loading" && <p role="status">{t.menuPage.loading}</p>}
      {state === "error" && (
        <div role="alert" className="state-panel">
          <p>{t.menuPage.error}</p>
          <button type="button" className="btn-custom btn-outline-custom" onClick={retry}>
            {t.menuPage.retry}
          </button>
        </div>
      )}
      {state === "ready" && visible.length === 0 && <p>{t.menuPage.empty}</p>}
      {state === "ready" && visible.length > 0 && (
        <Reveal>
        <div className="row g-3">
          {visible.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <MenuCard item={item} />
            </div>
          ))}
        </div>
        </Reveal>
      )}
    </main>
  );
}
