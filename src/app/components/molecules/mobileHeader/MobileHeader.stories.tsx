import React from 'react';
import { actions } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import MobileHeader from './MobileHeader';

export default {
  component: MobileHeader,
  title: 'Molecules / MobileHeader',
} as Meta;

export const onLightBackground: React.FC = () => (
  <MobileHeader
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
    hasLightBackground
  />
);

export const onDarkBackground: React.FC = () => (
  <div style={{ backgroundColor: '#1976d2' }}>
    <MobileHeader
      onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
      hasLightBackground={false}
    />
  </div>
);
