import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Instructions from './Instructions';
import { Device } from './InstructionsContainer';

export default {
  component: Instructions,
  title: 'HowToInstall / Instructions',
} as Meta;

export const NormalAndMobileState: React.FC = () => (
  <Instructions
    selectedDevice={Device.SMARTPHONE_TABLET.toString()}
    onDeviceSelection={actions('onDeviceSelection').onDeviceSelection}
  />
);
