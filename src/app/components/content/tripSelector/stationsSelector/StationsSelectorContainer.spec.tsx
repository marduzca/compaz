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
    },
    {
      id: 'another_station',
      name: 'Another station',
      lines: ['silver'],
      connectedStations: [],
    },
  ] as Station[];

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: availableStations,
    });

    useNavigationMock.mockReturnValue({
      origin: {
        id: '',
        name: '',
        lines: [],
        connectedStations: [],
      },
      destination: {
        id: '',
        name: '',
        lines: [],
        connectedStations: [],
      },
      setOriginStation: () => {},
      setDestinationStation: () => {},
      generateStationsMap: () => {},
      findShortestPathFromOriginToDestination: () => [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('allows to select stations from the dropdown', () => {
    render(<StationsSelectorContainer />);

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
    render(<StationsSelectorContainer />);

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.ORIGIN_PLACEHOLDER',
      }),
      'This is a non-existent station'
    );

    expect(screen.getByText(/Content.TripSelector.ERROR/)).toBeVisible();
  });

  it("shows an error when the current destination input doesn't correspond to any list item", () => {
    render(<StationsSelectorContainer />);

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'Content.TripSelector.DESTINATION_PLACEHOLDER',
      }),
      'This is a non-existent station'
    );

    expect(screen.getByText(/Content.TripSelector.ERROR/)).toBeVisible();
  });

  it('removes the station from the destination when chosen already as origin', () => {
    useNavigationMock.mockReturnValue({
      origin: availableStations[0],
      destination: {
        id: '',
        name: '',
        lines: [],
        connectedStations: [],
      },
      setOriginStation: () => {},
      setDestinationStation: () => {},
      generateStationsMap: () => {},
      findShortestPathFromOriginToDestination: () => [],
    });

    render(<StationsSelectorContainer />);

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
    useNavigationMock.mockReturnValue({
      origin: {
        id: '',
        name: '',
        lines: [],
        connectedStations: [],
      },
      destination: availableStations[0],
      setOriginStation: () => {},
      setDestinationStation: () => {},
      generateStationsMap: () => {},
      findShortestPathFromOriginToDestination: () => [],
    });

    render(<StationsSelectorContainer />);

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
    render(<StationsSelectorContainer />);

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
});