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
