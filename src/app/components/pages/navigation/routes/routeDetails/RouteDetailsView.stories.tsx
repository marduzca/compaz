import React from 'react';
import { Meta } from '@storybook/react-vite';
import { actions } from 'storybook/actions';
import RouteDetailsView from './RouteDetailsView';
import {
  ConnectedStation,
  LineColor,
  Route,
  SubRoute,
} from '../../../../domain';
import { MOBILE_VIEWPORT } from '../../../../../../../.storybook/preview';

export default {
  title: 'NavigationPage / RouteDetailsView',
  component: RouteDetailsView,
} satisfies Meta;

export const Basic = () => (
  <RouteDetailsView
    isMobile={false}
    route={
      {
        subRoutes: [
          {
            stationsPath: [
              {
                id: 'station_a',
                name: 'Origin Station',
                lines: [LineColor.PURPLE],
                connectedStations: [
                  { id: 'station_a_half', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_a_half',
                name: 'A.5 Station',
                lines: [LineColor.PURPLE],
                connectedStations: [
                  { id: 'station_b', timeTo: 4 } as ConnectedStation,
                ],
              },
              {
                id: 'station_b',
                name: 'Intermediate Station',
                lines: [LineColor.PURPLE, LineColor.BLUE],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 6,
            line: LineColor.PURPLE,
            direction: 'End Station Purple Line',
            transferTimeToNextLine: 3,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Intermediate Station',
                lines: [LineColor.BLUE, LineColor.PURPLE],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Destination Station',
                lines: [LineColor.BLUE],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: LineColor.BLUE,
            direction: 'Start Station Blue Line',
          },
        ] as SubRoute[],
        totalTime: 6,
        price: 5,
      } as Route
    }
    departureTime={new Date('1993-03-15 09:30')}
    linesWithOpenIntermediateStations={[LineColor.PURPLE]}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
    onIntermediateStationsButtonClick={
      actions('onIntermediateStationsButtonClick')
        .onIntermediateStationsButtonClick
    }
  />
);

export const BasicMobile = () => (
  <RouteDetailsView
    isMobile
    route={{
      subRoutes: [
        {
          stationsPath: [
            {
              id: 'station_a',
              name: 'Origin Station',
              lines: [LineColor.PURPLE],
              connectedStations: [
                { id: 'station_a_half', timeTo: 2 } as ConnectedStation,
              ],
            },
            {
              id: 'station_a_half',
              name: 'A.5 Station',
              lines: [LineColor.PURPLE],
              connectedStations: [
                { id: 'station_b', timeTo: 4 } as ConnectedStation,
              ],
            },
            {
              id: 'station_b',
              name: 'Intermediate Station',
              lines: [LineColor.PURPLE, LineColor.BLUE],
              connectedStations: [
                { id: 'station_c', timeTo: 2 } as ConnectedStation,
              ],
            },
          ],
          totalTime: 6,
          line: LineColor.PURPLE,
          direction: 'End Station Purple Line',
          transferTimeToNextLine: 3,
        },
        {
          stationsPath: [
            {
              id: 'station_b',
              name: 'Intermediate Station',
              lines: [LineColor.BLUE, LineColor.PURPLE],
              connectedStations: [
                { id: 'station_c', timeTo: 2 } as ConnectedStation,
              ],
            },
            {
              id: 'station_c',
              name: 'Destination Station',
              lines: [LineColor.BLUE],
              connectedStations: [
                { id: 'station_d', timeTo: 2 } as ConnectedStation,
              ],
            },
          ],
          totalTime: 2,
          line: LineColor.BLUE,
          direction: 'Start Station Blue Line',
        },
      ] as SubRoute[],
      totalTime: 6,
      price: 5,
    }}
    departureTime={new Date('1993-03-15 09:30')}
    linesWithOpenIntermediateStations={[LineColor.PURPLE]}
    onBackButtonClick={actions('onBackButtonClick').onBackButtonClick}
    onIntermediateStationsButtonClick={
      actions('onIntermediateStationsButtonClick')
        .onIntermediateStationsButtonClick
    }
  />
);
BasicMobile.story = {
  parameters: {
    chromatic: {
      viewports: [MOBILE_VIEWPORT],
    },
  },
};
