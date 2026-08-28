import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  //site: 'https://hyuji.dev',
  site: 'https://joonhyoo.github.io',
  base: '/hyuji_dev',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
