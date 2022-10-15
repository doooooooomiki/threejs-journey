import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  // https://vitejs.dev/guide/build.html#multi-page-app
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        _000: resolve(__dirname, 'src/lesson/000/index.html'),
        _001: resolve(__dirname, 'src/lesson/001/index.html'),
        _002: resolve(__dirname, 'src/lesson/002/index.html'),
        _003: resolve(__dirname, 'src/lesson/003/index.html'),
        _004: resolve(__dirname, 'src/lesson/004/index.html'),
        _005: resolve(__dirname, 'src/lesson/005/index.html'),
        _006: resolve(__dirname, 'src/lesson/006/index.html'),
        _007: resolve(__dirname, 'src/lesson/007/index.html'),
      },
      output: {
        dir: 'dist',
      }
    }
  }
})