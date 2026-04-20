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
          description="Лира, Айгуль, Марта и Руслана совсем не похожи друг на друга. Но рядом с ними яснее всего видно, как на Марсе живут, любят, устают и всё равно держатся."
        />
        <HeroineBand characters={mainCharacters} />
      </section>

      <section className="character-section">
        <SectionHeading
          eyebrow="Второй круг"
          title="Важные люди сезона"
          description="Эти люди входят в их жизнь не случайно: кто-то тревожит, кто-то тянет ближе, кто-то меняет расстановку сил одним своим появлением."
        />
        <CharacterRoster characters={secondaryCharacters} />
      </section>
    </div>
  );
}
