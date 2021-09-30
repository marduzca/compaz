import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageContent from './PageContent';
import * as FirebaseProvider from '../providers/FirebaseProvider';
import * as NavigationProvider from '../providers/NavigationProvider';
import { Route, Station } from '../domain';

describe('PageContent', () => {
  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

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

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: [originStation, destinationStation],
      lines: [],
    });

    useNavigationMock.mockReturnValue({
      origin: originStation,
      destination: destinationStation,
      departureTime: '17:30',
      departureDate: new Date('2021-09-24'),
      setNewDepartureTime: jest.fn(),
      setNewDepartureDate: jest.fn(),
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 } as Route),
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('navigates to routes overview when clicking on search', () => {
    render(<PageContent onMenuButtonClick={() => {}} />);

    userEvent.click(
      screen.getByRole('button', { name: 'Content.TripSelector.SEARCH_BUTTON' })
    );

    expect(
      screen.getByRole('heading', {
        name: `${originStation.name} - ${destinationStation.name}`,
      })
    ).toBeVisible();
  });

  it('navigates back to trip selection when clicking on search', () => {
    render(<PageContent onMenuButtonClick={() => {}} />);

    userEvent.click(
      screen.getByRole('button', { name: 'Content.TripSelector.SEARCH_BUTTON' })
    );

    userEvent.click(screen.getByRole('button', { name: 'GO_BACK_BUTTON' }));

    expect(
      screen.getByRole('button', { name: 'Content.TripSelector.SEARCH_BUTTON' })
    ).toBeVisible();
  });
});
