/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'service-worker.js',
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,gif}'],
        maximumFileSizeToCacheInBytes: 5242880,
      },
      devOptions: { enabled: false },
    }),
  ],
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
  },
  server: {
    open: true,
    port: 3000,
  },
});
