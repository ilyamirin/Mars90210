import { MediaImage } from '../../components/MediaImage';
import { SectionHeading } from '../../components/SectionHeading';
import { buildContentStore } from '../../content/loaders/contentStore';
import { groupWorldEntries } from '../../content/worldPresentation';

export function WorldPage() {
  const worldGroups = groupWorldEntries(buildContentStore().world);

  return (
    <div className="content-page">
      <SectionHeading
        eyebrow="Сеттинг"
        title="Мир под куполом"
        description="Здесь всё, из чего складывается жизнь под куполом: места, привычки, вещи и напряжение, которое проходит между людьми."
      />
      <div className="world-groups">
        {worldGroups.map((group) => (
          <section key={group.title} className="world-group">
            <h2>{group.title}</h2>
            <div className="world-stack">
              {group.entries.map((entry) => (
                <article key={entry.slug} className="world-entry world-entry-visual">
                  <div className="world-entry-gallery">
                    {entry.relatedImages.slice(0, 2).map((image) => (
                      <MediaImage
                        key={`${entry.slug}-${image.src || image.alt}`}
                        image={image}
                        className="world-entry-gallery-media"
                      />
                    ))}
                  </div>
                  <div className="world-entry-copy">
                    <h3>{entry.title}</h3>
                    <p>{entry.cardExcerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
