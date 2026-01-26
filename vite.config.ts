// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/scripts/main.ts'),
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        dir: 'public',
      },
    },
    emptyOutDir: false,
  },
})
