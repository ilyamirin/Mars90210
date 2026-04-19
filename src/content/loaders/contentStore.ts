import type {
  AboutSectionEntry,
  CharacterEntry,
  ContentStore,
  EpisodeEntry,
  WorldEntry,
} from '../types';
import {
  excerptParagraphs,
  extractBullets,
  extractMetadataValue,
  extractParagraph,
  extractSection,
  extractTopHeading,
  firstParagraph,
  shortenMarkdown,
  stripLeadSections,
  stripSeriesPrefix,
} from './parseMarkdown';
import {
  aboutMarkdown,
  characterMarkdown,
  episodeMarkdown,
  illustrationImages,
  portraitImages,
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

function toAltFromName(name: string) {
  return `Портрет героини ${name}`;
}

function portraitPath(slug: string) {
  return `/art/portraits/heroines/${slug}/portrait.png`;
}

function worldImageMap(slug: string) {
  const bySlug: Record<string, string[]> = {
    locations: [
      '/art/season-01/episode-001/illustration.png',
      '/art/season-01/episode-004/illustration.png',
    ],
    setting: [
      '/art/season-01/episode-002/illustration.png',
      '/art/season-01/episode-006/illustration.png',
    ],
    symbols: [
      '/art/season-01/episode-003/illustration.png',
      '/art/season-01/episode-004/illustration.png',
    ],
    'visual-language': [
      '/art/season-01/episode-005/illustration.png',
      '/art/season-01/episode-006/illustration.png',
    ],
    institutions: [
      '/art/season-01/episode-001/illustration.png',
      '/art/season-01/episode-002/illustration.png',
    ],
  };

  return (bySlug[slug] ?? ['/art/season-01/episode-001/illustration.png']).map((path) => ({
    src: illustrationImages[path] as string,
    alt: 'Иллюстрация мира Mars90210',
  }));
}

function buildCharacters(): Record<string, CharacterEntry> {
  return Object.fromEntries(
    Object.entries(characterMarkdown).map(([path, markdownValue]) => {
      const markdown = markdownValue as string;
      const slug = pathSlug(path);
      const appearance = extractSection(markdown, 'Внешность и пластика');
      const appearanceBullets = extractBullets(appearance);
      const bodyMarkdown = stripLeadSections(markdown);
      const name = stripSeriesPrefix(extractTopHeading(markdown));

      return [
        slug,
        {
          slug,
          name,
          summary: extractParagraph(extractSection(markdown, 'Кто она')),
          signatureItem: selectSignatureItem(appearanceBullets),
          tagline: extractParagraph(extractSection(markdown, 'Внутренний конфликт')),
          portrait: {
            src: portraitImages[portraitPath(slug)] as string,
            alt: toAltFromName(name),
          },
          markdown,
          bodyMarkdown,
          shortBodyMarkdown: shortenMarkdown(bodyMarkdown, 2),
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
        excerpt: firstParagraph(stripLeadSections(markdown)),
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
        excerpt: firstParagraph(stripLeadSections(markdown)),
        relatedImages: worldImageMap(pathSlug(path)),
        markdown,
        bodyMarkdown: stripLeadSections(markdown),
      };
    })
    .sort((left, right) => left.title.localeCompare(right.title, 'ru'));
}

function visualKeyForSlug(slug: string): AboutSectionEntry['visualKey'] {
  if (slug === 'project') {
    return 'project';
  }
  if (slug === 'ai-gen') {
    return 'ai-gen';
  }
  return 'creator';
}

function buildAbout(): AboutSectionEntry[] {
  const order = ['project', 'ai-gen', 'creator'];

  return Object.entries(aboutMarkdown)
    .map(([path, markdownValue]) => {
      const markdown = markdownValue as string;
      const slug = pathSlug(path);
      const eyebrow = extractMetadataValue(markdown, 'Eyebrow');

      return {
        slug,
        title: stripSeriesPrefix(extractTopHeading(markdown)),
        eyebrow,
        bodyMarkdown: excerptParagraphs(stripLeadSections(markdown), 4),
        visualKey: visualKeyForSlug(slug),
      };
    })
    .sort((left, right) => order.indexOf(left.slug) - order.indexOf(right.slug));
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
    about: buildAbout(),
  };

  return cache;
}
