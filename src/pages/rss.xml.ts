import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const feed = await getCollection('feed');
  const articles = await getCollection('articles', a => !a.data.draft);
  const items = [
    ...feed.map(item => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.updated ?? item.data.date,
      link: item.data.link ?? `/#${item.id}`,
    })),
    ...articles.map(a => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.updated ?? a.data.date,
      link: `/archive/${a.id.replace(/\.md$/, '')}/`,
    })),
  ];
  // a feed card that links to an article wins over the article itself
  const byLink = new Map(items.reverse().map(i => [i.link, i]));
  return rss({
    title: 'Arthur Pfalzgraf',
    description: 'Feed for thoughts.',
    site: context.site!,
    trailingSlash: false,
    items: [...byLink.values()].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
  });
}
