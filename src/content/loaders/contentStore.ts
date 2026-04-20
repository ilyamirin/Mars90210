import type {
  AboutSectionEntry,
  CharacterEntry,
  ContentStore,
  WorldEntry,
} from '../types';
import { withBaseAssetPath } from '../assetPaths';
import { getEpisodeSummaries } from './episodeContent';
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
import { aboutMarkdown, characterMarkdown, worldMarkdown } from './rawImports';

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

function optimizedPngPath(relativePath: string) {
  return withBaseAssetPath(`media/optimized/${relativePath}`);
}

function optimizedWebpPath(relativePath: string) {
  return optimizedPngPath(relativePath).replace(/\.png$/i, '.avif');
}

function portraitPath(slug: string) {
  return `portraits/heroines/${slug}/portrait.png`;
}

function worldImageMap(slug: string) {
  const bySlug: Record<string, string[]> = {
    locations: [
      'season-01/episode-001/illustration.png',
      'season-01/episode-004/illustration.png',
    ],
    setting: [
      'season-01/episode-002/illustration.png',
      'season-01/episode-006/illustration.png',
    ],
    symbols: [
      'season-01/episode-003/illustration.png',
      'season-01/episode-004/illustration.png',
    ],
    'visual-language': [
      'season-01/episode-005/illustration.png',
      'season-01/episode-006/illustration.png',
    ],
    institutions: [
      'season-01/episode-001/illustration.png',
      'season-01/episode-002/illustration.png',
    ],
  };

  return (bySlug[slug] ?? ['season-01/episode-001/illustration.png']).map((relativePath) => ({
    src: optimizedPngPath(relativePath),
    pngSrc: optimizedPngPath(relativePath),
    avifSrc: optimizedWebpPath(relativePath),
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
            src: optimizedPngPath(portraitPath(slug)),
            pngSrc: optimizedPngPath(portraitPath(slug)),
            avifSrc: optimizedWebpPath(portraitPath(slug)),
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
    episodes: getEpisodeSummaries(),
    world: buildWorld(),
    about: buildAbout(),
  };

  return cache;
}
