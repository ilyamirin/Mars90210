import type { WorldEntry } from './types';

export interface WorldGroup {
  title: string;
  entries: WorldEntry[];
}

const groupConfig = [
  {
    title: 'Места',
    categories: ['places'] as WorldEntry['category'][],
  },
  {
    title: 'Системы и силы',
    categories: ['systems'] as WorldEntry['category'][],
  },
  {
    title: 'Символы и связи',
    categories: ['symbols', 'relationships'] as WorldEntry['category'][],
  },
];

const previewOrder: WorldEntry['category'][][] = [['places'], ['systems'], ['symbols', 'relationships']];

export function groupWorldEntries(entries: WorldEntry[]): WorldGroup[] {
  return groupConfig
    .map((group) => ({
      title: group.title,
      entries: entries.filter((entry) => group.categories.includes(entry.category)),
    }))
    .filter((group) => group.entries.length > 0);
}

export function selectWorldPreviewEntries(entries: WorldEntry[]) {
  return previewOrder
    .map((categories) =>
      categories
        .map((category) => entries.find((entry) => entry.category === category))
        .find((entry): entry is WorldEntry => Boolean(entry)),
    )
    .filter((entry): entry is WorldEntry => Boolean(entry));
}
