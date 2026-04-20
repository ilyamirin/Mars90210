import { describe, expect, test } from 'vitest';
import { buildContentStore } from './contentStore';

describe('buildContentStore', () => {
  test('returns heroine summaries keyed by slug', () => {
    const store = buildContentStore();

    expect(store.characters.lira.name).toBe('Лира');
    expect(store.characters.aigul.signatureItem.toLowerCase()).toContain('шарф');
    expect(store.characters.lira.group).toBe('main');
    expect(store.characters.vladimir.group).toBe('secondary');
    expect(store.characters.lira.gender).toBe('женщина');
    expect(store.characters.vladimir.gender).toBe('мужчина');
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
    expect(store.characters.lira.cardBlurb.length).toBeGreaterThan(10);
    expect(store.characters.lira.roleLabel).toBe('главная героиня');
    expect(store.characters.vladimir.roleLabel).toBe('антагонист');
    expect(store.characters.vladimir.portrait.alt).toBe('Портрет персонажа Владимир');
    expect(typeof store.characters.vladimir.hasPortrait).toBe('boolean');
  });

  test('uses real portrait assets for the full secondary cast when metadata is ready', () => {
    const store = buildContentStore();

    for (const slug of ['alina', 'danil', 'eyron', 'silan', 'vladimir'] as const) {
      expect(store.characters[slug].hasPortrait).toBe(true);
      expect(store.characters[slug].portrait.isPlaceholder).not.toBe(true);
      expect(store.characters[slug].portrait.pngSrc).toContain(
        `media/optimized/portraits/heroines/${slug}/portrait.png`,
      );
      expect(typeof store.characters[slug].portrait.avifSrc).toBe('string');
    }
  });

  test('returns season 1 episodes sorted by episode number', () => {
    const store = buildContentStore();

    expect(store.episodes[0].slug).toBe('episode-001');
    expect(store.episodes[1].slug).toBe('episode-002');
    expect(store.episodes[0].excerpt.length).toBeGreaterThan(10);
    expect(store.episodes[0].cardExcerpt.length).toBeGreaterThan(10);
    expect(store.episodes[0].cardExcerpt.length).toBeLessThan(store.episodes[0].excerpt.length);
    expect('bodyMarkdown' in store.episodes[0]).toBe(false);
  });

  test('attaches optimized illustration path to episode entries when art exists', () => {
    const store = buildContentStore();

    expect(store.episodes[0].illustration.pngSrc).toContain(
      'media/optimized/season-01/episode-001/illustration.png',
    );
    expect(typeof store.episodes[0].illustration.avifSrc).toBe('string');
    expect(store.episodes[0].illustration.width).toBeGreaterThan(0);
    expect(store.episodes[0].illustration.height).toBeGreaterThan(0);
  });

  test('resolves episode illustration state without broken image sources', () => {
    const store = buildContentStore();
    const placeholders = store.episodes.filter((episode) => episode.illustration.isPlaceholder);

    if (placeholders.length > 0) {
      for (const episode of placeholders) {
        expect(episode.illustration.src).toBe('');
      }
      return;
    }

    for (const episode of store.episodes) {
      expect(episode.illustration.isPlaceholder).not.toBe(true);
      expect(episode.illustration.pngSrc || episode.illustration.src).not.toBe('');
    }
  });

  test('returns world entries with curated card data and categories', () => {
    const store = buildContentStore();
    const worldEntry = store.world[0];

    expect(worldEntry.relatedImages.length).toBeGreaterThan(0);
    expect(worldEntry.cardExcerpt.length).toBeGreaterThan(10);
    expect(['places', 'relationships', 'systems', 'symbols']).toContain(worldEntry.category);
    expect(['high', 'medium', 'low']).toContain(worldEntry.priority);
  });

  test('returns about sections from site content in editorial order', () => {
    const store = buildContentStore();

    expect(store.about.map((entry) => entry.slug)).toEqual(['project', 'ai-gen', 'creator']);
    expect(store.about[0].bodyMarkdown).toContain('мягкая марсианская драмеди');
    expect(store.about[1].bodyMarkdown).toContain('AI');
    expect(store.about[0].image.alt).toContain('Тихий вечер');
  });
});
