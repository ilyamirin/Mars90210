import { MarkdownProse } from '../../components/MarkdownProse';
import { SectionHeading } from '../../components/SectionHeading';
import { buildContentStore } from '../../content/loaders/contentStore';

export function WorldPage() {
  const worldEntries = buildContentStore().world;

  return (
    <div className="content-page">
      <SectionHeading
        eyebrow="Сеттинг"
        title="Мир под куполом"
        description="Компактная каноническая опора: пространство, символы, отношения и визуальный язык."
      />
      <div className="world-stack">
        {worldEntries.map((entry) => (
          <article key={entry.slug} className="world-entry">
            <h2>{entry.title}</h2>
            <MarkdownProse markdown={entry.bodyMarkdown} />
          </article>
        ))}
      </div>
    </div>
  );
}
