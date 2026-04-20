import { Link, Navigate, useParams } from 'react-router-dom';
import { MediaImage } from '../../components/MediaImage';
import { MarkdownProse } from '../../components/MarkdownProse';
import { buildContentStore } from '../../content/loaders/contentStore';

export function CharacterPage() {
  const { slug = '' } = useParams();
  const character = buildContentStore().characters[slug];

  if (!character) {
    return <Navigate to="/characters" replace />;
  }

  return (
    <article className="content-page">
      <p className="section-eyebrow">Героиня</p>
      <div className="character-hero">
        <div className="character-portrait-block" data-testid="character-portrait-block">
          <MediaImage image={character.portrait} className="character-portrait" />
        </div>
        <div className="character-copy" data-testid="character-copy-block">
          <h1>{character.name}</h1>
          <p className="hero-copy">{character.tagline}</p>
          <p className="character-signature">{character.signatureItem}</p>
          <MarkdownProse markdown={character.shortBodyMarkdown} />
        </div>
      </div>
      <Link className="secondary-link" to="/characters">
        Назад к героиням
      </Link>
    </article>
  );
}
