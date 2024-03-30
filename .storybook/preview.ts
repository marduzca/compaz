import { Preview } from '@storybook/react';
import MockDate from 'mockdate';
import '../src/app/i18n/instance';

MockDate.set('1993-03-15T09:30:00.000Z');

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
