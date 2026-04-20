function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function extractTopHeading(markdown: string) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? '';
}

export function stripSeriesPrefix(value: string) {
  return value.replace(/^Mars90210\s+—\s+/, '').trim();
}

export function extractMetadataValue(markdown: string, label: string) {
  const pattern = new RegExp(`^- ${escapeRegExp(label)}: (.+)$`, 'm');
  return markdown.match(pattern)?.[1]?.trim() ?? '';
}

export function extractSection(markdown: string, heading: string) {
  const lines = markdown.split('\n');
  const startIndex = lines.findIndex(
    (line) => line.trim() === `## ${heading}`,
  );

  if (startIndex === -1) {
    return '';
  }

  const body: string[] = [];

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.startsWith('## ') || line.startsWith('# ')) {
      break;
    }
    body.push(line);
  }

  return body.join('\n').trim();
}

export function extractSectionAny(markdown: string, headings: string[]) {
  for (const heading of headings) {
    const section = extractSection(markdown, heading);

    if (section) {
      return section;
    }
  }

  return '';
}

export function extractBullets(section: string) {
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());
}

export function extractParagraph(section: string) {
  return section
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .find((line) => !line.startsWith('- ') && !line.startsWith('Фраза-ключ:')) ?? '';
}

export function stripLeadSections(markdown: string) {
  const lines = markdown.split('\n');
  const output: string[] = [];
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

  return stripTechnicalText(output.join('\n').trim());
}

export function stripTechnicalText(markdown: string) {
  const blockedPhrases = [
    'Prediction ID',
    'Prompt',
    'Файл вывода',
    'Папка:',
    'output_file=',
    'prediction_id=',
    'google/nano-banana',
    'api.replicate',
    '## Prompt',
    '## Изображаемый момент',
    '## Стиль',
    '## Предметы и continuity',
  ];

  const cleanedLines = markdown
    .split('\n')
    .filter((line) => !blockedPhrases.some((phrase) => line.includes(phrase)));

  return cleanedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function firstParagraph(markdown: string) {
  return markdown
    .split('\n\n')
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.length > 0 && !chunk.startsWith('## ')) ?? '';
}

export function shortenMarkdown(markdown: string, paragraphs = 2) {
  return markdown
    .split('\n\n')
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .slice(0, paragraphs)
    .join('\n\n');
}

export function excerptParagraphs(markdown: string, paragraphs = 2) {
  return markdown
    .split('\n\n')
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0 && !chunk.startsWith('## '))
    .slice(0, paragraphs)
    .join('\n\n');
}
