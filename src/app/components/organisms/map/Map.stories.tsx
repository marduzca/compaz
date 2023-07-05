import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Map from './Map';
import { MapMode } from './MapContainer';

export default {
  title: 'General / Map',
  component: Map,
} as Meta;

export const LoadingMobileState = () => (
  <Map
    currentMapMode={MapMode.LINES}
    isLoaded={false}
    origin={undefined}
    destination={undefined}
    route={undefined}
    onGoogleMapLoad={actions('onGoogleMapLoad').onGoogleMapLoad}
  />
);
