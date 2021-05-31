import React from 'react';
import { fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  describe('when stations have been loaded', () => {
    it('renders the stations dropdowns when the stations load', () => {
      useStationsMock.mockReturnValue({
        stations: [
          {
            id: 'some_station',
            name: 'Some station',
            lines: ['green'],
          },
        ] as Station[],
      });

      render(<TripSelectorContainer />);

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
    });

    it('allows to select stations from the dropdown', () => {
      const availableStations = [
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
      ] as Station[];
      useStationsMock.mockReturnValue({
        stations: availableStations,
      });

      render(<TripSelectorContainer />);

      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[0].id },
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[1].id },
        }
      );

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        })
      ).toHaveValue(availableStations[0].id);
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        })
      ).toHaveValue(availableStations[1].id);
    });
  });

  it('renders the loading text when the stations are being retrieved', () => {
    useStationsMock.mockReturnValue({
      stations: [] as Station[],
    });

    render(<TripSelectorContainer />);

    expect(screen.getByText('Loading...')).toBeVisible();
  });
});
