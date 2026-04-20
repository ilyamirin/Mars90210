import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const githubPagesBase = '/Mars90210/';
const isGithubPagesBuild = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isGithubPagesBuild ? githubPagesBase : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    exclude: ['**/.worktrees/**', '**/dist/**', '**/node_modules/**'],
  },
});
