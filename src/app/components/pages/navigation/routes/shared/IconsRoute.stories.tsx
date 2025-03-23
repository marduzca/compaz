import React from 'react';
import { Meta } from '@storybook/react';
import IconsRoute from './IconsRoute';
import { ConnectedStation, LineColor, SubRoute } from '../../../../domain';

const testSubRoutes = [
  {
    stationsPath: [
      {
        id: 'station_a',
        name: 'Station a',
        lines: [LineColor.GREEN],
        connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_b',
        name: 'Station b',
        lines: [LineColor.GREEN, LineColor.RED],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
      },
    ],
    totalTime: 2,
    line: LineColor.BLUE,
    transferTimeToNextLine: 3,
  },
  {
    stationsPath: [
      {
        id: 'station_b',
        name: 'Station b',
        lines: [LineColor.GREEN, LineColor.RED],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: [LineColor.RED],
        connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
      },
    ],
    totalTime: 2,
    line: LineColor.RED,
  },
] as SubRoute[];

export default {
  title: 'NavigationPage / RoutesOverview / IconsRoute',
  component: IconsRoute,
} satisfies Meta;

export const BasicInNormalState = () => (
  <IconsRoute subRoutes={testSubRoutes} />
);

export const WithHiddenTimesInNormalState = () => (
  <IconsRoute subRoutes={testSubRoutes} hideTimes />
);
