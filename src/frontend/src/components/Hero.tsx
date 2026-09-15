import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";

export default function Hero(): JSX.Element {
  const { t } = useLanguage();
  const stats = [
    { value: t.hero.stat1value, label: t.hero.stat1label },
    { value: t.hero.stat2value, label: t.hero.stat2label },
    { value: t.hero.stat3value, label: t.hero.stat3label },
  ];

  return (
    <section aria-labelledby="hero-title" className="grain relative overflow-hidden bg-ink text-cream">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/main_image.jpeg"
          alt=""
          className="h-full w-full animate-ken-burns object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_38%,transparent_0%,rgba(20,16,16,0.55)_100%)]" />
        <div className="absolute -left-24 top-1/4 h-96 w-96 animate-glow rounded-full bg-ember/30 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] animate-glow rounded-full bg-gold/20 blur-[130px] [animation-delay:3s]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pb-20 pt-36 sm:px-6">
        <p className="mb-6 inline-flex w-fit animate-fade-up items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-gold-soft backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          {t.hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="font-display max-w-4xl animate-fade-up text-5xl font-black leading-[1.02] tracking-tight delay-100 sm:text-7xl lg:text-8xl"
        >
          {t.hero.title}{" "}
          <em className="text-gold-gradient animate-shimmer-text not-italic sm:italic">✦</em>
        </h1>
        <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-cream/75 delay-200">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex animate-fade-up flex-wrap items-center gap-4 delay-300">
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft via-gold to-gold-deep bg-[length:200%_auto] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-ink shadow-glow transition-all duration-500 hover:bg-right hover:shadow-lift active:scale-95"
          >
            {t.hero.ctaMenu}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-cream backdrop-blur transition-all duration-300 hover:border-gold/70 hover:bg-gold/10 hover:text-gold-soft active:scale-95"
          >
            {t.hero.ctaContact}
          </Link>
        </div>

        <dl className="mt-14 grid max-w-2xl animate-fade-up grid-cols-3 gap-6 border-t border-white/10 pt-8 delay-500">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-black text-gold-gradient sm:text-4xl">
                {s.value}
              </dd>
              <dd className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-cream/60">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Floating dish */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-8 top-32 hidden w-56 animate-float overflow-hidden rounded-[2rem] border border-white/15 shadow-lift xl:block"
        >
          <img src="/images/main_2.jpg" alt="" className="h-72 w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-fade-up flex-col items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-cream/50 delay-700 sm:flex">
        {t.hero.scroll}
        <span aria-hidden="true" className="block h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </p>
    </section>
  );
}
