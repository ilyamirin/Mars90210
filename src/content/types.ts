export interface IllustrationEntry {
  src: string;
  alt: string;
  pngSrc?: string;
  avifSrc?: string;
  width?: number;
  height?: number;
  isPlaceholder?: boolean;
  placeholderText?: string;
}

export interface CharacterEntry {
  slug: string;
  name: string;
  gender: 'женщина' | 'мужчина';
  group: 'main' | 'secondary';
  roleLabel: string;
  cardBlurb: string;
  hasPortrait: boolean;
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
  cardExcerpt: string;
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
  cardExcerpt: string;
  category: 'places' | 'relationships' | 'systems' | 'symbols';
  priority: 'high' | 'medium' | 'low';
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
