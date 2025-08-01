import { Meta } from '@storybook/react-vite';
import React from 'react';
import TotalRouteTime from './TotalRouteTime';

export default {
  title: 'NavigationPage / RoutesOverview / TotalRouteTime',
  component: TotalRouteTime,
} satisfies Meta;

export const OnlyMinutesInNormalState = () => <TotalRouteTime totalTime={16} />;

export const OverOneHourInNormalState = () => <TotalRouteTime totalTime={75} />;
