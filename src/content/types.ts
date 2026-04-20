export interface IllustrationEntry {
  src: string;
  alt: string;
  pngSrc?: string;
  avifSrc?: string;
  width?: number;
  height?: number;
  isPlaceholder?: boolean;
}

export interface CharacterEntry {
  slug: string;
  name: string;
  summary: string;
  signatureItem: string;
  tagline: string;
  portrait: IllustrationEntry;
  markdown: string;
  bodyMarkdown: string;
  shortBodyMarkdown: string;
}

export interface EpisodeSummaryEntry {
  slug: string;
  number: number;
  title: string;
  focus: string;
  timePoint: string;
  keyScene: string;
  excerpt: string;
  illustration: IllustrationEntry;
}

export interface EpisodeEntry extends EpisodeSummaryEntry {
  markdown: string;
  bodyMarkdown: string;
}

export interface WorldEntry {
  slug: string;
  title: string;
  excerpt: string;
  relatedImages: IllustrationEntry[];
  markdown: string;
  bodyMarkdown: string;
}

export interface AboutSectionEntry {
  slug: string;
  title: string;
  eyebrow: string;
  bodyMarkdown: string;
  visualKey: 'project' | 'ai-gen' | 'creator';
}

export interface ContentStore {
  characters: Record<string, CharacterEntry>;
  episodes: EpisodeSummaryEntry[];
  world: WorldEntry[];
  about: AboutSectionEntry[];
}
