import { Meta } from '@storybook/react';
import React from 'react';
import TotalRouteTime from './TotalRouteTime';

export default {
  title: 'TotalRouteTime',
  component: TotalRouteTime,
} as Meta;

export const onlyMinutesInNormalState = () => <TotalRouteTime totalTime={16} />;

export const overOneHourInNormalState = () => <TotalRouteTime totalTime={75} />;
