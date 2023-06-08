import React from 'react';
import { actions } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import HowToInstallPage from './HowToInstallPage';

export default {
  component: HowToInstallPage,
  title: 'HowToInstallPage',
} as Meta;

export const NormalAndMobileState: React.FC = () => (
  <HowToInstallPage
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);
