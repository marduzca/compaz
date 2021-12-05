import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Map from './Map';

export default {
  title: 'Map',
  component: Map,
} as Meta;

export const loadingMobile = () => (
  <Map
    isLoaded={false}
    markers={[]}
    onGoogleMapLoad={actions('onGoogleMapLoad').onGoogleMapLoad}
  />
);
