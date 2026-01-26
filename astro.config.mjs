// @ts-check
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import relativeLinks from 'astro-relative-links'

// https://astro.build/config
export default defineConfig({
  integrations: [relativeLinks()],
  compressHTML: false,
  build: {
    format: 'preserve',
  },

  vite: {
    plugins: [tailwindcss()],
    publicDir: 'public',
    assetsInclude: ['**/*.woff2', '**/*.webp'],
    build: {
      minify: false,
      cssMinify: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(assetInfo.name)) {
              return 'assets/img/[name][extname]'
            } else if (/\.css$/.test(assetInfo.name)) {
              return 'assets/css/style[extname]'
            } else if (/\.js$/.test(assetInfo.name)) {
              return 'assets/js/[name][extname]'
            } else if (/\.otf$/.test(assetInfo.name)) {
              return 'assets/fonts/[name][extname]'
            }
            return 'assets/[name][extname]'
          },
        },
      },
    },
  },
})
