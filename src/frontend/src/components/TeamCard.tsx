import type { TeamMember } from "../api/team";
import { useLanguage } from "../i18n/LanguageContext";
import { pick } from "../i18n/pick";

export default function TeamCard({ member }: { member: TeamMember }): JSX.Element {
  const { lang } = useLanguage();

  return (
    <article className="card-custom">
      <div className="card-media" aria-hidden="true">
        {member.photoUrl ? (
          <img src={member.photoUrl} alt="" loading="lazy" />
        ) : (
          <img src="/images/virtual_person.jpg" alt="" loading="lazy" />
        )}
      </div>
      <div className="card-body-custom">
        <h3 className="card-title-custom">{member.name}</h3>
        <p className="card-role">{pick(member, "role", lang)}</p>
        <p className="card-text-custom">{pick(member, "bio", lang)}</p>
      </div>
    </article>
  );
}
