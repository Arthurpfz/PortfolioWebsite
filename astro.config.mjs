// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import rehypePluginImageNativeLazyLoading from 'rehype-plugin-image-native-lazy-loading';

// https://astro.build/config
export default defineConfig({
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
