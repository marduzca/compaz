import React from 'react';
import { render, screen } from '@testing-library/react';
import TripSelectorContainer from './TripSelectorContainer';
import * as FirebaseProvider from '../../providers/FirebaseProvider';
import { Station } from '../../providers/FirebaseProvider';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when stations have been loaded', () => {
    it('renders the trip selector content', () => {
      useStationsMock.mockReturnValue({
        stations: [
          {
            id: 'some_station',
            name: 'Some station',
            lines: ['green'],
          },
        ],
      });

      render(<TripSelectorContainer onMenuButtonClick={() => {}} />);

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        })
      ).toBeVisible();
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        })
      ).toBeVisible();
      expect(
        screen.getByRole('button', {
          name: 'trigger-search',
        })
      ).toBeVisible();
    });
  });

  it('renders the loading text when the stations are being retrieved', () => {
    useStationsMock.mockReturnValue({
      stations: [] as Station[],
    });

    render(<TripSelectorContainer onMenuButtonClick={() => {}} />);

    expect(screen.getByText('Loading..')).toBeVisible();
  });
});
