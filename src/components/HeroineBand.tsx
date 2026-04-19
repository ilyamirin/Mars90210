import type { CharacterEntry } from '../content/types';

const toneMap: Record<string, string> = {
  lira: 'tone-denim',
  aigul: 'tone-brick',
  marta: 'tone-sand',
  ruslana: 'tone-ink',
};

export function HeroineBand({ characters }: { characters: CharacterEntry[] }) {
  return (
    <div className="heroine-band">
      {characters.map((character) => (
        <article
          key={character.slug}
          className={`heroine-panel ${toneMap[character.slug] ?? 'tone-denim'}`}
        >
          <p className="heroine-name">{character.name}</p>
          <p className="heroine-item">{character.signatureItem}</p>
        </article>
      ))}
    </div>
  );
}
