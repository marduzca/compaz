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
    route={['origin', 'destination']}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
  />
);
