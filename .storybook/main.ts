import { mergeConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],

  addons: ['@storybook/addon-links', '@storybook/addon-docs'],

  framework: '@storybook/react-vite',

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [],
    });
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
