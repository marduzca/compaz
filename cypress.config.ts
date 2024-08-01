import { defineConfig } from 'cypress';
import setupPlugins from './cypress/plugins/index';
import PluginConfigOptions = Cypress.PluginConfigOptions;

export default defineConfig({
  viewportHeight: 900,
  viewportWidth: 1600,
  defaultCommandTimeout: 15000,
  video: false,
  fixturesFolder: false,
  pageLoadTimeout: 100000,
  e2e: {
    setupNodeEvents(on, config) {
      const pluginConfig = setupPlugins(on, config);
      return pluginConfig as PluginConfigOptions;
    },
    baseUrl: 'http://localhost:3000',
  },
  blockHosts: ['www.google-analytics.com', 'ssl.google-analytics.com'],
});
