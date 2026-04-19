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

    expect(store.characters.lira.portrait.src).toContain('art/portraits/heroines/lira/portrait.png');
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
  });

  test('attaches illustration path to episode entries', () => {
    const store = buildContentStore();

    expect(store.episodes[0].illustration.src).toContain('art/season-01/episode-001/illustration.png');
  });

  test('keeps technical art-sidecar prose out of renderable content', () => {
    const store = buildContentStore();

    expect(store.episodes[0].bodyMarkdown).not.toContain('Prediction ID');
    expect(store.episodes[0].bodyMarkdown).not.toContain('Prompt');
    expect(store.episodes[0].bodyMarkdown).not.toContain('Файл вывода');
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
