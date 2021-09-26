import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import RoutesOverview from './RoutesOverview';
import { ConnectedStation, Route, SubRoute } from '../../domain';

export default {
  title: 'RoutesOverview',
  component: RoutesOverview,
} as Meta;

export const normalAndMobileState = () => (
  <RoutesOverview
    route={
      {
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
      } as Route
    }
    originName="Station a"
    destinationName="Station d"
    dateAndTime={new Date('1993-03-15 09:30')}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
  />
);
