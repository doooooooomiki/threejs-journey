import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  // https://vitejs.dev/guide/build.html#multi-page-app
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        _003: resolve(__dirname, 'src/lesson/003/index.html'),
        _005: resolve(__dirname, 'src/lesson/005/index.html'),
      },
      output: {
        dir: 'dist',
      }
    }
  }
})