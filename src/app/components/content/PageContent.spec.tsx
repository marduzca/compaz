import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageContent from './PageContent';
import * as FirebaseProvider from '../providers/FirebaseProvider';
import * as NavigationProvider from '../providers/NavigationProvider';
import { Station } from '../domain';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  firestore: () => ({
    enablePersistence: jest.fn(() => Promise.resolve()),
    collection: jest.fn(() => ({
      where: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
  }),
}));

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
    });

    useNavigationMock.mockReturnValue({
      origin: originStation,
      destination: destinationStation,
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      findShortestPathFromOriginToDestination: () => [
        originStation.id,
        destinationStation.id,
      ],
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
        name: `${originStation.id} - ${destinationStation.id}`,
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
