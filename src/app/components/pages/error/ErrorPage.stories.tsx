import React from 'react';
import { actions } from 'storybook/actions';
import { Meta } from '@storybook/react-vite';
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
