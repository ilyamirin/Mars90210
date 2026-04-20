import { buildContentStore } from '../../content/loaders/contentStore';
import { CharacterRoster } from '../../components/CharacterRoster';
import { HeroineBand } from '../../components/HeroineBand';
import { SectionHeading } from '../../components/SectionHeading';

const heroineOrder = ['lira', 'aigul', 'marta', 'ruslana'];
const secondaryOrder = ['silan', 'eyron', 'alina', 'danil', 'vladimir'];

export function CharactersPage() {
  const store = buildContentStore();
  const mainCharacters = heroineOrder
    .map((slug) => store.characters[slug])
    .filter(Boolean);
  const secondaryCharacters = secondaryOrder
    .map((slug) => store.characters[slug])
    .filter(Boolean);

  return (
    <div className="content-page">
      <section className="character-section">
        <SectionHeading
          eyebrow="Персонажи"
          title="Четыре героини"
          description="Лира, Айгуль, Марта и Руслана остаются центром сезона: через них слышен и быт под куполом, и цена надёжности."
        />
        <HeroineBand characters={mainCharacters} />
      </section>

      <section className="character-section">
        <SectionHeading
          eyebrow="Второй круг"
          title="Важные люди сезона"
          description="Не фон и не приложение к героиням, а фигуры, которые меняют направление сезона и цену решений."
        />
        <CharacterRoster characters={secondaryCharacters} />
      </section>
    </div>
  );
}
