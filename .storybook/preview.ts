/* eslint-disable import/no-extraneous-dependencies */
import { Preview } from '@storybook/react';
import MockDate from 'mockdate';
import '../src/app/i18n/instance';
import { SHOW_LINES_IN_STATION_SELECTOR } from '../src/app/featureFlag/FeatureFlag';

export const MOBILE_VIEWPORT = 390;
export const DESKTOP_VIEWPORT = 1280;

MockDate.set('1993-03-15T09:30:00.000Z');

localStorage.setItem(SHOW_LINES_IN_STATION_SELECTOR, 'true');
localStorage.setItem('replaceGifForVisualRegressionTest', 'true');

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export default preview;
