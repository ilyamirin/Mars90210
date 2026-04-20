import { describe, expect, test } from 'vitest';
import { resolveRouterBasename } from './routerBase';

describe('resolveRouterBasename', () => {
  test('returns undefined for root deployments', () => {
    expect(resolveRouterBasename('/')).toBeUndefined();
  });

  test('normalizes repository base paths for GitHub Pages', () => {
    expect(resolveRouterBasename('/Mars90210/')).toBe('/Mars90210');
  });
});
