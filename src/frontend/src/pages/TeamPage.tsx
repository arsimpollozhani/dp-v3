import { useEffect, useState } from "react";
import type { TeamMember } from "../api/team";
import { getTeam } from "../api/team";
import TeamCard from "../components/TeamCard";
import Reveal from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";

export default function TeamPage(): JSX.Element {
  const { t } = useLanguage();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  const load = (): void => {
    setState("loading");
    getTeam()
      .then((data) => {
        setMembers(data);
        setState("ready");
      })
      .catch(() => setState("error"));
  };

  useEffect(() => {
    let cancelled = false;
    getTeam()
      .then((data) => {
        if (cancelled) return;
        setMembers(data);
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
      <h1>{t.teamPage.title}</h1>
      <p className="section-sub">{t.teamPage.subtitle}</p>
      {state === "loading" && <p role="status">{t.teamPage.loading}</p>}
      {state === "error" && (
        <div role="alert" className="state-panel">
          <p>{t.teamPage.error}</p>
          <button type="button" className="btn-custom btn-outline-custom" onClick={load}>
            {t.teamPage.retry}
          </button>
        </div>
      )}
      {state === "ready" && members.length === 0 && <p>{t.teamPage.empty}</p>}
      {state === "ready" && members.length > 0 && (
        <Reveal>
        <div className="row g-3">
          {members.map((m) => (
            <div key={m.id} className="col-12 col-md-6 col-lg-4">
              <TeamCard member={m} />
            </div>
          ))}
        </div>
        </Reveal>
      )}
    </main>
  );
}
