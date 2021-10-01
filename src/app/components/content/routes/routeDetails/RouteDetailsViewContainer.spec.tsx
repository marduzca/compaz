import React from 'react';
import { render, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RouteDetailsViewContainer from './RouteDetailsViewContainer';
import { ConnectedStation, SubRoute } from '../../../domain';

describe('RouteDetailsViewContainer', () => {
  it('shows and hides intermediate stations list when clicking on intermediate stations button', () => {
    render(
      <RouteDetailsViewContainer
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
      />
    );

    const withinPurpleLine = within(
      screen.getByTitle('Content.Route.Lines.PURPLE')
    );

    expect(withinPurpleLine.queryByText('A.5 Station')).toBeNull();

    userEvent.click(
      withinPurpleLine.getByRole('button', {
        name: 'Content.RouteDetails.INTERMEDIATE_STATIONS_OPEN_BUTTON_TITLE',
      })
    );

    expect(withinPurpleLine.getByText('A.5 Station')).toBeVisible();

    userEvent.click(
      withinPurpleLine.getByRole('button', {
        name: 'Content.RouteDetails.INTERMEDIATE_STATIONS_CLOSE_BUTTON_TITLE',
      })
    );

    expect(withinPurpleLine.queryByText('A.5 Station')).toBeNull();
  });
});
