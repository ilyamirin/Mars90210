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

export const episodeMarkdown = import.meta.glob('/episodes/season-01/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

export const illustrationImages = import.meta.glob('/art/season-01/**/illustration.png', {
  eager: true,
  import: 'default',
});

export const portraitImages = import.meta.glob('/art/portraits/heroines/**/portrait.png', {
  eager: true,
  import: 'default',
});
