import { Link, Navigate, useParams } from 'react-router-dom';
import { IllustrationFigure } from '../../components/IllustrationFigure';
import { MarkdownProse } from '../../components/MarkdownProse';
import { buildContentStore } from '../../content/loaders/contentStore';

export function EpisodePage() {
  const { slug = '' } = useParams();
  const store = buildContentStore();
  const index = store.episodes.findIndex((episode) => episode.slug === slug);

  if (index === -1) {
    return <Navigate to="/episodes" replace />;
  }

  const episode = store.episodes[index];
  const previous = store.episodes[index - 1];
  const next = store.episodes[index + 1];

  return (
    <article className="episode-reader">
      <IllustrationFigure src={episode.illustration.src} alt={episode.illustration.alt} />
      <header className="episode-header">
        <p className="section-eyebrow">Эпизод {String(episode.number).padStart(3, '0')}</p>
        <h1>{episode.title}</h1>
        <p>Фокус: {episode.focus}</p>
        <p>Временная точка: {episode.timePoint}</p>
        <p>Ключевая сцена: {episode.keyScene}</p>
      </header>
      <MarkdownProse markdown={episode.bodyMarkdown} />
      <nav aria-label="Эпизод" className="episode-nav">
        {previous ? <Link to={`/episodes/${previous.slug}`}>Предыдущий</Link> : <span />}
        {next ? <Link to={`/episodes/${next.slug}`}>Следующий</Link> : <span />}
      </nav>
    </article>
  );
}
