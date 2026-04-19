import { EpisodeCard } from '../../components/EpisodeCard';
import { HeroineBand } from '../../components/HeroineBand';
import { SectionHeading } from '../../components/SectionHeading';
import { buildContentStore } from '../../content/loaders/contentStore';
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
  const worldPreview = store.world.slice(0, 3);

  return (
    <div className="home-page">
      <section className="hero">
        <p className="section-eyebrow">Мягкая драмеди под марсианским куполом</p>
        <h1>Четыре женщины под одним куполом</h1>
        <p className="hero-copy">
          Не витрина мира, а вход в жизнь Лиры, Айгуль, Марты и Русланы — через лица,
          жесты, ткань, усталость и маленькие сдвиги.
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
              Mars90210 — это женский роман на Марсе, собранный как живой литературный
              мир, а не как витрина лора. Здесь важны лица, паузы, ткань быта, мягкий
              юмор и цена надёжности в мире оптимизации.
            </p>
            <p>
              Отдельно рассказаны и AI gen-процесс, и человек, который строит этот мир
              как инженер-автор.
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
          description="Вход в сезон — через сцену, а не через кнопку."
        />
        <EpisodeCard episode={currentEpisode} />
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Картинки"
          title="Сцены сезона"
          description="Сначала почувствовать пространство, потом уже читать дальше."
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
          description="Коротко и через изображения: где они живут, что давит, что утешает."
        />
        <div className="world-preview-grid">
          {worldPreview.map((entry) => (
            <article key={entry.slug} className="world-preview-card">
              <img src={entry.relatedImages[0].src} alt={entry.relatedImages[0].alt} />
              <div className="world-preview-copy">
                <h3>{entry.title}</h3>
                <p>{entry.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
