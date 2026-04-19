import { buildContentStore } from '../../content/loaders/contentStore';
import { HeroineBand } from '../../components/HeroineBand';
import { SectionHeading } from '../../components/SectionHeading';

export function CharactersPage() {
  const characters = Object.values(buildContentStore().characters);

  return (
    <div className="content-page">
      <SectionHeading
        eyebrow="Героини"
        title="Четыре героини"
        description="Тап по портрету открывает личную страницу без лишнего служебного шума."
      />
      <HeroineBand characters={characters} />
    </div>
  );
}
