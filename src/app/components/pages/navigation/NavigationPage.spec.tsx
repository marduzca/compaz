import React from 'react';
import { vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route as Path, Routes } from 'react-router-dom';
import NavigationPage from './NavigationPage';
import * as FirebaseProvider from '../../providers/firebase/FirebaseProvider';
import * as NavigationProvider from '../../providers/navigation/NavigationProvider';
import {
  ConnectedStation,
  LineColor,
  Route,
  Station,
  SubRoute,
} from '../../domain';
import { NavigationLink } from '../../organisms/menu/Menu';

describe('NavigationPage', () => {
  const useFirebaseMock = vi.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = vi.spyOn(NavigationProvider, 'useNavigation');

  const originStation = {
    id: 'origin_station',
    name: 'Origin station',
    lines: [LineColor.GREEN],
    connectedStations: [],
    geoLocation: { latitude: 0, longitude: 0 },
  } as Station;
  const destinationStation = {
    id: 'destination_station',
    name: 'Destination station',
    lines: [LineColor.GREEN],
    connectedStations: [],
    geoLocation: { latitude: 0, longitude: 0 },
  } as Station;
  const testRoute = {
    subRoutes: [
      {
        stationsPath: [
          {
            id: 'station_a',
            name: 'Origin Station',
            lines: [LineColor.PURPLE],
            connectedStations: [
              { id: 'station_a_half', timeTo: 2 } as ConnectedStation,
            ],
          },
          {
            id: 'station_a_half',
            name: 'A.5 Station',
            lines: [LineColor.PURPLE],
            connectedStations: [
              { id: 'station_b', timeTo: 4 } as ConnectedStation,
            ],
          },
          {
            id: 'station_b',
            name: 'Intermediate Station',
            lines: [LineColor.PURPLE, LineColor.BLUE],
            connectedStations: [
              { id: 'station_c', timeTo: 2 } as ConnectedStation,
            ],
          },
        ],
        totalTime: 6,
        line: LineColor.PURPLE,
        direction: 'End Station Purple Line',
        transferTimeToNextLine: 3,
      },
      {
        stationsPath: [
          {
            id: 'station_b',
            name: 'Intermediate Station',
            lines: [LineColor.BLUE, LineColor.PURPLE],
            connectedStations: [
              { id: 'station_c', timeTo: 2 } as ConnectedStation,
            ],
          },
          {
            id: 'station_c',
            name: 'Destination Station',
            lines: [LineColor.BLUE],
            connectedStations: [
              { id: 'station_d', timeTo: 2 } as ConnectedStation,
            ],
          },
        ],
        totalTime: 2,
        line: LineColor.BLUE,
        direction: 'Start Station Blue Line',
      },
    ] as SubRoute[],
    totalTime: 11,
    price: 5,
  } as Route;

  beforeAll(() => {
    // eslint-disable-next-line no-global-assign
    window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        replace: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: [originStation, destinationStation],
      lines: [{ id: LineColor.GREEN, stationsPath: [], connectedLines: [] }],
      storeMessage: async () => true,
    });

    useNavigationMock.mockReturnValue({
      origin: originStation,
      destination: destinationStation,
      departureTime: '17:30',
      departureDate: '2021-09-24',
      setNewDepartureTime: vi.fn(),
      setNewDepartureDate: vi.fn(),
      setOriginStation: vi.fn(),
      setDestinationStation: vi.fn(),
      generateStationsMap: vi.fn(),
      calculateRoute: () => testRoute,
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  const renderNavigationWithRouter = (
    initialLocation: string = NavigationLink.NAVIGATION
  ) => {
    render(
      <MemoryRouter
        initialEntries={initialLocation ? [initialLocation] : undefined}
      >
        <Routes>
          {[`${NavigationLink.BASE}/*`, `${NavigationLink.NAVIGATION}/*`].map(
            (path) => (
              <Path
                path={path}
                element={
                  <NavigationPage
                    onMenuButtonClick={() => {}}
                    isMobileMenuOpen={false}
                  />
                }
                key={path}
              />
            )
          )}
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders the loading page when stations data is not yet ready', () => {
    useFirebaseMock.mockReturnValue({
      stations: [],
      lines: [{ id: LineColor.GREEN, stationsPath: [], connectedLines: [] }],
      storeMessage: async () => true,
    });

    renderNavigationWithRouter();

    expect(
      screen.getByRole('img', {
        name: 'Loading...',
      })
    ).toBeVisible();
  });

  it('renders the loading page when lines data is not yet ready', () => {
    useFirebaseMock.mockReturnValue({
      stations: [originStation],
      lines: [],
      storeMessage: async () => true,
    });

    renderNavigationWithRouter();

    expect(
      screen.getByRole('img', {
        name: 'Loading...',
      })
    ).toBeVisible();
  });

  it('should redirect to the trip selector when we are in one of the other pages without route information', () => {
    useNavigationMock.mockReturnValue({
      origin: originStation,
      destination: destinationStation,
      departureTime: '17:30',
      departureDate: '2021-09-24',
      setNewDepartureTime: vi.fn(),
      setNewDepartureDate: vi.fn(),
      setOriginStation: vi.fn(),
      setDestinationStation: vi.fn(),
      generateStationsMap: vi.fn(),
      calculateRoute: () =>
        ({ subRoutes: [], totalTime: 0, price: 0 } as Route), // Route is not set
    });

    renderNavigationWithRouter(
      `${NavigationLink.NAVIGATION}${NavigationLink.ROUTES_OVERVIEW}`
    );

    expect(
      screen.getByRole('heading', { name: 'Navigation > Trip selector' })
    ).toBeVisible();
  });

  it('navigates to routes overview when clicking on search', async () => {
    renderNavigationWithRouter();

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Search',
      })
    );

    expect(
      screen.getByRole('heading', {
        name: `${originStation.name} - ${destinationStation.name}`,
      })
    ).toBeVisible();
  });

  it('navigates back to trip selection when clicking on routes overview back button', async () => {
    renderNavigationWithRouter();

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Search',
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Go back to Trip Selector page. Currently in Routes Overview page',
      })
    );

    expect(
      screen.getByRole('button', {
        name: 'Search',
      })
    ).toBeVisible();
  });

  it('navigates to route details when clicking on specific route in overview', async () => {
    renderNavigationWithRouter();

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Search',
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Route with times 17:30 - 17:41',
      })
    );

    const withinPurpleLine = within(
      screen.getByRole('listitem', { name: 'Purple line' })
    );

    const withinBlueLine = within(
      screen.getByRole('listitem', { name: 'Blue line' })
    );

    expect(
      withinPurpleLine.getByRole('img', {
        name: 'Purple line',
      })
    ).toBeVisible();
    expect(withinPurpleLine.getByText('Origin Station')).toBeVisible();
    expect(withinPurpleLine.getByText('Intermediate Station')).toBeVisible();

    expect(
      withinBlueLine.getByRole('img', { name: 'Blue line' })
    ).toBeVisible();
    expect(withinBlueLine.getByText('Intermediate Station')).toBeVisible();
    expect(withinBlueLine.getByText('Destination Station')).toBeVisible();
  });

  it('navigates back to routes overview when clicking on route details back button', async () => {
    renderNavigationWithRouter();

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Search',
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Route with times 17:30 - 17:41',
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Go back to Routes Overview page. Currently in Route Details page',
      })
    );

    expect(
      screen.getByRole('heading', {
        name: `${originStation.name} - ${destinationStation.name}`,
      })
    ).toBeVisible();
  });
});
