import React from 'react';
import { actions } from '@storybook/addon-actions';
import HowToInstall from './HowToInstall';

export default {
  component: HowToInstall,
  title: 'HowToInstall',
};

export const NormalAndMobileState: React.FC = () => (
  <HowToInstall
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);
