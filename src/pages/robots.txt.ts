import { sitePath } from '@lib/site';

export function GET(context: { site: URL }) {
  const sitemap = new URL(sitePath('/sitemap-index.xml'), context.site);

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
