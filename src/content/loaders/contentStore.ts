import type { CharacterEntry, ContentStore, EpisodeEntry, WorldEntry } from '../types';
import {
  extractBullets,
  extractMetadataValue,
  extractParagraph,
  extractSection,
  extractTopHeading,
  stripLeadSections,
  stripSeriesPrefix,
} from './parseMarkdown';
import {
  characterMarkdown,
  episodeMarkdown,
  illustrationImages,
  worldMarkdown,
} from './rawImports';

function pathSlug(path: string) {
  return path.split('/').pop()!.replace('.md', '');
}

function selectSignatureItem(bullets: string[]) {
  const keywords = ['куртк', 'шарф', 'ключ', 'бирк', 'игрушк'];
  return (
    bullets.find((bullet) =>
      keywords.some((keyword) => bullet.toLowerCase().includes(keyword)),
    ) ?? bullets[0] ?? ''
  );
}

function buildCharacters(): Record<string, CharacterEntry> {
  return Object.fromEntries(
    Object.entries(characterMarkdown).map(([path, markdownValue]) => {
      const markdown = markdownValue as string;
      const slug = pathSlug(path);
      const appearance = extractSection(markdown, 'Внешность и пластика');
      const appearanceBullets = extractBullets(appearance);

      return [
        slug,
        {
          slug,
          name: stripSeriesPrefix(extractTopHeading(markdown)),
          summary: extractParagraph(extractSection(markdown, 'Кто она')),
          signatureItem: selectSignatureItem(appearanceBullets),
          markdown,
          bodyMarkdown: stripLeadSections(markdown),
        },
      ];
    }),
  );
}

function buildEpisodes(): EpisodeEntry[] {
  return Object.entries(episodeMarkdown)
    .map(([path, markdownValue]) => {
      const markdown = markdownValue as string;
      const fileSlug = pathSlug(path);
      const slug = fileSlug.toLowerCase();
      const episodeFolder = `/art/season-01/${slug}/illustration.png`;
      const episodeNumber = Number(slug.split('-')[1]);

      return {
        slug,
        number: episodeNumber,
        title: extractMetadataValue(markdown, 'Заголовок'),
        focus: extractMetadataValue(markdown, 'Фокус'),
        timePoint: extractMetadataValue(markdown, 'Временная точка'),
        keyScene: extractMetadataValue(markdown, 'Ключевая сцена'),
        illustration: {
          src: illustrationImages[episodeFolder] as string,
          alt: extractMetadataValue(markdown, 'Заголовок'),
        },
        markdown,
        bodyMarkdown: stripLeadSections(markdown),
      };
    })
    .sort((left, right) => left.number - right.number);
}

function buildWorld(): WorldEntry[] {
  return Object.entries(worldMarkdown)
    .map(([path, markdownValue]) => {
      const markdown = markdownValue as string;
      return {
        slug: pathSlug(path),
        title: stripSeriesPrefix(extractTopHeading(markdown)),
        markdown,
        bodyMarkdown: stripLeadSections(markdown),
      };
    })
    .sort((left, right) => left.title.localeCompare(right.title, 'ru'));
}

let cache: ContentStore | null = null;

export function buildContentStore(): ContentStore {
  if (cache) {
    return cache;
  }

  cache = {
    characters: buildCharacters(),
    episodes: buildEpisodes(),
    world: buildWorld(),
  };

  return cache;
}
