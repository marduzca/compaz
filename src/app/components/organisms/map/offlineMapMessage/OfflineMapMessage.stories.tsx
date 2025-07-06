import React from 'react';
import { Meta } from '@storybook/react-vite';
import OfflineMapMessage from './OfflineMapMessage';
import {
  DESKTOP_VIEWPORT,
  MOBILE_VIEWPORT,
} from '../../../../../../.storybook/preview';

export default {
  title: 'General / Map / OfflineMapMessage',
  component: OfflineMapMessage,
} satisfies Meta;

export const Basic = () => (
  <div
    style={{
      height: '500px',
      backgroundColor: '#E5E3DE',
      display: 'grid',
      placeItems: 'center',
    }}
  >
    <OfflineMapMessage />
  </div>
);
Basic.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT, DESKTOP_VIEWPORT],
    },
  },
};
