import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main',
        vite: {
          build: {
            outDir: 'dist-electron/main',
            rollupOptions: { external: [] },
          },
        },
      },
      preload: {
        input: path.join(__dirname, 'electron/preload'),
        vite: {
          build: {
            outDir: 'dist-electron/preload',
          },
        },
      },
    }),
  ],
})
