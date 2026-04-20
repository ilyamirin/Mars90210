import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const artRoot = path.join(rootDir, 'art');
const publicRoot = path.join(rootDir, 'public', 'media', 'optimized');

function walkPngFiles(directory) {
  const output = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      output.push(...walkPngFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      output.push(entryPath);
    }
  }

  return output;
}

function ensureDir(filePath) {
  mkdirSync(path.dirname(filePath), { recursive: true });
}

function isStale(sourcePath, outputPath) {
  if (!existsSync(outputPath)) {
    return true;
  }

  return statSync(sourcePath).mtimeMs > statSync(outputPath).mtimeMs;
}

function toPublicRelative(sourcePath) {
  return path.relative(artRoot, sourcePath);
}

function toWebpPath(outputPngPath) {
  return outputPngPath.replace(/\.png$/i, '.avif');
}

for (const sourcePath of walkPngFiles(artRoot)) {
  const relative = toPublicRelative(sourcePath);
  const outputPngPath = path.join(publicRoot, relative);
  const outputAvifPath = toWebpPath(outputPngPath);

  ensureDir(outputPngPath);

  if (isStale(sourcePath, outputPngPath)) {
    copyFileSync(sourcePath, outputPngPath);
  }

  if (isStale(sourcePath, outputAvifPath)) {
    execFileSync(
      'ffmpeg',
      [
        '-y',
        '-i',
        sourcePath,
        '-c:v',
        'libsvtav1',
        '-crf',
        '12',
        '-preset',
        '8',
        outputAvifPath,
      ],
      { stdio: 'ignore' },
    );
  }
}
