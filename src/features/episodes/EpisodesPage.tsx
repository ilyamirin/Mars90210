import { EpisodeCard } from '../../components/EpisodeCard';
import { SectionHeading } from '../../components/SectionHeading';
import { buildContentStore } from '../../content/loaders/contentStore';

export function EpisodesPage() {
  const episodes = buildContentStore().episodes;

  return (
    <div className="content-page">
      <SectionHeading
        eyebrow="Сезон 1"
        title="Эпизоды"
        description="Читать сезон как последовательность маленьких сдвигов, а не как архив синопсисов."
      />
      <div className="episodes-stack">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.slug} episode={episode} />
        ))}
      </div>
    </div>
  );
}
