import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const artRoot = path.join(rootDir, 'art');
const publicRoot = path.join(rootDir, 'public', 'media', 'optimized');
const optimizerMtimeMs = statSync(fileURLToPath(import.meta.url)).mtimeMs;

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

  const freshnessFloor = Math.max(statSync(sourcePath).mtimeMs, optimizerMtimeMs);
  return freshnessFloor > statSync(outputPath).mtimeMs;
}

function toPublicRelative(sourcePath) {
  return path.relative(artRoot, sourcePath);
}

function toWebpPath(outputPngPath) {
  return outputPngPath.replace(/\.png$/i, '.avif');
}

function skipMarkerPath(outputPath) {
  return `${outputPath}.skip`;
}

async function optimizePng(sourcePath, outputPath) {
  await sharp(sourcePath)
    .png({
      compressionLevel: 9,
      effort: 10,
      adaptiveFiltering: true,
      progressive: false,
      palette: false,
    })
    .toFile(outputPath);
}

async function optimizeAvif(sourcePath, outputPath, outputPngPath) {
  const markerPath = skipMarkerPath(outputPath);
  const buffer = await sharp(sourcePath)
    .avif({
      lossless: true,
      effort: 9,
      chromaSubsampling: '4:4:4',
    })
    .toBuffer();
  const pngSize = statSync(outputPngPath).size;

  if (buffer.length < pngSize) {
    writeFileSync(outputPath, buffer);
    if (existsSync(markerPath)) {
      unlinkSync(markerPath);
    }
    return;
  }

  if (existsSync(outputPath)) {
    unlinkSync(outputPath);
  }

  writeFileSync(markerPath, `skip lossless avif: png=${pngSize} avif=${buffer.length}\n`);
}

for (const sourcePath of walkPngFiles(artRoot)) {
  const relative = toPublicRelative(sourcePath);
  const outputPngPath = path.join(publicRoot, relative);
  const outputAvifPath = toWebpPath(outputPngPath);
  const outputAvifSkipPath = skipMarkerPath(outputAvifPath);

  ensureDir(outputPngPath);

  if (isStale(sourcePath, outputPngPath)) {
    await optimizePng(sourcePath, outputPngPath);
  }

  const avifIsFresh = existsSync(outputAvifPath) && !isStale(sourcePath, outputAvifPath);
  const skipMarkerIsFresh =
    existsSync(outputAvifSkipPath) && !isStale(sourcePath, outputAvifSkipPath);

  if (!avifIsFresh && !skipMarkerIsFresh) {
    await optimizeAvif(sourcePath, outputAvifPath, outputPngPath);
  }
}
