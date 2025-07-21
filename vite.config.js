// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.', // ensure root is current directory
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),        // root/index.html
        projects: resolve(__dirname, 'projects.html')  // root/projects.html
      }
    }
  },
  server: {
    port: 3000
  }
});
