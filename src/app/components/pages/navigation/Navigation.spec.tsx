import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from './Navigation';
import * as FirebaseProvider from '../../providers/firebase/FirebaseProvider';
import * as NavigationProvider from '../../providers/navigation/NavigationProvider';
import { ConnectedStation, Route, Station, SubRoute } from '../../domain';

describe('Navigation', () => {
  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

  const originStation = {
    id: 'origin_station',
    name: 'Origin station',
    lines: ['green'],
    connectedStations: [],
    geoLocation: { latitude: 0, longitude: 0 },
  } as Station;
  const destinationStation = {
    id: 'destination_station',
    name: 'Destination station',
    lines: ['green'],
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
            lines: ['purple'],
            connectedStations: [
              { id: 'station_a_half', timeTo: 2 } as ConnectedStation,
            ],
          },
          {
            id: 'station_a_half',
            name: 'A.5 Station',
            lines: ['purple'],
            connectedStations: [
              { id: 'station_b', timeTo: 4 } as ConnectedStation,
            ],
          },
          {
            id: 'station_b',
            name: 'Intermediate Station',
            lines: ['purple', 'blue'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 } as ConnectedStation,
            ],
          },
        ],
        totalTime: 6,
        line: 'purple',
        direction: 'End Station Purple Line',
        transferTimeToNextLine: 3,
      },
      {
        stationsPath: [
          {
            id: 'station_b',
            name: 'Intermediate Station',
            lines: ['blue', 'purple'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 } as ConnectedStation,
            ],
          },
          {
            id: 'station_c',
            name: 'Destination Station',
            lines: ['blue'],
            connectedStations: [
              { id: 'station_d', timeTo: 2 } as ConnectedStation,
            ],
          },
        ],
        totalTime: 2,
        line: 'blue',
        direction: 'Start Station Blue Line',
      },
    ] as SubRoute[],
    totalTime: 11,
  } as Route;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: [originStation, destinationStation],
      lines: [{ id: 'green', stationsPath: [], connectedLines: [] }],
      storeMessage: async () => true,
    });

    useNavigationMock.mockReturnValue({
      origin: originStation,
      destination: destinationStation,
      departureTime: '17:30',
      departureDate: '2021-09-24',
      setNewDepartureTime: jest.fn(),
      setNewDepartureDate: jest.fn(),
      setOriginStation: jest.fn(),
      setDestinationStation: jest.fn(),
      generateStationsMap: jest.fn(),
      calculateRoute: () => testRoute,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders the loading page when stations data is not yet ready', () => {
    useFirebaseMock.mockReturnValue({
      stations: [],
      lines: [{ id: 'green', stationsPath: [], connectedLines: [] }],
      storeMessage: async () => true,
    });

    render(
      <Navigation onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    expect(
      screen.getByRole('img', {
        name: 'LOADING',
      })
    ).toBeVisible();
  });

  it('renders the loading page when lines data is not yet ready', () => {
    useFirebaseMock.mockReturnValue({
      stations: [originStation],
      lines: [],
      storeMessage: async () => true,
    });

    render(
      <Navigation onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    expect(
      screen.getByRole('img', {
        name: 'LOADING',
      })
    ).toBeVisible();
  });

  it('navigates to routes overview when clicking on search', async () => {
    render(
      <Navigation onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.TripSelector.SEARCH_BUTTON',
      })
    );

    expect(
      screen.getByRole('heading', {
        name: `${originStation.name} - ${destinationStation.name}`,
      })
    ).toBeVisible();
  });

  it('navigates back to trip selection when clicking on routes overview back button', async () => {
    render(
      <Navigation onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.TripSelector.SEARCH_BUTTON',
      })
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'GO_BACK_BUTTON_DESCRIPTIVE' })
    );

    expect(
      screen.getByRole('button', {
        name: 'Navigation.TripSelector.SEARCH_BUTTON',
      })
    ).toBeVisible();
  });

  it('navigates to route details when clicking on specific route in overview', async () => {
    render(
      <Navigation onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.TripSelector.SEARCH_BUTTON',
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE 17:30 - 17:41',
      })
    );

    const withinPurpleLine = within(
      screen.getByTitle('Navigation.Route.Lines.PURPLE')
    );

    const withinBlueLine = within(
      screen.getByTitle('Navigation.Route.Lines.BLUE')
    );

    expect(
      withinPurpleLine.getByRole('img', {
        name: 'Navigation.Route.Lines.PURPLE',
      })
    ).toBeVisible();
    expect(withinPurpleLine.getByText('Origin Station')).toBeVisible();
    expect(withinPurpleLine.getByText('Intermediate Station')).toBeVisible();

    expect(
      withinBlueLine.getByRole('img', { name: 'Navigation.Route.Lines.BLUE' })
    ).toBeVisible();
    expect(withinBlueLine.getByText('Intermediate Station')).toBeVisible();
    expect(withinBlueLine.getByText('Destination Station')).toBeVisible();
  });

  it('navigates back to routes overview when clicking on route details back button', async () => {
    render(
      <Navigation onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.TripSelector.SEARCH_BUTTON',
      })
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Navigation.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE 17:30 - 17:41',
      })
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'GO_BACK_BUTTON_DESCRIPTIVE' })
    );

    expect(
      screen.getByRole('heading', {
        name: `${originStation.name} - ${destinationStation.name}`,
      })
    ).toBeVisible();
  });
});
