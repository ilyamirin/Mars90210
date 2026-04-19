import { Link } from 'react-router-dom';
import { buildContentStore } from '../../content/loaders/contentStore';
import { SectionHeading } from '../../components/SectionHeading';

export function CharactersPage() {
  const characters = Object.values(buildContentStore().characters);

  return (
    <div className="content-page">
      <SectionHeading
        eyebrow="Героини"
        title="Четыре героини"
        description="Четыре разных способа выдерживать давление системы и не растворяться в полезности."
      />
      <div className="heroine-list">
        {characters.map((character) => (
          <article key={character.slug} className="heroine-summary">
            <h3>{character.name}</h3>
            <p>{character.summary}</p>
            <Link to={`/characters/${character.slug}`}>Открыть профиль</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
