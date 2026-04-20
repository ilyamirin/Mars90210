import manifest from '../generated/episodes-manifest.json';
import { withBaseAssetPath } from '../assetPaths';
import type { EpisodeEntry, EpisodeSummaryEntry } from '../types';
import { stripLeadSections } from './parseMarkdown';

const episodeMarkdown = import.meta.glob('/episodes/season-01/*.md', {
  import: 'default',
  query: '?raw',
});

function withResolvedIllustration(summary: EpisodeSummaryEntry): EpisodeSummaryEntry {
  const illustration = summary.illustration;

  return {
    ...summary,
    illustration: {
      ...illustration,
      src: withBaseAssetPath(illustration.src),
      pngSrc: illustration.pngSrc ? withBaseAssetPath(illustration.pngSrc) : '',
      avifSrc: illustration.avifSrc ? withBaseAssetPath(illustration.avifSrc) : '',
    },
  };
}

const manifestEntries = (manifest as EpisodeSummaryEntry[]).map(withResolvedIllustration);
const summariesBySlug = new Map(manifestEntries.map((entry) => [entry.slug, entry]));
const cache = new Map<string, Promise<EpisodeEntry | undefined>>();

export function getEpisodeSummaries() {
  return manifestEntries;
}

export function getEpisodeSummaryBySlug(slug: string) {
  return summariesBySlug.get(slug);
}

export function prefetchEpisodeBySlug(slug: string) {
  void loadEpisodeBySlug(slug);
}

export async function loadEpisodeBySlug(slug: string): Promise<EpisodeEntry | undefined> {
  if (!cache.has(slug)) {
    cache.set(
      slug,
      (async () => {
        const summary = summariesBySlug.get(slug);
        const loader = episodeMarkdown[`/episodes/season-01/${slug}.md`];

        if (!summary || !loader) {
          return undefined;
        }

        const markdown = (await loader()) as string;

        return {
          ...summary,
          markdown,
          bodyMarkdown: stripLeadSections(markdown),
        };
      })(),
    );
  }

  return cache.get(slug)!;
}
