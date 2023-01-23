import React from 'react';
import { actions } from '@storybook/addon-actions';
import HowToInstallPage from './HowToInstallPage';

export default {
  component: HowToInstallPage,
  title: 'HowToInstallPage',
};

export const NormalAndMobileState: React.FC = () => (
  <HowToInstallPage
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);
