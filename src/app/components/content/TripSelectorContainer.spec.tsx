import React from 'react';
import { render, screen } from '@testing-library/react';
import TripSelectorContainer from './TripSelectorContainer';
import { FirebaseContext, Station } from '../providers/FirebaseProvider';

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
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders the stations in the dropdown when the locations load', () => {
    const FirebaseProviderMock: React.ComponentType = ({ children }) => (
      <FirebaseContext.Provider
        value={{
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
        }}
      >
        {children}
      </FirebaseContext.Provider>
    );

    render(<TripSelectorContainer />, { wrapper: FirebaseProviderMock });

    expect(screen.getByText('Salida')).toBeVisible();
    expect(screen.getByText('Destino')).toBeVisible();
  });

  it('renders the loading text in the dropdown when the locations are being retrieved', () => {
    const FirebaseProviderMock: React.ComponentType = ({ children }) => (
      <FirebaseContext.Provider
        value={{
          stations: [] as Station[],
        }}
      >
        {children}
      </FirebaseContext.Provider>
    );

    render(<TripSelectorContainer />, { wrapper: FirebaseProviderMock });

    expect(screen.getByText('Loading...')).toBeVisible();
  });
});
