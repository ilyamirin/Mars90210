import { Link } from 'react-router-dom';
import { MarkdownProse } from '../../components/MarkdownProse';
import { SectionGlyph } from '../../components/SectionGlyph';
import { buildContentStore } from '../../content/loaders/contentStore';

export function AboutPage() {
  const { about } = buildContentStore();

  return (
    <div className="content-page about-page">
      <section className="about-hero">
        <p className="section-eyebrow">Редакционный слой</p>
        <h1>О проекте, AI gen и человеке, который всё это собирает</h1>
        <p className="hero-copy">
          Mars90210 держится на трёх вещах: живой литературной оптике, дисциплине
          генеративного production-процесса и инженерном мышлении, которое умеет
          превращать хрупкое намерение в цельную систему.
        </p>
      </section>

      <div className="about-stack">
        {about.map((section) => (
          <section key={section.slug} className="about-section">
            <div className="about-visual">
              <p className="section-eyebrow">{section.eyebrow}</p>
              <SectionGlyph visualKey={section.visualKey} />
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
