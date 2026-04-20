import { describe, expect, test, vi } from 'vitest';

describe('withBaseAssetPath', () => {
  test('returns root-relative path for local base', async () => {
    vi.stubEnv('BASE_URL', '/');
    const { withBaseAssetPath } = await import('./assetPaths');

    expect(withBaseAssetPath('media/optimized/foo.png')).toBe('/media/optimized/foo.png');
  });

  test('prefixes repository base for GitHub Pages builds', async () => {
    vi.stubEnv('BASE_URL', '/Mars90210/');
    const { withBaseAssetPath } = await import('./assetPaths');

    expect(withBaseAssetPath('media/optimized/foo.png')).toBe('/Mars90210/media/optimized/foo.png');
  });
});
