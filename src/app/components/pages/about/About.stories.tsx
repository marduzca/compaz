import { Meta } from '@storybook/react';
import React from 'react';
import { actions } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

export default {
  component: About,
  title: 'About',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

export const NormalAndMobileState: React.FC = () => (
  <About onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick} />
);
