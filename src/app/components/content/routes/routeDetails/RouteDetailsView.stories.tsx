import React from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import RouteDetailsView from './RouteDetailsView';
import { ConnectedStation, SubRoute } from '../../../domain';

const guaranteedSize = (child: JSX.Element): JSX.Element => (
  <div
    style={{
      width: '400px',
      height: '700px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      borderRadius: '0.625rem',
      border: '2px solid black',
      padding: '1.25rem',
    }}
  >
    {child}
  </div>
);

export default {
  title: 'RouteDetailsView',
  component: RouteDetailsView,
} as Meta;

export const basicInNormalAndMobileState = () =>
  guaranteedSize(
    <RouteDetailsView
      route={{
        subRoutes: [
          {
            stationsPath: [
              {
                id: 'station_a',
                name: 'Origin Station',
                lines: ['purple'],
                connectedStations: [
                  { id: 'station_a_half', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_a_half',
                name: 'A.5 Station',
                lines: ['purple'],
                connectedStations: [
                  { id: 'station_b', timeTo: 4 } as ConnectedStation,
                ],
              },
              {
                id: 'station_b',
                name: 'Intermediate Station',
                lines: ['purple', 'blue'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 6,
            line: 'purple',
            transferTimeToNextLine: 3,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Intermediate Station',
                lines: ['blue', 'purple'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Destination Station',
                lines: ['blue'],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 2,
            line: 'blue',
          },
        ] as SubRoute[],
        totalTime: 6,
      }}
      departureTime={new Date('1993-03-15 09:30')}
      linesWithOpenIntermediateStations={['purple']}
      onIntermediateStationsButtonClick={
        actions('onIntermediateStationsButtonClick')
          .onIntermediateStationsButtonClick
      }
    />
  );
