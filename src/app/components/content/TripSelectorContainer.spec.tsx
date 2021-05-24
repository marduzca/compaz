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

  it('renders the stations in the dropdown', () => {
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

    expect(screen.getByText('Some station')).toBeVisible();
    expect(screen.getByText('Another station')).toBeVisible();
  });
});
