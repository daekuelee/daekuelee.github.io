import rss from '@astrojs/rss';
import { getAllPublishedEntries } from '@lib/content';
import { SITE_DESCRIPTION, SITE_TITLE, sitePath } from '@lib/site';

export async function GET(context: { site: URL }) {
  const entries = await getAllPublishedEntries();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: entries.map(({ entry, collection }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: sitePath(`/${collection}/${entry.id}/`),
    })),
  });
}
