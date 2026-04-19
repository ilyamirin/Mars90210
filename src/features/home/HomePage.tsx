import { Link } from 'react-router-dom';
import { EpisodeCard } from '../../components/EpisodeCard';
import { HeroineBand } from '../../components/HeroineBand';
import { SectionHeading } from '../../components/SectionHeading';
import { buildContentStore } from '../../content/loaders/contentStore';

export function HomePage() {
  const store = buildContentStore();
  const heroines = ['lira', 'aigul', 'marta', 'ruslana']
    .map((slug) => store.characters[slug])
    .filter(Boolean);
  const currentEpisode = store.episodes[0];

  return (
    <div className="home-page">
      <section className="hero">
        <p className="section-eyebrow">Мягкая драмеди под марсианским куполом</p>
        <h1>Четыре женщины под одним куполом</h1>
        <p className="hero-copy">
          История о цене надёжности и праве на живую жизнь в мире, который научился
          измерять труд, но так и не научился видеть человека.
        </p>
        <HeroineBand characters={heroines} />
        <div className="hero-actions">
          <Link className="primary-link" to="/episodes">
            Читать эпизоды
          </Link>
          <Link className="secondary-link" to="/world">
            Мир под куполом
          </Link>
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Героини"
          title="Четыре героини"
          description="У каждой — свой язык боли, заботы, стыда и внутренней дисциплины."
        />
        <div className="heroine-list">
          {heroines.map((character) => (
            <article key={character.slug} className="heroine-summary">
              <h3>{character.name}</h3>
              <p>{character.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Чтение"
          title="Сейчас читать"
          description="Вход в сезон начинается с утреннего сбоя, который показывает цену обычной надёжности."
        />
        <EpisodeCard episode={currentEpisode} />
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="Сеттинг"
          title="Мир под куполом"
          description="Будущее здесь живёт не в инфодампе, а в привычках, усталости и климате, который не умеет утешать."
        />
        <div className="world-glimpse">
          <p>
            `Новая Заря` — городок на краю Валлес-Маринерис, выросший вокруг логистики,
            обслуживания и долгового комфорта. Всё устроено так, чтобы человеку было
            как можно труднее остановиться.
          </p>
        </div>
      </section>
    </div>
  );
}
