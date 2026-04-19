import { describe, expect, test } from 'vitest';
import { buildContentStore } from './contentStore';

describe('buildContentStore', () => {
  test('returns heroine summaries keyed by slug', () => {
    const store = buildContentStore();

    expect(store.characters.lira.name).toBe('Лира');
    expect(store.characters.aigul.signatureItem.toLowerCase()).toContain('шарф');
  });

  test('returns season 1 episodes sorted by episode number', () => {
    const store = buildContentStore();

    expect(store.episodes[0].slug).toBe('episode-001');
    expect(store.episodes[1].slug).toBe('episode-002');
  });

  test('attaches illustration path to episode entries', () => {
    const store = buildContentStore();

    expect(store.episodes[0].illustration.src).toContain('art/season-01/episode-001/illustration.png');
  });
});
