import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const feed = await getCollection('feed');
  return rss({
    title: 'Arthur Pfalzgraf',
    description: 'Feed for thoughts.',
    site: context.site!,
    trailingSlash: false,
    items: feed
      .map(item => ({
        title: item.data.title,
        description: item.data.description,
        pubDate: item.data.updated ?? item.data.date,
        link: item.data.link ?? `/#${item.id}`,
      }))
      .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
  });
}
