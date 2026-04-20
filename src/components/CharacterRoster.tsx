import { Link } from 'react-router-dom';
import type { CharacterEntry } from '../content/types';
import { MediaImage } from './MediaImage';

export function CharacterRoster({ characters }: { characters: CharacterEntry[] }) {
  return (
    <div className="character-roster">
      {characters.map((character) => (
        <Link
          key={character.slug}
          to={`/characters/${character.slug}`}
          aria-label={character.name}
          className="character-card"
        >
          <MediaImage image={character.portrait} className="character-card-media" />
          <div className="character-card-copy">
            <p className="section-eyebrow">{character.roleLabel}</p>
            <h3>{character.name}</h3>
            <p>{character.cardBlurb}</p>
            <span className="micro-link">Открыть карточку</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
