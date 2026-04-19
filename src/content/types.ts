export interface IllustrationEntry {
  src: string;
  alt: string;
}

export interface CharacterEntry {
  slug: string;
  name: string;
  summary: string;
  signatureItem: string;
  markdown: string;
  bodyMarkdown: string;
}

export interface EpisodeEntry {
  slug: string;
  number: number;
  title: string;
  focus: string;
  timePoint: string;
  keyScene: string;
  illustration: IllustrationEntry;
  markdown: string;
  bodyMarkdown: string;
}

export interface WorldEntry {
  slug: string;
  title: string;
  markdown: string;
  bodyMarkdown: string;
}

export interface ContentStore {
  characters: Record<string, CharacterEntry>;
  episodes: EpisodeEntry[];
  world: WorldEntry[];
}
