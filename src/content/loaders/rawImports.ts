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

export const optimizedAboutPngAssets = import.meta.glob(
  '/public/media/optimized/site/about/*/illustration.png',
  {
    eager: false,
  },
);

export const optimizedAboutAvifAssets = import.meta.glob(
  '/public/media/optimized/site/about/*/illustration.avif',
  {
    eager: false,
  },
);

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

export const optimizedEpisodeAvifAssets = import.meta.glob(
  '/public/media/optimized/season-01/*/illustration.avif',
  {
    eager: false,
  },
);

export const optimizedWorldAvifAssets = import.meta.glob(
  '/public/media/optimized/world/*/illustration.avif',
  {
    eager: false,
  },
);
