// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://maheshgadakh.pages.dev',
  server: {
    port: 4321,
    host: 'localhost',
  },
  vite: {
    server: {
      port: 4321,
      host: 'localhost',
      hmr: {
        port: 4321,
        host: 'localhost',
        protocol: 'ws',
      },
    },
  },
});

