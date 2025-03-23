import React from 'react';
import { actions } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';
import HowToInstallPage from './HowToInstallPage';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../.storybook/preview';

export default {
  component: HowToInstallPage,
  title: 'HowToInstallPage',
} satisfies Meta;

export const Basic = () => (
  <HowToInstallPage
    onMenuButtonClick={actions('onMenuButtonClick').onMenuButtonClick}
  />
);
Basic.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT],
    },
  },
};
