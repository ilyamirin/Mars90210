import { Link } from 'react-router-dom';
import type { EpisodeEntry } from '../content/types';

export function EpisodeCard({ episode }: { episode: EpisodeEntry }) {
  return (
    <article className="episode-card">
      <div className="episode-card-copy">
        <p className="section-eyebrow">Эпизод {String(episode.number).padStart(3, '0')}</p>
        <h3>{episode.title}</h3>
        <p>{episode.keyScene}</p>
        <Link to={`/episodes/${episode.slug}`}>Открыть эпизод</Link>
      </div>
      <img src={episode.illustration.src} alt={episode.illustration.alt} />
    </article>
  );
}
