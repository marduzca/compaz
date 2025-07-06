import { Meta } from '@storybook/react-vite';
import React from 'react';
import { actions } from 'storybook/actions';
import { MemoryRouter } from 'react-router';
import AboutPage from './AboutPage';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../.storybook/preview';

export default {
  component: AboutPage,
  title: 'AboutPage',
  decorators: [
    (Story: React.ComponentType) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta;

export const Basic = () => (
  <AboutPage
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
