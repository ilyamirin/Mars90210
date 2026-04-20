import { Link } from 'react-router-dom';
import { MarkdownProse } from '../../components/MarkdownProse';
import { MediaImage } from '../../components/MediaImage';
import { buildContentStore } from '../../content/loaders/contentStore';

export function AboutPage() {
  const { about } = buildContentStore();

  return (
    <div className="content-page about-page">
      <section className="about-hero">
        <p className="section-eyebrow">Редакционный слой</p>
        <h1>О проекте, AI gen и человеке, который всё это собирает</h1>
        <p className="hero-copy">
          Здесь собраны три слоя одного AI-native проекта: сама история, агентный production
          вокруг текста и изображений, и человек, который держит весь этот мир вместе как
          автор и инженер.
        </p>
      </section>

      <div className="about-stack">
        {about.map((section) => (
          <section key={section.slug} className="about-section">
            <div className="about-visual">
              <p className="section-eyebrow">{section.eyebrow}</p>
              <MediaImage
                image={section.image}
                className="about-visual-media"
                loading="eager"
                decoding="sync"
                sizes="(min-width: 720px) 40vw, 100vw"
              />
            </div>
            <div className="about-copy">
              <h2>{section.title}</h2>
              <MarkdownProse markdown={section.bodyMarkdown} />
            </div>
          </section>
        ))}
      </div>

      <Link className="secondary-link" to="/episodes">
        Перейти к эпизодам
      </Link>
    </div>
  );
}
