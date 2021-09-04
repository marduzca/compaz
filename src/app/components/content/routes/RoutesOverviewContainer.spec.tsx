import React from 'react';
import { render, screen } from '@testing-library/react';
import RoutesOverviewContainer from './RoutesOverviewContainer';
import * as NavigationProvider from '../../providers/NavigationProvider';
import * as FirebaseProvider from '../../providers/FirebaseProvider';
import { Route, Station } from '../../domain';

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

  it('displays origin and destination in the header', () => {
    const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');
    const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

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

    render(<RoutesOverviewContainer onBackButtonClick={() => {}} />);

    expect(
      screen.getByRole('heading', {
        name: 'Origin station - Destination station',
      })
    ).toBeVisible();
  });
});
