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
              Mars90210 — история о четырёх женщинах, которые живут под куполом и день
              за днём пытаются не потерять себя в мире, где слишком многое меряют
              пользой, устойчивостью и правильным поведением.
            </p>
            <p>
              Здесь можно заглянуть за кулисы: как вырос этот мир, как в работе
              помогает AI и кто ведёт весь проект от канона до сайта.
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
          description="Начать лучше с одной сцены. В ней сразу слышно, как здесь любят, ссорятся, устают и всё же остаются рядом."
        />
        <EpisodeCard episode={currentEpisode} />
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Картинки"
          title="Сцены сезона"
          description="Эти кадры дают почувствовать сезон с первого взгляда: стекло купола, марсианский свет, усталые лица и моменты, после которых уже нельзя жить по-старому."
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
          description="Работа, искусственное море, стекло купола, вещи, которые переходят из рук в руки, — весь этот мир держится на деталях."
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
