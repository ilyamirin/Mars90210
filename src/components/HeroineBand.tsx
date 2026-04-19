import { Link } from 'react-router-dom';
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
        <Link
          key={character.slug}
          to={`/characters/${character.slug}`}
          aria-label={character.name}
          data-testid={`heroine-card-${character.slug}`}
          className={`heroine-panel ${toneMap[character.slug] ?? 'tone-denim'}`}
        >
          <div className="heroine-portrait-frame" data-testid={`heroine-portrait-${character.slug}`}>
            <img
              className="heroine-portrait"
              src={character.portrait.src}
              alt={character.portrait.alt}
            />
          </div>
          <div className="heroine-copy" data-testid={`heroine-copy-${character.slug}`}>
            <p className="heroine-name">{character.name}</p>
            <p className="heroine-item">{character.tagline}</p>
            <span className="micro-link">Читать далее...</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
