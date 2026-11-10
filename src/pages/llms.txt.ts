import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const url = (path: string) => new URL(path, context.site).href;
  const articles = (await getCollection('articles', a => !a.data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const line = (a: (typeof articles)[number]) =>
    `- [${a.data.title}](${url(`/archive/${a.id.replace(/\.md$/, '')}/`)}): ${a.data.description}`;
  const isBook = (a: (typeof articles)[number]) => a.data.categories?.[0] === 'Book Summary';
  const feed = (await getCollection('feed'))
    .filter(f => !f.data.link)
    .sort((a, b) => (b.data.updated ?? b.data.date).getTime() - (a.data.updated ?? a.data.date).getTime());

  const body = `# Arthur Pfalzgraf

> Personal site of Arthur Pfalzgraf, Director of Product at Iron by MoonPay (stablecoin payments). Previously product at Ultimate (acquired by Jupiter Exchange), Trade Republic and HelloFresh. The site logs what he builds on the side: AI agents, n8n automations, and the data layer underneath them.

## Pages

- [About](${url('/experience/')}): career history and short bio
- [Builds](${url('/builds/')}): curated list of personal projects with stack and links
- [Full text of the articles](${url('/llms-full.txt')}): build write-ups as plain markdown

## Build write-ups

${articles.filter(a => !isBook(a)).map(line).join('\n')}

## Other builds

${feed.map(f => `- ${f.data.title}: ${f.data.description}`).join('\n')}

## Book summaries

${articles.filter(isBook).map(line).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
