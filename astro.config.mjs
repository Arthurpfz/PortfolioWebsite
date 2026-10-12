// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypePluginImageNativeLazyLoading from 'rehype-plugin-image-native-lazy-loading';

// https://astro.build/config
export default defineConfig({
  site: 'https://arthurpfz.com',
  integrations: [sitemap()],
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
