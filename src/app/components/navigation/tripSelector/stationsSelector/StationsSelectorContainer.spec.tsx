import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StationsSelectorContainer from './StationsSelectorContainer';
import { Station } from '../../../domain';
import * as NavigationProvider from '../../../providers/NavigationProvider';
import * as FirebaseProvider from '../../../providers/FirebaseProvider';

describe('StationsSelectorContainer', () => {
  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

  const availableStations = [
    {
      id: 'some_station',
      name: 'Some station',
      lines: ['green'],
      connectedStations: [],
      geoLocation: { latitude: 0, longitude: 0 },
    },
    {
      id: 'another_station',
      name: 'Another station',
      lines: ['silver'],
      connectedStations: [],
      geoLocation: { latitude: 0, longitude: 0 },
    },
  ] as Station[];

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: availableStations,
      lines: [],
      storeMessage: () => true,
    });

    useNavigationMock.mockReturnValue({
      origin: undefined,
      destination: undefined,
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: jest.fn(),
      setNewDepartureDate: jest.fn(),
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('clears station input when clicking on the clear button', () => {
    render(
      <StationsSelectorContainer
        showOriginMissingError={false}
        showDestinationMissingError={false}
      />
    );

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      }),
      availableStations[0].name
    );

    expect(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      })
    ).toHaveValue(availableStations[0].name);

    userEvent.click(
      screen.getByRole('button', { name: 'Content.TripSelector.CLEAR_INPUT' })
    );

    expect(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      })
    ).toHaveValue('');

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      }),
      availableStations[1].name
    );

    expect(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      })
    ).toHaveValue(availableStations[1].name);

    userEvent.click(
      screen.getByRole('button', { name: 'Content.TripSelector.CLEAR_INPUT' })
    );

    expect(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      })
    ).toHaveValue('');
  });

  it('allows to select stations from the dropdown', () => {
    render(
      <StationsSelectorContainer
        showOriginMissingError={false}
        showDestinationMissingError={false}
      />
    );

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

  it('removes the station from the destination when chosen already as origin', () => {
    useNavigationMock.mockReturnValue({
      origin: availableStations[0],
      destination: undefined,
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: jest.fn(),
      setNewDepartureDate: jest.fn(),
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
    });

    render(
      <StationsSelectorContainer
        showOriginMissingError={false}
        showDestinationMissingError={false}
      />
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
        'Content.TripSelector.DESTINATION_PLACEHOLDER - Content.TripSelector.ERROR_VALIDATION'
      )
    ).toBeVisible();
  });

  it('removes the station from the origin when chosen already as destination', () => {
    useNavigationMock.mockReturnValue({
      origin: undefined,
      destination: availableStations[0],
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: jest.fn(),
      setNewDepartureDate: jest.fn(),
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
    });

    render(
      <StationsSelectorContainer
        showOriginMissingError={false}
        showDestinationMissingError={false}
      />
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
        'Content.TripSelector.ORIGIN_PLACEHOLDER - Content.TripSelector.ERROR_VALIDATION'
      )
    ).toBeVisible();
  });

  it('switches origin and destination content when clicking on switcher button', () => {
    render(
      <StationsSelectorContainer
        showOriginMissingError={false}
        showDestinationMissingError={false}
      />
    );

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
      screen.getByRole('button', {
        name: 'Content.TripSelector.STATIONS_SWITCHER',
      })
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

  describe('errors', () => {
    it("shows validation error when the current origin input doesn't correspond to any list item", () => {
      render(
        <StationsSelectorContainer
          showOriginMissingError={false}
          showDestinationMissingError={false}
        />
      );

      userEvent.type(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
        }),
        'This is a non-existent station'
      );

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER - Content.TripSelector.ERROR_VALIDATION',
        })
      ).toBeVisible();
    });

    it("shows validation error when the current destination input doesn't correspond to any list item", () => {
      render(
        <StationsSelectorContainer
          showOriginMissingError={false}
          showDestinationMissingError={false}
        />
      );

      userEvent.type(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
        }),
        'This is a non-existent station'
      );

      expect(screen.getByText(/Content.TripSelector.ERROR/)).toBeVisible();
    });

    it('shows validation error only when missing error is also set', () => {
      render(
        <StationsSelectorContainer
          showOriginMissingError
          showDestinationMissingError
        />
      );

      userEvent.type(
        screen.getByRole('textbox', {
          name: /Content.TripSelector.ORIGIN_PLACEHOLDER/,
        }),
        'This is a non-existent station'
      );

      userEvent.type(
        screen.getByRole('textbox', {
          name: /Content.TripSelector.DESTINATION_PLACEHOLDER/,
        }),
        'This is a non-existent station'
      );

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER - Content.TripSelector.ERROR_VALIDATION',
        })
      ).toBeVisible();

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER - Content.TripSelector.ERROR_VALIDATION',
        })
      ).toBeVisible();
    });

    it('show missing error only when input is empty', () => {
      render(
        <StationsSelectorContainer
          showOriginMissingError
          showDestinationMissingError
        />
      );

      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER Content.TripSelector.ERROR_ORIGIN_MISSING',
        })
      ).toBeVisible();
      expect(
        screen.getByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER Content.TripSelector.ERROR_DESTINATION_MISSING',
        })
      ).toBeVisible();

      userEvent.type(
        screen.getByRole('textbox', {
          name: /Content.TripSelector.ORIGIN_PLACEHOLDER/,
        }),
        availableStations[0].name
      );

      userEvent.type(
        screen.getByRole('textbox', {
          name: /Content.TripSelector.DESTINATION_PLACEHOLDER/,
        }),
        availableStations[1].name
      );

      expect(
        screen.queryByRole('textbox', {
          name: 'Content.TripSelector.ORIGIN_PLACEHOLDER Content.TripSelector.ERROR_ORIGIN_MISSING',
        })
      ).toBeNull();
      expect(
        screen.queryByRole('textbox', {
          name: 'Content.TripSelector.DESTINATION_PLACEHOLDER Content.TripSelector.ERROR_DESTINATION_MISSING',
        })
      ).toBeNull();
    });
  });
});