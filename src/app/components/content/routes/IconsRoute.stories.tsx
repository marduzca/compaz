import React from 'react';
import { Meta } from '@storybook/react';
import IconsRoute from './IconsRoute';
import { ConnectedStation, Route, SubRoute } from '../../domain';

const testRoute = {
  subRoutes: [
    {
      stationsPath: [
        {
          id: 'station_a',
          name: 'Station a',
          lines: ['green'],
          connectedStations: [
            { id: 'station_b', timeTo: 2 } as ConnectedStation,
          ],
        },
        {
          id: 'station_b',
          name: 'Station b',
          lines: ['green', 'red'],
          connectedStations: [
            { id: 'station_c', timeTo: 2 } as ConnectedStation,
          ],
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
          connectedStations: [
            { id: 'station_c', timeTo: 2 } as ConnectedStation,
          ],
        },
        {
          id: 'station_c',
          name: 'Station c',
          lines: ['red'],
          connectedStations: [
            { id: 'station_d', timeTo: 2 } as ConnectedStation,
          ],
        },
      ],
      totalTime: 2,
      line: 'red',
    },
  ] as SubRoute[],
  totalTime: 6,
} as Route;

export default {
  title: 'IconsRoute',
  component: IconsRoute,
} as Meta;

export const basicInNormalState = () => <IconsRoute route={testRoute} />;

export const withHiddenTimesInNormalState = () => (
  <IconsRoute route={testRoute} hideTimes />
);
