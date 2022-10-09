import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // https://vitejs.dev/guide/build.html#multi-page-app
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        _003: resolve(__dirname, 'lesson/003/index.html'),
        _005: resolve(__dirname, 'lesson/005/index.html'),
      }
    }
  }
})