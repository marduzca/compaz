import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import RoutesOverview from './RoutesOverview';
import {
  ConnectedStation,
  LineColor,
  Route,
  SubRoute,
} from '../../../../domain';

export default {
  title: 'NavigationPage / RoutesOverview',
  component: RoutesOverview,
} as Meta;

export const NormalAndMobileState = () => (
  <RoutesOverview
    route={
      {
        subRoutes: [
          {
            stationsPath: [
              {
                id: 'station_a',
                name: 'Station a',
                lines: [LineColor.GREEN],
                connectedStations: [
                  { id: 'station_b', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_b',
                name: 'Station b',
                lines: [LineColor.GREEN, LineColor.RED],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
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
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: [LineColor.RED],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: LineColor.RED,
          },
        ] as SubRoute[],
        totalTime: 6,
        price: 5,
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
    onRouteSelection={actions('onRouteSelection').onRouteSelection}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
    onEarlierButtonClick={actions('onEarlierButtonClick').onEarlierButtonClick}
    onLaterButtonClick={actions('onLaterButtonClick').onLaterButtonClick}
  />
);

export const TooLongConnectionInNormalAndMobileState = () => (
  <RoutesOverview
    route={
      {
        subRoutes: [
          {
            stationsPath: [
              {
                id: 'station_a',
                name: 'Station a',
                lines: [LineColor.BLUE],
                connectedStations: [
                  { id: 'station_b', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_b',
                name: 'Station b',
                lines: [LineColor.GREEN, LineColor.RED],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
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
                lines: [LineColor.BLUE, LineColor.RED],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: [LineColor.RED, LineColor.GREEN],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: LineColor.RED,
            transferTimeToNextLine: 2,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Station b',
                lines: [LineColor.GREEN, LineColor.RED],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: [LineColor.GREEN, LineColor.WHITE],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: LineColor.GREEN,
            transferTimeToNextLine: 4,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Station b',
                lines: [LineColor.WHITE, LineColor.GREEN],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: [LineColor.WHITE, LineColor.PURPLE],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: LineColor.WHITE,
            transferTimeToNextLine: 2,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Station b',
                lines: [LineColor.WHITE, LineColor.PURPLE],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: [LineColor.PURPLE],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: LineColor.PURPLE,
          },
        ] as SubRoute[],
        totalTime: 10,
        price: 11,
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
    onRouteSelection={actions('onRouteSelection').onRouteSelection}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
    onEarlierButtonClick={actions('onEarlierButtonClick').onEarlierButtonClick}
    onLaterButtonClick={actions('onLaterButtonClick').onLaterButtonClick}
  />
);

export const TimeAboveOneHourInNormalAndMobileState = () => (
  <RoutesOverview
    route={
      {
        subRoutes: [
          {
            stationsPath: [
              {
                id: 'station_a',
                name: 'Station a',
                lines: [LineColor.GREEN],
                connectedStations: [
                  { id: 'station_b', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_b',
                name: 'Station b',
                lines: [LineColor.GREEN, LineColor.RED],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 35,
            line: LineColor.BLUE,
            transferTimeToNextLine: 10,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Station b',
                lines: [LineColor.GREEN, LineColor.RED],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: [LineColor.RED],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 35,
            line: LineColor.RED,
          },
        ] as SubRoute[],
        totalTime: 80,
        price: 5,
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
    onRouteSelection={actions('onRouteSelection').onRouteSelection}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
    onEarlierButtonClick={actions('onEarlierButtonClick').onEarlierButtonClick}
    onLaterButtonClick={actions('onLaterButtonClick').onLaterButtonClick}
  />
);
