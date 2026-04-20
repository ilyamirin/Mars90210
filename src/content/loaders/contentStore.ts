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
  extractSectionAny,
  extractTopHeading,
  firstParagraph,
  shortenMarkdown,
  stripLeadSections,
  stripSeriesPrefix,
} from './parseMarkdown';
import {
  aboutMarkdown,
  characterMarkdown,
  optimizedAboutAvifAssets,
  optimizedAboutPngAssets,
  optimizedEpisodeAvifAssets,
  optimizedPortraitAvifAssets,
  optimizedPortraitPngAssets,
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
  return `Портрет персонажа ${name}`;
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

function portraitAssetReady(slug: string) {
  const pngKey = `/public/media/optimized/portraits/heroines/${slug}/portrait.png`;

  return pngKey in optimizedPortraitPngAssets;
}

function portraitAvifAssetReady(slug: string) {
  const avifKey = `/public/media/optimized/portraits/heroines/${slug}/portrait.avif`;

  return avifKey in optimizedPortraitAvifAssets;
}

function episodeAvifAssetReady(relativePath: string) {
  const avifKey = `/public/media/optimized/${relativePath.replace(/\.png$/i, '.avif')}`;

  return avifKey in optimizedEpisodeAvifAssets;
}

function priorityRank(priority: WorldEntry['priority']) {
  return { high: 0, medium: 1, low: 2 }[priority];
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
    avifSrc: episodeAvifAssetReady(relativePath) ? optimizedWebpPath(relativePath) : '',
    alt: 'Иллюстрация мира Mars90210',
  }));
}

function aboutIllustrationPath(slug: string) {
  return `site/about/${slug}/illustration.png`;
}

function aboutAssetReady(slug: string) {
  const pngKey = `/public/media/optimized/site/about/${slug}/illustration.png`;

  return pngKey in optimizedAboutPngAssets;
}

function aboutAvifAssetReady(slug: string) {
  const avifKey = `/public/media/optimized/site/about/${slug}/illustration.avif`;

  return avifKey in optimizedAboutAvifAssets;
}

function buildCharacters(): Record<string, CharacterEntry> {
  return Object.fromEntries(
    Object.entries(characterMarkdown).map(([path, markdownValue]) => {
      const markdown = markdownValue as string;
      const slug = pathSlug(path);
      const appearance = extractSectionAny(markdown, ['Внешность и пластика', 'Внешний рисунок']);
      const appearanceBullets = extractBullets(appearance);
      const bodyMarkdown = stripLeadSections(markdown);
      const name = stripSeriesPrefix(extractTopHeading(markdown));
      const gender = extractMetadataValue(markdown, 'Пол') as CharacterEntry['gender'];
      const group = extractMetadataValue(markdown, 'Группа') as CharacterEntry['group'];
      const roleLabel = extractMetadataValue(markdown, 'Роль на сайте');
      const cardBlurb = extractMetadataValue(markdown, 'Карточка');
      const hasPortrait =
        extractMetadataValue(markdown, 'Портрет') === 'ready' && portraitAssetReady(slug);
      const summary = extractParagraph(extractSectionAny(markdown, ['Кто она', 'Кто он']));
      const tagline =
        extractParagraph(extractSection(markdown, 'Внутренний конфликт')) ||
        extractParagraph(extractSectionAny(markdown, ['Функция в сезоне', 'Эмоциональная функция'])) ||
        cardBlurb ||
        summary;
      const signatureItem =
        selectSignatureItem(appearanceBullets) ||
        extractParagraph(extractSection(markdown, 'Важное правило'));

      return [
        slug,
        {
          slug,
          name,
          gender,
          group,
          roleLabel,
          cardBlurb,
          hasPortrait,
          summary,
          signatureItem,
          tagline,
          portrait: hasPortrait
            ? {
                src: optimizedPngPath(portraitPath(slug)),
                pngSrc: optimizedPngPath(portraitPath(slug)),
                avifSrc: portraitAvifAssetReady(slug) ? optimizedWebpPath(portraitPath(slug)) : '',
                alt: toAltFromName(name),
              }
            : {
                src: '',
                pngSrc: '',
                avifSrc: '',
                isPlaceholder: true,
                alt: toAltFromName(name),
                placeholderText: 'Портрет появится позже',
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
      const bodyMarkdown = stripLeadSections(markdown);
      const category = extractMetadataValue(markdown, 'Категория') as WorldEntry['category'];
      const priority = extractMetadataValue(markdown, 'Приоритет') as WorldEntry['priority'];

      return {
        slug: pathSlug(path),
        title: stripSeriesPrefix(extractTopHeading(markdown)),
        excerpt: firstParagraph(bodyMarkdown),
        cardExcerpt: extractMetadataValue(markdown, 'Карточка'),
        category,
        priority,
        relatedImages: worldImageMap(pathSlug(path)),
        markdown,
        bodyMarkdown,
      };
    })
    .sort((left, right) => {
      const priorityDelta = priorityRank(left.priority) - priorityRank(right.priority);

      if (priorityDelta !== 0) {
        return priorityDelta;
      }

      return left.title.localeCompare(right.title, 'ru');
    });
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
        image:
          extractMetadataValue(markdown, 'Изображение') === 'ready' && aboutAssetReady(slug)
            ? {
                src: optimizedPngPath(aboutIllustrationPath(slug)),
                pngSrc: optimizedPngPath(aboutIllustrationPath(slug)),
                avifSrc: aboutAvifAssetReady(slug)
                  ? optimizedWebpPath(aboutIllustrationPath(slug))
                  : '',
                alt:
                  extractMetadataValue(markdown, 'Alt') ||
                  `Иллюстрация для раздела ${stripSeriesPrefix(extractTopHeading(markdown))}`,
              }
            : {
                src: '',
                pngSrc: '',
                avifSrc: '',
                isPlaceholder: true,
                alt:
                  extractMetadataValue(markdown, 'Alt') ||
                  `Иллюстрация для раздела ${stripSeriesPrefix(extractTopHeading(markdown))}`,
                placeholderText: 'Иллюстрация появится позже',
              },
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
