import type { AboutSectionEntry } from '../content/types';

function OrbitLines() {
  return (
    <svg viewBox="0 0 420 220" aria-hidden="true" className="section-glyph-svg">
      <path d="M24 154c52-81 145-122 255-122 54 0 91 8 117 20" />
      <path d="M36 188c58-65 136-98 234-98 63 0 111 11 145 31" />
      <path d="M70 212c44-39 99-58 167-58 57 0 108 13 154 38" />
    </svg>
  );
}

function SignalGrid() {
  return (
    <svg viewBox="0 0 420 220" aria-hidden="true" className="section-glyph-svg">
      <path d="M30 50h108l42 40h102l42 44h68" />
      <path d="M30 124h68l30-24h114l46 42h102" />
      <path d="M30 176h132l40-34h84l48 38h58" />
      <circle cx="138" cy="50" r="5" />
      <circle cx="226" cy="100" r="5" />
      <circle cx="162" cy="176" r="5" />
    </svg>
  );
}

function DomeFrame() {
  return (
    <svg viewBox="0 0 420 220" aria-hidden="true" className="section-glyph-svg">
      <path d="M38 188c26-92 96-146 172-146 74 0 144 54 172 146" />
      <path d="M88 188c18-58 64-92 122-92 57 0 103 34 122 92" />
      <path d="M210 42v146" />
      <path d="M124 74l172 0" />
      <path d="M38 188h344" />
    </svg>
  );
}

export function SectionGlyph({ visualKey }: { visualKey: AboutSectionEntry['visualKey'] }) {
  return (
    <div className={`section-glyph section-glyph-${visualKey}`} aria-hidden="true">
      {visualKey === 'project' ? <OrbitLines /> : null}
      {visualKey === 'ai-gen' ? <SignalGrid /> : null}
      {visualKey === 'creator' ? <DomeFrame /> : null}
    </div>
  );
}
