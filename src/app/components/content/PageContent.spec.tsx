import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageContent from './PageContent';
import * as FirebaseProvider from '../providers/FirebaseProvider';
import * as NavigationProvider from '../providers/NavigationProvider';
import { ConnectedStation, Route, Station, SubRoute } from '../domain';
import * as useMediaQuery from '../useMediaQuery';

describe('PageContent', () => {
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
    const useMediaQueryMock = jest.spyOn(useMediaQuery, 'default');

    useMediaQueryMock.mockReturnValue(false);

    useFirebaseMock.mockReturnValue({
      stations: [originStation, destinationStation],
      lines: [{ id: 'green', stationsPath: [], connectedLines: [] }],
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
    });

    render(
      <PageContent onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
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
    });

    render(
      <PageContent onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    expect(
      screen.getByRole('img', {
        name: 'LOADING',
      })
    ).toBeVisible();
  });

  it('navigates to routes overview when clicking on search', () => {
    render(
      <PageContent onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    userEvent.click(
      screen.getByRole('button', { name: 'Content.TripSelector.SEARCH_BUTTON' })
    );

    expect(
      screen.getByRole('heading', {
        name: `${originStation.name} - ${destinationStation.name}`,
      })
    ).toBeVisible();
  });

  it('navigates back to trip selection when clicking on routes overview back button', () => {
    render(
      <PageContent onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    userEvent.click(
      screen.getByRole('button', { name: 'Content.TripSelector.SEARCH_BUTTON' })
    );

    userEvent.click(
      screen.getByRole('button', { name: 'GO_BACK_BUTTON_DESCRIPTIVE' })
    );

    expect(
      screen.getByRole('button', { name: 'Content.TripSelector.SEARCH_BUTTON' })
    ).toBeVisible();
  });

  it('navigates to route details when clicking on specific route in overview', () => {
    render(
      <PageContent onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    userEvent.click(
      screen.getByRole('button', { name: 'Content.TripSelector.SEARCH_BUTTON' })
    );

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE 17:30 - 17:41',
      })
    );

    const withinPurpleLine = within(
      screen.getByTitle('Content.Route.Lines.PURPLE')
    );

    const withinBlueLine = within(
      screen.getByTitle('Content.Route.Lines.BLUE')
    );

    expect(
      withinPurpleLine.getByRole('img', { name: 'Content.Route.Lines.PURPLE' })
    ).toBeVisible();
    expect(withinPurpleLine.getByText('Origin Station')).toBeVisible();
    expect(withinPurpleLine.getByText('Intermediate Station')).toBeVisible();

    expect(
      withinBlueLine.getByRole('img', { name: 'Content.Route.Lines.BLUE' })
    ).toBeVisible();
    expect(withinBlueLine.getByText('Intermediate Station')).toBeVisible();
    expect(withinBlueLine.getByText('Destination Station')).toBeVisible();
  });

  it('navigates back to routes overview when clicking on route details back button', () => {
    render(
      <PageContent onMenuButtonClick={() => {}} isMobileMenuOpen={false} />
    );

    userEvent.click(
      screen.getByRole('button', { name: 'Content.TripSelector.SEARCH_BUTTON' })
    );

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE 17:30 - 17:41',
      })
    );

    userEvent.click(
      screen.getByRole('button', { name: 'GO_BACK_BUTTON_DESCRIPTIVE' })
    );

    expect(
      screen.getByRole('heading', {
        name: `${originStation.name} - ${destinationStation.name}`,
      })
    ).toBeVisible();
  });
});
