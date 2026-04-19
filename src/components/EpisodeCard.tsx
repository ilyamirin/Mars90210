import { Link } from 'react-router-dom';
import type { EpisodeEntry } from '../content/types';

export function EpisodeCard({ episode }: { episode: EpisodeEntry }) {
  return (
    <Link
      to={`/episodes/${episode.slug}`}
      className="episode-card"
      aria-label={`Читать ${episode.title}`}
    >
      <img src={episode.illustration.src} alt={episode.illustration.alt} />
      <div className="episode-card-copy">
        <p className="section-eyebrow">Эпизод {String(episode.number).padStart(3, '0')}</p>
        <h3>{episode.title}</h3>
        <p>{episode.excerpt}</p>
        <span className="micro-link">Читать далее...</span>
      </div>
    </Link>
  );
}
