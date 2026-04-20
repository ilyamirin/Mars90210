import { useEffect, useRef, useState } from 'react';
import { EpisodeCard } from '../../components/EpisodeCard';
import { SectionHeading } from '../../components/SectionHeading';
import { buildContentStore } from '../../content/loaders/contentStore';

const EPISODE_BATCH_SIZE = 12;

export function EpisodesPage() {
  const episodes = buildContentStore().episodes;
  const [visibleCount, setVisibleCount] = useState(EPISODE_BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasMore = visibleCount < episodes.length;

  useEffect(() => {
    if (!hasMore || typeof IntersectionObserver === 'undefined' || !sentinelRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((current) => Math.min(current + EPISODE_BATCH_SIZE, episodes.length));
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [episodes.length, hasMore, visibleCount]);

  const visibleEpisodes = episodes.slice(0, visibleCount);

  return (
    <div className="content-page">
      <SectionHeading
        eyebrow="Сезон 1"
        title="Эпизоды"
        description="Этот сезон движется тихо и упрямо: от одной сцены к другой, от повседневной усталости к словам, которые уже нельзя не сказать."
      />
      <div className="episodes-stack">
        {visibleEpisodes.map((episode) => (
          <EpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>
      {hasMore ? (
        <div className="episodes-load-more">
          <div ref={sentinelRef} aria-hidden="true" className="episodes-sentinel" />
          <button
            type="button"
            className="secondary-link"
            onClick={() =>
              setVisibleCount((current) => Math.min(current + EPISODE_BATCH_SIZE, episodes.length))
            }
          >
            Показать ещё
          </button>
        </div>
      ) : null}
    </div>
  );
}
