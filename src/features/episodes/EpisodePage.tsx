import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { EpisodeNavigator } from '../../components/EpisodeNavigator';
import { IllustrationFigure } from '../../components/IllustrationFigure';
import { MarkdownProse } from '../../components/MarkdownProse';
import { buildContentStore } from '../../content/loaders/contentStore';
import type { EpisodeEntry } from '../../content/types';
import { loadEpisodeBySlug, prefetchEpisodeBySlug } from '../../content/loaders/episodeContent';

export function EpisodePage() {
  const { slug = '' } = useParams();
  const store = buildContentStore();
  const index = store.episodes.findIndex((episode) => episode.slug === slug);
  const [episode, setEpisode] = useState<EpisodeEntry | null>(null);
  const [loading, setLoading] = useState(true);

  if (index === -1) {
    return <Navigate to="/episodes" replace />;
  }

  const previous = store.episodes[index - 1];
  const next = store.episodes[index + 1];

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setEpisode(null);

    loadEpisodeBySlug(slug).then((loadedEpisode) => {
      if (!cancelled) {
        setEpisode(loadedEpisode ?? null);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    const adjacentEpisodes = [previous, next].filter(Boolean);
    const prefetch = () => adjacentEpisodes.forEach((entry) => prefetchEpisodeBySlug(entry!.slug));
    const browserWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (callback: IdleRequestCallback) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (browserWindow.requestIdleCallback && browserWindow.cancelIdleCallback) {
      const callbackId = browserWindow.requestIdleCallback(prefetch);
      return () => browserWindow.cancelIdleCallback?.(callbackId);
    }

    const timeoutId = globalThis.setTimeout(prefetch, 250);
    return () => globalThis.clearTimeout(timeoutId);
  }, [next, previous]);

  if (loading || !episode) {
    return (
      <article className="episode-reader">
        <div className="episode-reader-shell">
          <div className="episode-reader-rail-column">
            <div className="episode-header episode-header-loading">
              <p className="section-eyebrow">Эпизод {String(store.episodes[index].number).padStart(3, '0')}</p>
              <h1>{store.episodes[index].title}</h1>
              <p>Загружаем сцену…</p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="episode-reader">
      <div className="episode-reader-shell">
        <div className="episode-reader-rail-column">
          <IllustrationFigure image={episode.illustration} />
          <header className="episode-header">
            <p className="section-eyebrow">Эпизод {String(episode.number).padStart(3, '0')}</p>
            <h1>{episode.title}</h1>
            <p>Фокус: {episode.focus}</p>
            <p>Временная точка: {episode.timePoint}</p>
            <p>Ключевая сцена: {episode.keyScene}</p>
          </header>
          <EpisodeNavigator episodes={store.episodes} currentIndex={index} />
        </div>
        <div className="episode-reader-body">
          <MarkdownProse markdown={episode.bodyMarkdown} />
        </div>
      </div>
    </article>
  );
}
