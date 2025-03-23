import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Instructions from './Instructions';
import { Browser, Device } from './InstructionsContainer';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../../.storybook/preview';

export default {
  component: Instructions,
  title: 'HowToInstallPage / Instructions',
} satisfies Meta;

export const WithDesktopGif = () => (
  <Instructions
    selectedDevice={Device.LAPTOP}
    onDeviceSelection={actions('onDeviceSelection').onDeviceSelection}
    selectedBrowser={Browser.GOOGLE_CHROME}
    onBrowserSelection={actions('onBrowserSelection').onBrowserSelection}
    availableBrowsers={[Browser.GOOGLE_CHROME, Browser.SAFARI]}
  />
);
WithDesktopGif.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT],
    },
  },
};

export const WithMobileGif: React.FC = () => (
  <Instructions
    selectedDevice={Device.ANDROID_AND_TABLET}
    onDeviceSelection={actions('onDeviceSelection').onDeviceSelection}
    selectedBrowser={Browser.MOZILLA_FIREFOX}
    onBrowserSelection={actions('onBrowserSelection').onBrowserSelection}
    availableBrowsers={[Browser.GOOGLE_CHROME, Browser.SAFARI]}
  />
);
