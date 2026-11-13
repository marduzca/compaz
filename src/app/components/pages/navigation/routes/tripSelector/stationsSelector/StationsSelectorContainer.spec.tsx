import { vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StationsSelectorContainer from './StationsSelectorContainer';
import { Line, LineColor, Route, Station } from '../../../../../domain';
import * as NavigationProvider from '../../../../../providers/navigation/NavigationProvider';
import * as FirebaseProvider from '../../../../../providers/firebase/FirebaseProvider';
import { REPLACE_INPUTS_WITH_MUI } from '../../../../../../featureFlag/FeatureFlag';

describe('StationsSelectorContainer', () => {
  const useFirebaseMock = vi.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = vi.spyOn(NavigationProvider, 'useNavigation');

  const availableStations: [Station, Station, Station, ...Station[]] = [
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
    {
      id: 'yet_another_station',
      name: 'Yet another station',
      lines: [LineColor.SILVER],
      connectedStations: [],
      geoLocation: { latitude: 0, longitude: 0 },
    },
  ];

  const availableLines: Line[] = [
    {
      id: LineColor.GREEN,
      stationsPath: [availableStations[0].id],
      connectedLines: [],
    },
    {
      id: LineColor.SILVER,
      stationsPath: [availableStations[1].id, availableStations[2].id],
      connectedLines: [],
    },
  ];

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: availableStations,
      lines: availableLines,
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

    await userEvent.type(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
      availableStations[0].name,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
    ).toHaveValue(availableStations[0].name);

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Clear text',
      }),
    );

    expect(
      screen.getByRole('combobox', {
        name: 'Origin',
      }),
    ).toHaveValue('');

    await userEvent.type(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
      availableStations[1].name,
    );

    expect(
      screen.getByRole('combobox', {
        name: 'Destination',
      }),
    ).toHaveValue(availableStations[1].name);

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Clear text',
      }),
    );

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

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Switch stations',
      }),
    );

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

      await userEvent.type(
        screen.getByRole('combobox', {
          name: 'Origin',
        }),
        'This is a non-existent station',
      );

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

      await userEvent.type(
        screen.getByRole('combobox', {
          name: 'Destination',
        }),
        'This is a non-existent station',
      );

      expect(screen.getByText(/Non-existent station/)).toBeVisible();
    });
  });

  describe('With Mui select components', () => {
    const renderContainer = (
      props: Partial<
        React.ComponentProps<typeof StationsSelectorContainer>
      > = {},
    ) =>
      render(
        <StationsSelectorContainer
          showOriginSubmissionError={false}
          showDestinationSubmissionError={false}
          setShowOriginSubmissionError={() => {}}
          setShowDestinationSubmissionError={() => {}}
          {...props}
        />,
      );

    const mockNavigation = (
      overrides: Partial<ReturnType<typeof NavigationProvider.useNavigation>>,
    ) =>
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
        ...overrides,
      });

    beforeEach(() => {
      localStorage.setItem(REPLACE_INPUTS_WITH_MUI, 'true');
    });

    afterAll(() => {
      localStorage.removeItem(REPLACE_INPUTS_WITH_MUI);
    });

    it('SHOULD list stations grouped by line WHEN opening the dropdown', async () => {
      renderContainer();

      await userEvent.click(screen.getByRole('combobox', { name: 'Origin' }));

      expect(
        screen.getByRole('group', { name: 'Green line' }),
      ).toBeInTheDocument();
      expect(
        within(screen.getByRole('group', { name: 'Silver line' })).getAllByRole(
          'option',
        ),
      ).toHaveLength(2);
    });

    it('SHOULD list a transfer station under every line serving it', async () => {
      const transferStation: Station = {
        ...availableStations[0],
        lines: [LineColor.GREEN, LineColor.SILVER],
      };
      useFirebaseMock.mockReturnValue({
        stations: [transferStation, availableStations[1]],
        lines: [
          { ...availableLines[0]!, stationsPath: [transferStation.id] },
          {
            ...availableLines[1]!,
            stationsPath: [availableStations[1].id, transferStation.id],
          },
        ],
        storeMessage: async () => true,
      });
      renderContainer();

      await userEvent.click(screen.getByRole('combobox', { name: 'Origin' }));

      expect(
        screen.getAllByRole('option', { name: transferStation.name }),
      ).toHaveLength(2);
    });

    it('SHOULD select the same station WHEN choosing it under any line', async () => {
      const setOriginStation = vi.fn();
      const transferStation: Station = {
        ...availableStations[0],
        lines: [LineColor.GREEN, LineColor.SILVER],
      };
      mockNavigation({ setOriginStation });
      useFirebaseMock.mockReturnValue({
        stations: [transferStation],
        lines: [
          { ...availableLines[0]!, stationsPath: [transferStation.id] },
          { ...availableLines[1]!, stationsPath: [transferStation.id] },
        ],
        storeMessage: async () => true,
      });
      renderContainer();

      await userEvent.click(screen.getByRole('combobox', { name: 'Origin' }));
      await userEvent.click(
        within(screen.getByRole('group', { name: 'Silver line' })).getByRole(
          'option',
        ),
      );

      expect(setOriginStation).toHaveBeenCalledWith(transferStation);
      expect(screen.getByRole('combobox', { name: 'Origin' })).toHaveValue(
        transferStation.name,
      );
    });

    it('allows to select stations from the dropdown', async () => {
      renderContainer();

      await userEvent.click(screen.getByRole('combobox', { name: 'Origin' }));
      await userEvent.click(
        screen.getByRole('option', { name: availableStations[0].name }),
      );
      await userEvent.click(
        screen.getByRole('combobox', { name: 'Destination' }),
      );
      await userEvent.click(
        screen.getByRole('option', { name: availableStations[1].name }),
      );

      expect(screen.getByRole('combobox', { name: 'Origin' })).toHaveValue(
        availableStations[0].name,
      );
      expect(screen.getByRole('combobox', { name: 'Destination' })).toHaveValue(
        availableStations[1].name,
      );
    });

    it('removes the station from the destination when chosen already as origin', async () => {
      mockNavigation({ origin: availableStations[0] });
      renderContainer();

      await userEvent.click(
        screen.getByRole('combobox', { name: 'Destination' }),
      );

      expect(
        screen.queryByRole('option', { name: availableStations[0].name }),
      ).not.toBeInTheDocument();
    });

    it('removes the station from the origin when chosen already as destination', async () => {
      mockNavigation({ destination: availableStations[0] });
      renderContainer();

      await userEvent.click(screen.getByRole('combobox', { name: 'Origin' }));

      expect(
        screen.queryByRole('option', { name: availableStations[0].name }),
      ).not.toBeInTheDocument();
    });

    it('SHOULD show restored stations as selected', () => {
      mockNavigation({
        origin: availableStations[0],
        destination: availableStations[1],
      });
      renderContainer();

      expect(screen.getByRole('combobox', { name: 'Origin' })).toHaveValue(
        availableStations[0].name,
      );
      expect(screen.getByRole('combobox', { name: 'Destination' })).toHaveValue(
        availableStations[1].name,
      );
    });

    it('switches origin and destination content when clicking on switcher button', async () => {
      mockNavigation({
        origin: availableStations[0],
        destination: availableStations[1],
      });
      renderContainer();

      await userEvent.click(
        screen.getByRole('button', { name: 'Switch stations' }),
      );

      expect(screen.getByRole('combobox', { name: 'Origin' })).toHaveValue(
        availableStations[1].name,
      );
      expect(screen.getByRole('combobox', { name: 'Destination' })).toHaveValue(
        availableStations[0].name,
      );
    });

    it('clears station input when clicking on the clear button', async () => {
      const setOriginStation = vi.fn();
      mockNavigation({ origin: availableStations[0], setOriginStation });
      renderContainer();

      await userEvent.click(screen.getByLabelText('Clear text'));

      expect(screen.getByRole('combobox', { name: 'Origin' })).toHaveValue('');
      expect(setOriginStation).toHaveBeenCalledWith(undefined);
    });

    it('SHOULD show the validation message WHEN there is a submission error', () => {
      renderContainer({ showDestinationSubmissionError: true });

      expect(screen.getByText('Non-existent station')).toBeVisible();
    });
  });
});
