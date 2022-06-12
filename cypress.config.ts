import { defineConfig } from 'cypress';

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 1600,
  defaultCommandTimeout: 15000,
  video: false,
  fixturesFolder: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
      return require('./cypress/plugins/index')(on, config);
    },
    baseUrl: 'http://localhost:3000',
  },
});
