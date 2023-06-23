import React from 'react';
import { Meta } from '@storybook/react';

import CurrentLocation from './CurrentLocation';

export default {
  component: CurrentLocation,
  title: 'General / Map / CurrentLocation',
} as Meta;

export const CurrentLocationInNormalState: React.FC = () => (
  <div
    style={{
      backgroundColor: '#1976d2',
      width: '200px',
      height: '200px',
      position: 'relative',
    }}
  >
    <CurrentLocation googleMapReference={{} as google.maps.Map} />
  </div>
);
