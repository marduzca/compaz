import MockDate from 'mockdate';

MockDate.set('1993-03-15T09:30:00.000Z');

localStorage.setItem('replaceGifForVisualRegressionTest', 'true');

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
