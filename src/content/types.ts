export interface IllustrationEntry {
  src: string;
  alt: string;
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

export interface EpisodeEntry {
  slug: string;
  number: number;
  title: string;
  focus: string;
  timePoint: string;
  keyScene: string;
  excerpt: string;
  illustration: IllustrationEntry;
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
  episodes: EpisodeEntry[];
  world: WorldEntry[];
  about: AboutSectionEntry[];
}
