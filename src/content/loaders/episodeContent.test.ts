import { describe, expect, test } from 'vitest';
import { loadEpisodeBySlug } from './episodeContent';

describe('loadEpisodeBySlug', () => {
  test('loads one episode body lazily by slug', async () => {
    const episode = await loadEpisodeBySlug('episode-001');

    expect(episode?.slug).toBe('episode-001');
    expect(episode?.bodyMarkdown).toContain('Лира проснулась раньше будильника');
  });

  test('strips technical metadata from loaded episode prose', async () => {
    const episode = await loadEpisodeBySlug('episode-001');

    expect(episode?.bodyMarkdown).not.toContain('Prediction ID');
    expect(episode?.bodyMarkdown).not.toContain('Prompt');
    expect(episode?.bodyMarkdown).not.toContain('Файл вывода');
  });

  test('returns undefined for unknown episode slug', async () => {
    await expect(loadEpisodeBySlug('episode-999')).resolves.toBeUndefined();
  });
});
