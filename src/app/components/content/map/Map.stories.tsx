import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Map from './Map';

export default {
  title: 'Map',
  component: Map,
} as Meta;

export const loadingMobileState = () => (
  <Map
    isLoaded={false}
    origin={undefined}
    destination={undefined}
    onGoogleMapLoad={actions('onGoogleMapLoad').onGoogleMapLoad}
  />
);
