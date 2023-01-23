import React from 'react';
import { Meta } from '@storybook/react';
import OfflineMapMessage from './OfflineMapMessage';

export default {
  title: 'General / Map / OfflineMapMessage',
  component: OfflineMapMessage,
} as Meta;

export const NormalAndMobileState: React.FC = () => (
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
