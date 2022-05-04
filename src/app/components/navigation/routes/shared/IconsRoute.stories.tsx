import React from 'react';
import { Meta } from '@storybook/react';
import IconsRoute from './IconsRoute';
import { ConnectedStation, SubRoute } from '../../../domain';

const testSubRoutes = [
  {
    stationsPath: [
      {
        id: 'station_a',
        name: 'Station a',
        lines: ['green'],
        connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_b',
        name: 'Station b',
        lines: ['green', 'red'],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
      },
    ],
    totalTime: 2,
    line: 'blue',
    transferTimeToNextLine: 3,
  },
  {
    stationsPath: [
      {
        id: 'station_b',
        name: 'Station b',
        lines: ['green', 'red'],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: ['red'],
        connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
      },
    ],
    totalTime: 2,
    line: 'red',
  },
] as SubRoute[];

export default {
  title: 'IconsRoute',
  component: IconsRoute,
} as Meta;

export const BasicInNormalState = () => (
  <IconsRoute subRoutes={testSubRoutes} />
);

export const WithHiddenTimesInNormalState = () => (
  <IconsRoute subRoutes={testSubRoutes} hideTimes />
);
