import React from 'react';
import { actions } from '@storybook/addon-actions';
import MobileHeader from './MobileHeader';

export default {
  component: MobileHeader,
  title: 'Molecules / MobileHeader',
};

export const mobileState: React.FC = () => (
  <MobileHeader
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);
