import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Map from './Map';

export default {
  title: 'General / Map',
  component: Map,
} as Meta;

export const LoadingMobileState = () => (
  <Map
    isLoaded={false}
    origin={undefined}
    destination={undefined}
    route={undefined}
    onGoogleMapLoad={actions('onGoogleMapLoad').onGoogleMapLoad}
  />
);
