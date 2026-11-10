import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

// Build write-ups as plain markdown (book summaries are linked from /llms.txt)
export async function GET(context: APIContext) {
  const articles = (await getCollection('articles', a => !a.data.draft && a.data.categories?.[0] !== 'Book Summary')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
  const body = articles
    .map(a => {
      const url = new URL(`/archive/${a.id.replace(/\.md$/, '')}/`, context.site).href;
      const date = (a.data.updated ?? a.data.date).toISOString().split('T')[0];
      return `# ${a.data.title}\n\nBy Arthur Pfalzgraf · ${url} · last updated ${date}\n\n${a.data.description}\n\n${(a.body ?? '').trim()}`;
    })
    .join('\n\n---\n\n');
  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
