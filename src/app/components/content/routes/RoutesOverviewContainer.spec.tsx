import React from 'react';
import { render, screen } from '@testing-library/react';
import RoutesOverviewContainer from './RoutesOverviewContainer';
import * as NavigationProvider from '../../providers/NavigationProvider';
import * as FirebaseProvider from '../../providers/FirebaseProvider';
import { ConnectedStation, Route, Station, SubRoute } from '../../domain';

describe('RoutesOverviewContainer', () => {
  const originStation = {
    id: 'origin_station',
    name: 'Origin station',
    lines: ['green'],
    connectedStations: [],
  } as Station;
  const destinationStation = {
    id: 'destination_station',
    name: 'Destination station',
    lines: ['green'],
    connectedStations: [],
  } as Station;

  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: [originStation, destinationStation],
    });

    useNavigationMock.mockReturnValue({
      origin: originStation,
      destination: destinationStation,
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 } as Route),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays origin and destination in the header', () => {
    render(<RoutesOverviewContainer onBackButtonClick={() => {}} />);

    expect(
      screen.getByRole('heading', {
        name: 'Origin station - Destination station',
      })
    ).toBeVisible();
  });

  it('displays the route with correct icons and total time', () => {
    const simpleRoute = {
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
          line: 'green',
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
            {
              id: 'station_d',
              name: 'Station d',
              lines: ['red'],
              connectedStations: [],
            },
          ],
          totalTime: 4,
          line: 'red',
        },
      ] as SubRoute[],
      totalTime: 6,
    } as Route;

    useNavigationMock.mockReturnValue({
      origin: originStation,
      destination: destinationStation,
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => simpleRoute,
    });

    render(<RoutesOverviewContainer onBackButtonClick={() => {}} />);

    expect(screen.getByText('6 min')).toBeVisible();
    expect(
      screen.getByRole('img', { name: 'Content.RoutesOverview.Lines.GREEN' })
    ).toBeVisible();
    expect(
      screen.getByRole('img', { name: 'Content.RoutesOverview.TRANSFER' })
    ).toBeVisible();
    expect(
      screen.getByRole('img', { name: 'Content.RoutesOverview.Lines.RED' })
    ).toBeVisible();
  });

  // Check date is properly shown
  // Check times are properly displayed
});
