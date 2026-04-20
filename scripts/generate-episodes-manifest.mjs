import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const episodesRoot = path.join(rootDir, 'episodes', 'season-01');
const outputPath = path.join(rootDir, 'src', 'content', 'generated', 'episodes-manifest.json');

function extractMetadataValue(markdown, label) {
  const match = markdown.match(new RegExp(`^- ${label}: (.+)$`, 'm'));
  return match?.[1]?.trim() ?? '';
}

function stripLeadSections(markdown) {
  const lines = markdown.split('\n');
  const output = [];
  let skipMetadata = false;
  let skippedHeading = false;

  for (const line of lines) {
    if (!skippedHeading && line.startsWith('# ')) {
      skippedHeading = true;
      continue;
    }

    if (line.startsWith('## Метаданные')) {
      skipMetadata = true;
      continue;
    }

    if (skipMetadata) {
      const trimmed = line.trim();

      if (line.startsWith('## ')) {
        skipMetadata = false;
      } else if (trimmed === '' || trimmed.startsWith('- ')) {
        continue;
      } else {
        skipMetadata = false;
      }
    }

    if (!skipMetadata) {
      output.push(line);
    }
  }

  return output.join('\n').trim();
}

function firstParagraph(markdown) {
  return (
    markdown
      .split('\n\n')
      .map((chunk) => chunk.trim())
      .find((chunk) => chunk.length > 0 && !chunk.startsWith('## ')) ?? ''
  );
}

function truncateAtWord(text, limit) {
  if (text.length <= limit) {
    return text;
  }

  const sliced = text.slice(0, limit);
  const boundary = sliced.lastIndexOf(' ');

  return `${(boundary > 0 ? sliced.slice(0, boundary) : sliced).trim()}…`;
}

function buildCardExcerpt(text) {
  const normalized = text.replace(/\s+/g, ' ').trim();

  if (!normalized) {
    return '';
  }

  const sentences = normalized.match(/[^.!?…]+[.!?…]?/g)?.map((sentence) => sentence.trim()) ?? [
    normalized,
  ];

  let cardExcerpt = '';

  for (const sentence of sentences) {
    const candidate = cardExcerpt ? `${cardExcerpt} ${sentence}`.trim() : sentence;

    if (!cardExcerpt || candidate.length <= 180) {
      cardExcerpt = candidate;
      continue;
    }

    break;
  }

  return truncateAtWord(cardExcerpt, 180);
}

function optimizedPngPath(slug) {
  return `media/optimized/season-01/${slug}/illustration.png`;
}

function optimizedAvifPath(slug) {
  return `media/optimized/season-01/${slug}/illustration.avif`;
}

function optimizedAvifExists(slug) {
  return existsSync(path.join(rootDir, 'public', optimizedAvifPath(slug)));
}

function sourceIllustrationPath(slug) {
  return path.join(rootDir, 'art', 'season-01', slug, 'illustration.png');
}

function readImageDimensions(sourcePath) {
  const png = readFileSync(sourcePath);
  const signature = png.subarray(0, 8);
  const expectedSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  if (!signature.equals(expectedSignature)) {
    throw new Error(`Unsupported image format for dimension read: ${sourcePath}`);
  }

  const chunkType = png.toString('ascii', 12, 16);

  if (chunkType !== 'IHDR') {
    throw new Error(`Invalid PNG header for dimension read: ${sourcePath}`);
  }

  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);

  return { width, height };
}

const episodes = readdirSync(episodesRoot)
  .filter((entry) => entry.endsWith('.md'))
  .sort()
  .map((fileName) => {
    const slug = fileName.replace(/\.md$/i, '').toLowerCase();
    const markdown = readFileSync(path.join(episodesRoot, fileName), 'utf8');
    const bodyMarkdown = stripLeadSections(markdown);
    const sourceIllustration = sourceIllustrationPath(slug);
    const hasIllustration = existsSync(sourceIllustration);
    const dimensions = hasIllustration ? readImageDimensions(sourceIllustration) : { width: 0, height: 0 };

    return {
      slug,
      number: Number(slug.split('-')[1]),
      title: extractMetadataValue(markdown, 'Заголовок'),
      focus: extractMetadataValue(markdown, 'Фокус'),
      timePoint: extractMetadataValue(markdown, 'Временная точка'),
      keyScene: extractMetadataValue(markdown, 'Ключевая сцена'),
      excerpt: firstParagraph(bodyMarkdown),
      cardExcerpt: buildCardExcerpt(firstParagraph(bodyMarkdown)),
      illustration: hasIllustration
        ? {
            src: optimizedPngPath(slug),
            pngSrc: optimizedPngPath(slug),
            avifSrc: optimizedAvifExists(slug) ? optimizedAvifPath(slug) : '',
            width: dimensions.width,
            height: dimensions.height,
            isPlaceholder: false,
            alt: extractMetadataValue(markdown, 'Заголовок'),
          }
        : {
            src: '',
            pngSrc: '',
            avifSrc: '',
            width: 0,
            height: 0,
            isPlaceholder: true,
            alt: `Иллюстрация к эпизоду ${String(Number(slug.split('-')[1])).padStart(3, '0')} появится позже`,
          },
    };
  });

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(episodes, null, 2)}\n`);
