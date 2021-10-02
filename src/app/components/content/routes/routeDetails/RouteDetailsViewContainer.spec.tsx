import React from 'react';
import { render, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RouteDetailsViewContainer from './RouteDetailsViewContainer';
import { ConnectedStation, Route, SubRoute } from '../../../domain';

describe('RouteDetailsViewContainer', () => {
  const testRoute = {
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
        direction: 'End Station Purple Line',
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
        direction: 'Start Station Blue Line',
      },
    ] as SubRoute[],
    totalTime: 11,
  } as Route;

  it('shows and hides intermediate stations list when clicking on intermediate stations button', () => {
    render(
      <RouteDetailsViewContainer
        route={testRoute}
        departureTime={new Date('1993-03-15 09:30')}
        onBackButtonClick={() => {}}
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

  it('calculates the correct start and end times of each block', () => {
    render(
      <RouteDetailsViewContainer
        route={testRoute}
        departureTime={new Date('1993-03-15 09:30')}
        onBackButtonClick={() => {}}
      />
    );

    const withinPurpleLine = within(
      screen.getByTitle('Content.Route.Lines.PURPLE')
    );

    const withinBlueLine = within(
      screen.getByTitle('Content.Route.Lines.BLUE')
    );

    expect(withinPurpleLine.getByText('09:30')).toBeVisible();
    expect(withinPurpleLine.getByText('09:36')).toBeVisible();

    expect(withinBlueLine.getByText('09:39')).toBeVisible();
    expect(withinBlueLine.getByText('09:41')).toBeVisible();
  });

  it('shows the correct line and start and end stations for each block', () => {
    render(
      <RouteDetailsViewContainer
        route={testRoute}
        departureTime={new Date('1993-03-15 09:30')}
        onBackButtonClick={() => {}}
      />
    );

    const withinPurpleLine = within(
      screen.getByTitle('Content.Route.Lines.PURPLE')
    );

    const withinBlueLine = within(
      screen.getByTitle('Content.Route.Lines.BLUE')
    );

    expect(
      withinPurpleLine.getByRole('img', { name: 'Content.Route.Lines.PURPLE' })
    ).toBeVisible();
    expect(withinPurpleLine.getByText('Origin Station')).toBeVisible();
    expect(
      withinPurpleLine.getByText('Content.RouteDetails.DIRECTION')
    ).toBeVisible();
    expect(withinPurpleLine.getByText('Intermediate Station')).toBeVisible();

    expect(
      withinBlueLine.getByRole('img', { name: 'Content.Route.Lines.BLUE' })
    ).toBeVisible();
    expect(withinBlueLine.getByText('Intermediate Station')).toBeVisible();
    expect(withinBlueLine.getByText('Destination Station')).toBeVisible();
  });

  it('shows transfer block correctly', () => {
    render(
      <RouteDetailsViewContainer
        route={testRoute}
        departureTime={new Date('1993-03-15 09:30')}
        onBackButtonClick={() => {}}
      />
    );

    const withinTransferBlock = within(
      screen.getByTitle('Content.RoutesOverview.TRANSFER')
    );

    expect(
      withinTransferBlock.getByRole('img', {
        name: 'Content.RoutesOverview.TRANSFER',
      })
    ).toBeVisible();
    expect(
      withinTransferBlock.getByText('Content.RouteDetails.TRANSFER_MESSAGE')
    ).toBeVisible();
  });
});
