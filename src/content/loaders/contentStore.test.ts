import { describe, expect, test } from 'vitest';
import { buildContentStore } from './contentStore';

describe('buildContentStore', () => {
  test('returns heroine summaries keyed by slug', () => {
    const store = buildContentStore();

    expect(store.characters.lira.name).toBe('Лира');
    expect(store.characters.aigul.signatureItem.toLowerCase()).toContain('шарф');
  });

  test('attaches portrait assets and short text to heroines', () => {
    const store = buildContentStore();

    expect(store.characters.lira.portrait.src).toContain(
      'media/optimized/portraits/heroines/lira/portrait.png',
    );
    expect(store.characters.marta.tagline.length).toBeGreaterThan(10);
    expect(store.characters.ruslana.shortBodyMarkdown.length).toBeLessThan(
      store.characters.ruslana.bodyMarkdown.length,
    );
  });

  test('returns season 1 episodes sorted by episode number', () => {
    const store = buildContentStore();

    expect(store.episodes[0].slug).toBe('episode-001');
    expect(store.episodes[1].slug).toBe('episode-002');
    expect(store.episodes[0].excerpt.length).toBeGreaterThan(10);
    expect('bodyMarkdown' in store.episodes[0]).toBe(false);
  });

  test('attaches optimized illustration path to episode entries when art exists', () => {
    const store = buildContentStore();

    expect(store.episodes[0].illustration.avifSrc).toContain(
      'media/optimized/season-01/episode-001/illustration.avif',
    );
    expect(store.episodes[0].illustration.pngSrc).toContain(
      'media/optimized/season-01/episode-001/illustration.png',
    );
    expect(store.episodes[0].illustration.width).toBeGreaterThan(0);
    expect(store.episodes[0].illustration.height).toBeGreaterThan(0);
  });

  test('marks episodes without illustration as placeholders instead of broken images', () => {
    const store = buildContentStore();

    expect(store.episodes.at(-1)?.slug).toBe('episode-063');
    expect(store.episodes.at(-1)?.illustration.isPlaceholder).toBe(true);
    expect(store.episodes.at(-1)?.illustration.src).toBe('');
  });

  test('returns world entries with image and short excerpt', () => {
    const store = buildContentStore();
    const worldEntry = store.world[0];

    expect(worldEntry.relatedImages.length).toBeGreaterThan(0);
    expect(worldEntry.excerpt.length).toBeGreaterThan(10);
  });

  test('returns about sections from site content in editorial order', () => {
    const store = buildContentStore();

    expect(store.about.map((entry) => entry.slug)).toEqual(['project', 'ai-gen', 'creator']);
    expect(store.about[0].bodyMarkdown).toContain('женский роман');
    expect(store.about[1].bodyMarkdown).toContain('AI');
  });
});
