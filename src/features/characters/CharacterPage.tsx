import { Link, Navigate, useParams } from 'react-router-dom';
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
      <h1>{character.name}</h1>
      <p className="hero-copy">{character.signatureItem}</p>
      <MarkdownProse markdown={character.bodyMarkdown} />
      <Link className="secondary-link" to="/characters">
        Назад к героиням
      </Link>
    </article>
  );
}
