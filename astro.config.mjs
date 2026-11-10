// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { existsSync, readFileSync } from 'node:fs';
import rehypePluginImageNativeLazyLoading from 'rehype-plugin-image-native-lazy-loading';

// https://astro.build/config
export default defineConfig({
  site: 'https://arthurpfz.com',
  integrations: [
    sitemap({
      // lastmod: an article's `updated` (or `date`) from its frontmatter, build time for everything else
      serialize(item) {
        const slug = new URL(item.url).pathname.match(/^\/archive\/([^/]+)\/$/)?.[1];
        const file = `./src/content/articles/${slug}.md`;
        const fm = slug && existsSync(file) ? readFileSync(file, 'utf8') : '';
        const date = fm.match(/^updated:\s*(\S+)/m)?.[1] ?? fm.match(/^date:\s*(\S+)/m)?.[1];
        item.lastmod = (date ? new Date(date) : new Date()).toISOString();
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  markdown: {
    rehypePlugins: [rehypePluginImageNativeLazyLoading],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
    },
  },
});
