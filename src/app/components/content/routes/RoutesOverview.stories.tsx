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
      } as Route
    }
    originName="Station a"
    destinationName="Station d"
    dateAndTime={new Date('1993-03-15 09:30')}
    displayedRouteTimes={[
      new Date('1993-03-15 09:30'),
      new Date('1993-03-15 09:35'),
      new Date('1993-03-15 09:40'),
      new Date('1993-03-15 09:45'),
    ]}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
    onEarlierButtonClick={actions('onEarlierButtonClick').onEarlierButtonClick}
    onLaterButtonClick={actions('onLaterButtonClick').onLaterButtonClick}
  />
);

export const tooLongConnectionInNormalAndMobileState = () => (
  <RoutesOverview
    route={
      {
        subRoutes: [
          {
            stationsPath: [
              {
                id: 'station_a',
                name: 'Station a',
                lines: ['blue'],
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
                lines: ['blue', 'red'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: ['red', 'green'],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: 'red',
            transferTimeToNextLine: 2,
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
                lines: ['green', 'white'],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: 'green',
            transferTimeToNextLine: 4,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Station b',
                lines: ['white', 'green'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: ['white', 'purple'],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: 'white',
            transferTimeToNextLine: 2,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Station b',
                lines: ['white', 'purple'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: ['purple'],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: 'purple',
          },
        ] as SubRoute[],
        totalTime: 10,
      } as Route
    }
    originName="Station a"
    destinationName="Station d"
    dateAndTime={new Date('1993-03-15 09:30')}
    displayedRouteTimes={[
      new Date('1993-03-15 09:30'),
      new Date('1993-03-15 09:35'),
      new Date('1993-03-15 09:40'),
      new Date('1993-03-15 09:45'),
    ]}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
    onEarlierButtonClick={actions('onEarlierButtonClick').onEarlierButtonClick}
    onLaterButtonClick={actions('onLaterButtonClick').onLaterButtonClick}
  />
);

export const timeAboveOneHourInNormalAndMobileState = () => (
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
            totalTime: 35,
            line: 'blue',
            transferTimeToNextLine: 10,
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
            totalTime: 35,
            line: 'red',
          },
        ] as SubRoute[],
        totalTime: 80,
      } as Route
    }
    originName="Station a"
    destinationName="Station d"
    dateAndTime={new Date('1993-03-15 09:30')}
    displayedRouteTimes={[
      new Date('1993-03-15 09:30'),
      new Date('1993-03-15 09:35'),
      new Date('1993-03-15 09:40'),
      new Date('1993-03-15 09:45'),
    ]}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
    onEarlierButtonClick={actions('onEarlierButtonClick').onEarlierButtonClick}
    onLaterButtonClick={actions('onLaterButtonClick').onLaterButtonClick}
  />
);
