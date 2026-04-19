import { SectionHeading } from '../../components/SectionHeading';
import { buildContentStore } from '../../content/loaders/contentStore';

export function WorldPage() {
  const worldEntries = buildContentStore().world.slice(0, 5);

  return (
    <div className="content-page">
      <SectionHeading
        eyebrow="Сеттинг"
        title="Мир под куполом"
        description="Меньше справки, больше образов: несколько узлов мира, в которых всё уже чувствуется."
      />
      <div className="world-stack">
        {worldEntries.map((entry) => (
          <article key={entry.slug} className="world-entry world-entry-visual">
            <div className="world-entry-gallery">
              {entry.relatedImages.slice(0, 2).map((image) => (
                <img key={`${entry.slug}-${image.src}`} src={image.src} alt={image.alt} />
              ))}
            </div>
            <div className="world-entry-copy">
              <h2>{entry.title}</h2>
              <p>{entry.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
