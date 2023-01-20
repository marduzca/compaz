import React from 'react';
import { actions } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import MobileHeader from './MobileHeader';

export default {
  component: MobileHeader,
  title: 'Molecules / MobileHeader',
} as Meta;

export const OnLightBackground: React.FC = () => (
  <MobileHeader
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    hasLightBackground
  />
);

export const OnDarkBackground: React.FC = () => (
  <div style={{ backgroundColor: '#1976d2' }}>
    <MobileHeader
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    />
  </div>
);

export const WithMenuButtonOnly: React.FC = () => (
  <MobileHeader
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    hasMenuButtonOnly
  />
);
