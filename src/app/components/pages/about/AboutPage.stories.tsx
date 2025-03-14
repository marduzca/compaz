import { Meta } from '@storybook/react';
import React from 'react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router';
import AboutPage from './AboutPage';

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
} as Meta;

export const NormalAndMobileState: React.FC = () => (
  <AboutPage
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);
