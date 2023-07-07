import React from 'react';
import { vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StationsSelectorContainer from './StationsSelectorContainer';
import { LineColor, Route, Station } from '../../../../../domain';
import * as NavigationProvider from '../../../../../providers/navigation/NavigationProvider';
import * as FirebaseProvider from '../../../../../providers/firebase/FirebaseProvider';

describe('StationsSelectorContainer', () => {
  const useFirebaseMock = vi.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = vi.spyOn(NavigationProvider, 'useNavigation');

  const availableStations = [
    {
      id: 'some_station',
      name: 'Some station',
      lines: [LineColor.GREEN],
      connectedStations: [],
      geoLocation: { latitude: 0, longitude: 0 },
    },
    {
      id: 'another_station',
      name: 'Another station',
      lines: [LineColor.SILVER],
      connectedStations: [],
      geoLocation: { latitude: 0, longitude: 0 },
    },
  ] as Station[];

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: availableStations,
      lines: [],
      storeMessage: async () => true,
    });

    useNavigationMock.mockReturnValue({
      origin: undefined,
      destination: undefined,
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: vi.fn(),
      setNewDepartureDate: vi.fn(),
      setOriginStation: vi.fn(),
      setDestinationStation: vi.fn(),
      generateStationsMap: vi.fn(),
      calculateRoute: () =>
        ({ subRoutes: [], totalTime: 0, price: 0 }) as Route,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('clears station input when clicking on the clear button', async () => {
    render(
      <StationsSelectorContainer
        showOriginSubmissionError={false}
        showDestinationSubmissionError={false}
        setShowOriginSubmissionError={() => {}}
        setShowDestinationSubmissionError={() => {}}
      />,
    );

    await act(async () => {
      await userEvent.type(
        screen.getByRole('combobox', {
          name: 'Origin',
        }),
        availableStations[0].name,
      );
    });

    expect(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
    ).toHaveValue(availableStations[0].name);

    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: 'Clear text',
        }),
      );
    });

    expect(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
    ).toHaveValue('');

    await act(async () => {
      await userEvent.type(
        screen.getByRole('combobox', {
          name: 'Destination',
        }),
        availableStations[1].name,
      );
    });

    expect(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
    ).toHaveValue(availableStations[1].name);

    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: 'Clear text',
        }),
      );
    });

    expect(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
    ).toHaveValue('');
  });

  it('allows to select stations from the dropdown', () => {
    render(
      <StationsSelectorContainer
        showOriginSubmissionError={false}
        showDestinationSubmissionError={false}
        setShowOriginSubmissionError={() => {}}
        setShowDestinationSubmissionError={() => {}}
      />,
    );

    fireEvent.change(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
      {
        target: { value: availableStations[0].name },
      },
    );
    fireEvent.change(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
      {
        target: { value: availableStations[1].name },
      },
    );

    expect(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
    ).toHaveValue(availableStations[0].name);
    expect(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
    ).toHaveValue(availableStations[1].name);
  });

  it('removes the station from the destination when chosen already as origin', () => {
    useNavigationMock.mockReturnValue({
      origin: availableStations[0],
      destination: undefined,
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: vi.fn(),
      setNewDepartureDate: vi.fn(),
      setOriginStation: vi.fn(),
      setDestinationStation: vi.fn(),
      generateStationsMap: vi.fn(),
      calculateRoute: () =>
        ({ subRoutes: [], totalTime: 0, price: 0 }) as Route,
    });

    render(
      <StationsSelectorContainer
        showOriginSubmissionError={false}
        showDestinationSubmissionError={false}
        setShowOriginSubmissionError={() => {}}
        setShowDestinationSubmissionError={() => {}}
      />,
    );

    fireEvent.change(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
      {
        target: { value: availableStations[0].name },
      },
    );

    expect(
      screen.getByText('Destination - Non-existent station'),
    ).toBeVisible();
  });

  it('removes the station from the origin when chosen already as destination', () => {
    useNavigationMock.mockReturnValue({
      origin: undefined,
      destination: availableStations[0],
      departureTime: '10:24',
      departureDate: '2021-12-25',
      setNewDepartureTime: vi.fn(),
      setNewDepartureDate: vi.fn(),
      setOriginStation: vi.fn(),
      setDestinationStation: vi.fn(),
      generateStationsMap: vi.fn(),
      calculateRoute: () =>
        ({ subRoutes: [], totalTime: 0, price: 0 }) as Route,
    });

    render(
      <StationsSelectorContainer
        showOriginSubmissionError={false}
        showDestinationSubmissionError={false}
        setShowOriginSubmissionError={() => {}}
        setShowDestinationSubmissionError={() => {}}
      />,
    );

    fireEvent.change(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
      {
        target: { value: availableStations[0].name },
      },
    );

    expect(screen.getByText('Origin - Non-existent station')).toBeVisible();
  });

  it('switches origin and destination content when clicking on switcher button', async () => {
    render(
      <StationsSelectorContainer
        showOriginSubmissionError={false}
        showDestinationSubmissionError={false}
        setShowOriginSubmissionError={() => {}}
        setShowDestinationSubmissionError={() => {}}
      />,
    );

    fireEvent.change(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
      {
        target: { value: availableStations[0].name },
      },
    );
    fireEvent.change(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
      {
        target: { value: availableStations[1].name },
      },
    );

    await act(async () => {
      await userEvent.click(
        screen.getByRole('button', {
          name: 'Switch stations',
        }),
      );
    });

    expect(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
    ).toHaveValue(availableStations[1].name);
    expect(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
    ).toHaveValue(availableStations[0].name);
  });

  describe('errors', () => {
    it("shows validation error when the current origin input doesn't correspond to any list item", async () => {
      render(
        <StationsSelectorContainer
          showOriginSubmissionError={false}
          showDestinationSubmissionError={false}
          setShowOriginSubmissionError={() => {}}
          setShowDestinationSubmissionError={() => {}}
        />,
      );

      await act(async () => {
        await userEvent.type(
          screen.getByRole('combobox', {
            name: 'Origin',
          }),
          'This is a non-existent station',
        );
      });

      expect(
        screen.getByRole('combobox', {
          name: 'Origin - Non-existent station',
        }),
      ).toBeVisible();
    });

    it("shows validation error when the current destination input doesn't correspond to any list item", async () => {
      render(
        <StationsSelectorContainer
          showOriginSubmissionError={false}
          showDestinationSubmissionError={false}
          setShowOriginSubmissionError={() => {}}
          setShowDestinationSubmissionError={() => {}}
        />,
      );

      await act(async () => {
        await userEvent.type(
          screen.getByRole('combobox', {
            name: 'Destination',
          }),
          'This is a non-existent station',
        );
      });

      expect(screen.getByText(/Non-existent station/)).toBeVisible();
    });
  });
});
