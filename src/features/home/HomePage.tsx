import { EpisodeCard } from '../../components/EpisodeCard';
import { HeroineBand } from '../../components/HeroineBand';
import { MediaImage } from '../../components/MediaImage';
import { SectionHeading } from '../../components/SectionHeading';
import { buildContentStore } from '../../content/loaders/contentStore';
import { selectWorldPreviewEntries } from '../../content/worldPresentation';
import { Link } from 'react-router-dom';
import { SectionGlyph } from '../../components/SectionGlyph';

export function HomePage() {
  const store = buildContentStore();
  const heroines = ['lira', 'aigul', 'marta', 'ruslana']
    .map((slug) => store.characters[slug])
    .filter(Boolean);
  const aboutTeaser = store.about.find((entry) => entry.slug === 'project');
  const currentEpisode = store.episodes[0];
  const galleryEpisodes = store.episodes.slice(0, 4);
  const worldPreview = selectWorldPreviewEntries(store.world);

  return (
    <div className="home-page">
      <section className="hero">
        <p className="section-eyebrow">Мягкая драмеди под марсианским куполом</p>
        <h1>Четыре женщины под одним куполом</h1>
        <p className="hero-copy">
          Всё начинается с маленьких вещей: как человек молчит, как держит чашку, как
          устает к концу смены и всё равно находит в себе силы остаться рядом.
        </p>
        <HeroineBand characters={heroines} />
      </section>

      <section className="content-section">
        <div className="about-teaser">
          <div className="about-teaser-visual">
                <p className="section-eyebrow">О проекте</p>
                <SectionGlyph visualKey="project" />
              </div>
          <div className="about-teaser-copy">
            <h2>{aboutTeaser?.title ?? 'Mars90210 — О проекте'}</h2>
            <p>
              Mars90210 — мягкая марсианская драмеди о четырёх женщинах, которые живут
              под куполом и всё чаще чувствуют, как трудно оставаться человеком в мире,
              где от тебя ждут только пользы и устойчивости.
            </p>
            <p>
              Здесь можно посмотреть, как устроен сам проект, как в нём работает AI gen
              и кто собирает эту историю как автор и инженер.
            </p>
            <Link className="secondary-link" to="/about">
              Читать об этом подробнее
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Чтение"
          title="Сейчас читать"
          description="Лучше всего входить в сезон с одной сцены: в ней уже есть и ритм этой жизни, и тревога, и нежность."
        />
        <EpisodeCard episode={currentEpisode} />
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Картинки"
          title="Сцены сезона"
          description="Несколько ключевых кадров, в которых уже видны воздух Марса, свет купола и внутреннее напряжение сезона."
        />
        <div className="episode-mosaic">
          {galleryEpisodes.map((episode) => (
            <EpisodeCard key={episode.slug} episode={episode} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Сеттинг"
          title="Мир под куполом"
          description="Места, вещи и силы, среди которых проходит их жизнь: работа, искусственное море, усталость после смены, стекло купола."
        />
        <div className="world-preview-grid">
          {worldPreview.map((entry) => (
            <article key={entry.slug} className="world-preview-card">
              <MediaImage image={entry.relatedImages[0]} className="world-preview-media" />
              <div className="world-preview-copy">
                <h3>{entry.title}</h3>
                <p>{entry.cardExcerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
