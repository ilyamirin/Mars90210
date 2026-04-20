import { Link } from 'react-router-dom';
import type { EpisodeSummaryEntry } from '../content/types';
import { MediaImage } from './MediaImage';

export function EpisodeCard({ episode }: { episode: EpisodeSummaryEntry }) {
  return (
    <Link
      to={`/episodes/${episode.slug}`}
      className="episode-card"
      aria-label={`Читать ${episode.title}`}
    >
      <MediaImage
        image={episode.illustration}
        className="episode-card-media"
        sizes="(min-width: 1440px) 28vw, (min-width: 1200px) 30vw, (min-width: 720px) 45vw, 100vw"
      />
      <div className="episode-card-copy">
        <p className="section-eyebrow">Эпизод {String(episode.number).padStart(3, '0')}</p>
        <h3>{episode.title}</h3>
        <p>{episode.cardExcerpt}</p>
        <span className="micro-link">Читать далее...</span>
      </div>
    </Link>
  );
}
