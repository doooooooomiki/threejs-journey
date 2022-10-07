import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // https://vitejs.dev/guide/build.html#multi-page-app
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lesson003: resolve(__dirname, 'lessons/003-basic-scene/index.html'),
      }
    }
  }
})