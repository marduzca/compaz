import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Map from './Map';
import { MapMode } from './MapContainer';
import { MOBILE_VIEWPORT } from '../../../../../.storybook/preview';

export default {
  title: 'General / Map',
  component: Map,
} satisfies Meta;

export const Loading = () => (
  <Map
    currentMapMode={MapMode.LINES}
    isLoaded={false}
    origin={undefined}
    destination={undefined}
    route={undefined}
    onGoogleMapLoad={actions('onGoogleMapLoad').onGoogleMapLoad}
  />
);
Loading.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT],
    },
  },
};
