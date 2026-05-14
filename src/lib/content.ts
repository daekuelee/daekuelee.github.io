import { getCollection, type CollectionEntry } from 'astro:content';
import { sitePath, slugify } from './site';

export type CollectionKey = 'posts' | 'notes' | 'projects';
export type AnyEntry =
  | CollectionEntry<'posts'>
  | CollectionEntry<'notes'>
  | CollectionEntry<'projects'>;

const sectionByCollection: Record<CollectionKey, string> = {
  posts: 'posts',
  notes: 'notes',
  projects: 'projects',
};

export async function getPublishedEntries<T extends CollectionKey>(collection: T) {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function getAllPublishedEntries() {
  const groups = await Promise.all([
    getPublishedEntries('posts'),
    getPublishedEntries('notes'),
    getPublishedEntries('projects'),
  ]);

  return groups
    .flatMap((entries, index) =>
      entries.map((entry) => ({
        entry,
        collection: ['posts', 'notes', 'projects'][index] as CollectionKey,
      })),
    )
    .sort((a, b) => b.entry.data.pubDate.getTime() - a.entry.data.pubDate.getTime());
}

export function entryHref(collection: CollectionKey, id: string) {
  return sitePath(`/${sectionByCollection[collection]}/${id}/`);
}

export function tagHref(tag: string) {
  return sitePath(`/tags/${slugify(tag)}/`);
}

export function seriesHref(series: string) {
  return sitePath(`/series/${slugify(series)}/`);
}

export function collectionLabel(collection: CollectionKey) {
  return collection === 'posts' ? 'Post' : collection === 'notes' ? 'Note' : 'Project';
}
