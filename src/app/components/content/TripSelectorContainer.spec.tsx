import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when stations have been loaded', () => {
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

    it('renders the stations dropdowns when the stations load', () => {
      useStationsMock.mockReturnValue({
        stations: availableStations,
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
      useStationsMock.mockReturnValue({
        stations: availableStations,
      });

      render(<TripSelectorContainer />);

      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[0].name },
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[1].name },
        }
      );

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        })
      ).toHaveValue(availableStations[0].name);
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        })
      ).toHaveValue(availableStations[1].name);
    });

    it("shows an error when the current origin input doesn't correspond to any list item", () => {
      useStationsMock.mockReturnValue({
        stations: availableStations,
      });

      render(<TripSelectorContainer />);

      userEvent.type(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        }),
        'This is a non-existent station'
      );

      expect(screen.getByText(/Content.TripSelector.ERROR/)).toBeVisible();
    });

    it("shows an error when the current destination input doesn't correspond to any list item", () => {
      useStationsMock.mockReturnValue({
        stations: availableStations,
      });

      render(<TripSelectorContainer />);

      userEvent.type(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        }),
        'This is a non-existent station'
      );

      expect(screen.getByText(/Content.TripSelector.ERROR/)).toBeVisible();
    });

    it('removes the station from the destination when chosen already as origin', () => {
      useStationsMock.mockReturnValue({
        stations: availableStations,
      });

      render(<TripSelectorContainer />);

      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[0].name },
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[0].name },
        }
      );

      expect(
        screen.getByText(
          'Content.TripSelector.DESTINATION_PLACEHOLDER - Content.TripSelector.ERROR'
        )
      ).toBeVisible();
    });

    it('removes the station from the origin when chosen already as destination', () => {
      useStationsMock.mockReturnValue({
        stations: availableStations,
      });

      render(<TripSelectorContainer />);

      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[0].name },
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[0].name },
        }
      );

      expect(
        screen.getByText(
          'Content.TripSelector.ORIGIN_PLACEHOLDER - Content.TripSelector.ERROR'
        )
      ).toBeVisible();
    });

    it('switches origin and destination content when clicking on switcher button', () => {
      useStationsMock.mockReturnValue({
        stations: availableStations,
      });

      render(<TripSelectorContainer />);

      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[0].name },
        }
      );
      fireEvent.change(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        }),
        {
          target: { value: availableStations[1].name },
        }
      );

      userEvent.click(
        screen.getByRole('button', { name: 'stations-switcher' })
      );

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        })
      ).toHaveValue(availableStations[1].name);
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        })
      ).toHaveValue(availableStations[0].name);
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
