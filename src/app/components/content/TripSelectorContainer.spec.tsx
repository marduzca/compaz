import React from 'react';
import { render, screen } from '@testing-library/react';
import TripSelectorContainer from './TripSelectorContainer';
import * as FirebaseProvider from '../providers/FirebaseProvider';
import { Station } from '../providers/FirebaseProvider';

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

describe('TripSelectorContainer', () => {
  const useStationsMock = jest.spyOn(FirebaseProvider, 'useStations');

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders the stations in the dropdown when the locations load', async () => {
    useStationsMock.mockReturnValue({
      stations: [
        {
          id: 'some_station',
          name: 'Some station',
          lines: ['green'],
        },
        {
          id: 'another_station',
          name: 'Another station',
          lines: ['silver'],
        },
      ] as Station[],
    });

    render(<TripSelectorContainer />);

    expect(screen.getByText('Salida')).toBeVisible();
    expect(screen.getByText('Destino')).toBeVisible();
  });

  it('renders the loading text in the dropdown when the locations are being retrieved', () => {
    useStationsMock.mockReturnValue({
      stations: [] as Station[],
    });

    render(<TripSelectorContainer />);

    expect(screen.getByText('Loading...')).toBeVisible();
  });
});
