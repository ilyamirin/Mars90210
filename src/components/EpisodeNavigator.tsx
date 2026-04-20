import { Link, useNavigate } from 'react-router-dom';
import type { EpisodeSummaryEntry } from '../content/types';

interface EpisodeNavigatorProps {
  episodes: EpisodeSummaryEntry[];
  currentIndex: number;
}

export function EpisodeNavigator({ episodes, currentIndex }: EpisodeNavigatorProps) {
  const navigate = useNavigate();
  const current = episodes[currentIndex];
  const previous = episodes[currentIndex - 1];
  const next = episodes[currentIndex + 1];
  const total = episodes.length;
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <section className="episode-rail" aria-label="Навигация по эпизодам">
      <Link className="secondary-link episode-back-link" to="/episodes">
        Вернуться к эпизодам
      </Link>
      <div className="episode-rail-panel">
        <p className="section-eyebrow">Навигация</p>
        <p className="episode-rail-progress-text">
          Эпизод {String(current.number).padStart(3, '0')} из {String(total).padStart(3, '0')}
        </p>
        <div className="episode-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <label className="episode-jump" htmlFor="episode-jump-select">
          <span>Быстрый переход</span>
          <select
            id="episode-jump-select"
            aria-label="Быстрый переход по эпизодам"
            defaultValue={current.slug}
            onChange={(event) => navigate(`/episodes/${event.currentTarget.value}`)}
          >
            {episodes.map((episode) => (
              <option key={episode.slug} value={episode.slug}>
                {String(episode.number).padStart(3, '0')} — {episode.title}
              </option>
            ))}
          </select>
        </label>
        <div className="episode-nav">
          {previous ? <Link to={`/episodes/${previous.slug}`}>Предыдущий</Link> : <span />}
          {next ? <Link to={`/episodes/${next.slug}`}>Следующий</Link> : <span />}
        </div>
      </div>
    </section>
  );
}
