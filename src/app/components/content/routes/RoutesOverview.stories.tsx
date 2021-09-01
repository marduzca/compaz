import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import RoutesOverview from './RoutesOverview';

export default {
  title: 'RoutesOverview',
  component: RoutesOverview,
} as Meta;

export const normalAndMobileState = () => (
  <RoutesOverview
    route={[
      {
        id: 'some_station',
        name: 'Some station',
        lines: ['green'],
        connectedStations: [],
      },
      {
        id: 'other_station',
        name: 'Other station',
        lines: ['green'],
        connectedStations: [],
      },
    ]}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
  />
);
