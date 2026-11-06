import { defineConfig } from 'cypress';

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 1600,
  defaultCommandTimeout: 15000,
  video: false,
  fixturesFolder: false,
  pageLoadTimeout: 100000,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  blockHosts: ['www.google-analytics.com', 'ssl.google-analytics.com'],
});
