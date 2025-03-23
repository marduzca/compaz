import React from 'react';
import { actions } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../.storybook/preview';
import ErrorPage from './ErrorPage';

export default {
  component: ErrorPage,
  title: 'ErrorPage',
} satisfies Meta;

export const Basic = () => (
  <ErrorPage
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);
Basic.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT],
    },
  },
};
