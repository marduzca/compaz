import { Meta } from '@storybook/react';
import React from 'react';
import TotalRouteTime from './TotalRouteTime';

export default {
  title: 'NavigationPage / RoutesOverview / TotalRouteTime',
  component: TotalRouteTime,
} as Meta;

export const OnlyMinutesInNormalState = () => <TotalRouteTime totalTime={16} />;

export const OverOneHourInNormalState = () => <TotalRouteTime totalTime={75} />;
