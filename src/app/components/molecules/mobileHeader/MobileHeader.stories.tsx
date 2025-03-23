import React from 'react';
import { actions } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router';
import MobileHeader from './MobileHeader';

export default {
  component: MobileHeader,
  title: 'Molecules / MobileHeader',
} satisfies Meta;

export const OnLightBackground: React.FC = () => (
  <MobileHeader
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);

export const OnDarkBackground: React.FC = () => (
  <div style={{ backgroundColor: '#1976d2' }}>
    <MemoryRouter>
      <MobileHeader
        onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
        isNavigationPage
      />
    </MemoryRouter>
  </div>
);

export const WithMenuButtonOnly: React.FC = () => (
  <MobileHeader
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    hasMenuButtonOnly
  />
);
