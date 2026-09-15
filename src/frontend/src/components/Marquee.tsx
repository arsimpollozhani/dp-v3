interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps): JSX.Element {
  const row = [...items, ...items];
  return (
    <div aria-hidden="true" className="marquee-mask overflow-hidden border-y border-gold/25 bg-ink py-4">
      <div className="marquee-track items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap pr-8">
            <span className="font-display text-lg font-bold uppercase tracking-[0.25em] text-cream/90">
              {item}
            </span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
