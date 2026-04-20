import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(rootDir, 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');
const noJekyllPath = path.join(distDir, '.nojekyll');

if (!existsSync(indexPath)) {
  throw new Error(`Build output is missing: ${indexPath}`);
}

copyFileSync(indexPath, notFoundPath);
writeFileSync(noJekyllPath, '\n');
