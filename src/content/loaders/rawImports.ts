export const characterMarkdown = import.meta.glob('/canon/characters/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

export const worldMarkdown = import.meta.glob('/canon/world/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

export const aboutMarkdown = import.meta.glob('/site/about/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

export const optimizedPortraitPngAssets = import.meta.glob(
  '/public/media/optimized/portraits/heroines/*/portrait.png',
  {
    eager: false,
  },
);

export const optimizedPortraitAvifAssets = import.meta.glob(
  '/public/media/optimized/portraits/heroines/*/portrait.avif',
  {
    eager: false,
  },
);
