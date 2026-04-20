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
          description="Лира, Айгуль, Марта и Руслана — четыре разные женщины, через которых особенно ясно слышно, как здесь живут, работают, устают и держатся друг за друга."
        />
        <HeroineBand characters={mainCharacters} />
      </section>

      <section className="character-section">
        <SectionHeading
          eyebrow="Второй круг"
          title="Важные люди сезона"
          description="Рядом с ними сезон становится острее: старые роли трещат, близость перестаёт быть безопасной, а каждое решение начинает что-то стоить."
        />
        <CharacterRoster characters={secondaryCharacters} />
      </section>
    </div>
  );
}
