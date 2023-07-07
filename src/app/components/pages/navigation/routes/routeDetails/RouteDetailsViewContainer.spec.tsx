import React from 'react';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RouteDetailsViewContainer from './RouteDetailsViewContainer';
import {
  ConnectedStation,
  LineColor,
  Route,
  SubRoute,
} from '../../../../domain';

describe('RouteDetailsViewContainer', () => {
  const testRoute = {
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
    totalTime: 11,
    price: 5,
  } as Route;

  it('shows and hides intermediate stations list when clicking on intermediate stations button', async () => {
    render(
      <RouteDetailsViewContainer
        route={testRoute}
        departureTime={new Date('1993-03-15 09:30')}
        onBackButtonClick={() => {}}
      />,
    );

    const withinPurpleLine = within(
      screen.getByRole('listitem', { name: 'Purple line' }),
    );

    expect(withinPurpleLine.queryByText('A.5 Station')).not.toBeInTheDocument();

    await act(async () => {
      await userEvent.click(
        withinPurpleLine.getByRole('button', {
          name: 'Show intermediate stations',
        }),
      );
    });

    expect(withinPurpleLine.getByText('A.5 Station')).toBeVisible();

    await act(async () => {
      await userEvent.click(
        withinPurpleLine.getByRole('button', {
          name: 'Hide intermediate stations',
        }),
      );
    });

    expect(withinPurpleLine.queryByText('A.5 Station')).not.toBeInTheDocument();
  });

  it('calculates the correct start and end times of each block', () => {
    render(
      <RouteDetailsViewContainer
        route={testRoute}
        departureTime={new Date('1993-03-15 09:30')}
        onBackButtonClick={() => {}}
      />,
    );

    const withinPurpleLine = within(
      screen.getByRole('listitem', { name: 'Purple line' }),
    );

    const withinBlueLine = within(
      screen.getByRole('listitem', { name: 'Blue line' }),
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
      />,
    );

    const withinPurpleLine = within(
      screen.getByRole('listitem', { name: 'Purple line' }),
    );

    const withinBlueLine = within(
      screen.getByRole('listitem', { name: 'Blue line' }),
    );

    expect(
      withinPurpleLine.getByRole('img', {
        name: 'Purple line',
      }),
    ).toBeVisible();
    expect(withinPurpleLine.getByText('Origin Station')).toBeVisible();
    expect(
      withinPurpleLine.getByText('Direction: End Station Purple Line'),
    ).toBeVisible();
    expect(withinPurpleLine.getByText('Intermediate Station')).toBeVisible();

    expect(
      withinBlueLine.getByRole('img', { name: 'Blue line' }),
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
      />,
    );

    const withinTransferBlock = within(screen.getByTitle('Transfer'));

    expect(
      withinTransferBlock.getByRole('img', {
        name: 'Transfer',
      }),
    ).toBeVisible();
    expect(
      withinTransferBlock.getByText('Transfer line (3 min)'),
    ).toBeVisible();
  });
});
