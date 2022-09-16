import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Instructions from './Instructions';
import { Browser, Device } from './InstructionsContainer';

export default {
  component: Instructions,
  title: 'HowToInstall / Instructions',
} as Meta;

export const WithDesktopGifInNormalAndMobileState: React.FC = () => (
  <Instructions
    selectedDevice={Device.LAPTOP}
    onDeviceSelection={actions('onDeviceSelection').onDeviceSelection}
    selectedBrowser={Browser.GOOGLE_CHROME}
    onBrowserSelection={actions('onBrowserSelection').onBrowserSelection}
    availableBrowsers={[Browser.GOOGLE_CHROME, Browser.SAFARI]}
  />
);

export const WithMobileGifInNormalState: React.FC = () => (
  <Instructions
    selectedDevice={Device.ANDROID_AND_TABLET}
    onDeviceSelection={actions('onDeviceSelection').onDeviceSelection}
    selectedBrowser={Browser.MOZILLA_FIREFOX}
    onBrowserSelection={actions('onBrowserSelection').onBrowserSelection}
    availableBrowsers={[Browser.GOOGLE_CHROME, Browser.SAFARI]}
  />
);
