export const SITE_TITLE = 'Daeku Tech Notes';
export const SITE_DESCRIPTION =
  'Technical writing, learning notes, and project writeups from Daeku.';
export const SITE_AUTHOR = 'Daeku';

const rawBase = import.meta.env.BASE_URL ?? '/';
export const BASE_PATH = rawBase === '/' ? '' : rawBase.replace(/\/$/, '');

export function sitePath(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}` || '/';
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
