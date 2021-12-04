import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoutesOverviewContainer from './RoutesOverviewContainer';
import * as NavigationProvider from '../../../providers/NavigationProvider';
import * as FirebaseProvider from '../../../providers/FirebaseProvider';
import {
  ConnectedStation,
  Line,
  Route,
  Station,
  SubRoute,
} from '../../../domain';

describe('RoutesOverviewContainer', () => {
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

  const simpleRoute = {
    subRoutes: [
      {
        stationsPath: [
          {
            id: 'station_a',
            name: 'Station a',
            lines: ['green'],
            connectedStations: [
              { id: 'station_b', timeTo: 2 } as ConnectedStation,
            ],
          },
          {
            id: 'station_b',
            name: 'Station b',
            lines: ['green', 'red'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 } as ConnectedStation,
            ],
          },
        ],
        totalTime: 3,
        line: 'green',
        transferTimeToNextLine: 2,
      },
      {
        stationsPath: [
          {
            id: 'station_b',
            name: 'Station b',
            lines: ['green', 'red'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 } as ConnectedStation,
            ],
          },
          {
            id: 'station_c',
            name: 'Station c',
            lines: ['red'],
            connectedStations: [
              { id: 'station_d', timeTo: 2 } as ConnectedStation,
            ],
          },
          {
            id: 'station_d',
            name: 'Station d',
            lines: ['red'],
            connectedStations: [],
          },
        ],
        totalTime: 4,
        line: 'red',
      },
    ] as SubRoute[],
    totalTime: 9,
  } as Route;

  const useFirebaseMock = jest.spyOn(FirebaseProvider, 'useFirebase');
  const useNavigationMock = jest.spyOn(NavigationProvider, 'useNavigation');

  beforeEach(() => {
    useFirebaseMock.mockReturnValue({
      stations: [originStation, destinationStation],
      lines: [
        {
          id: 'green',
          connectedLines: [
            { id: 'yellow', transferTime: 2 },
            { id: 'red', transferTime: 2 },
          ],
        },
        {
          id: 'red',
          connectedLines: [
            { id: 'blue', transferTime: 3 },
            { id: 'silver', transferTime: 2 },
            { id: 'green', transferTime: 2 },
          ],
        },
      ] as Line[],
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
      calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays origin and destination in the header', () => {
    render(
      <RoutesOverviewContainer
        route={simpleRoute}
        onRouteSelection={() => {}}
        onBackButtonClick={() => {}}
      />
    );

    expect(
      screen.getByRole('heading', {
        name: 'Origin station - Destination station',
      })
    ).toBeVisible();
  });

  it('displays the route with correct icons', () => {
    render(
      <RoutesOverviewContainer
        route={simpleRoute}
        onRouteSelection={() => {}}
        onBackButtonClick={() => {}}
      />
    );

    const withinFirstRouteSection = within(
      screen.getByRole('button', {
        name: 'Content.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE 17:30 - 17:39',
      })
    );

    expect(
      withinFirstRouteSection.getByRole('img', {
        name: 'Content.Route.Lines.GREEN',
      })
    ).toBeVisible();
    expect(withinFirstRouteSection.getByText('3')).toBeVisible();

    expect(
      withinFirstRouteSection.getByRole('img', {
        name: 'Content.RoutesOverview.TRANSFER',
      })
    ).toBeVisible();
    expect(withinFirstRouteSection.getByText('2')).toBeVisible();

    expect(
      withinFirstRouteSection.getByRole('img', {
        name: 'Content.Route.Lines.RED',
      })
    ).toBeVisible();
    expect(withinFirstRouteSection.getByText('4')).toBeVisible();
  });

  it('displays earlier route time when clicking on earlier button', () => {
    render(
      <RoutesOverviewContainer
        route={simpleRoute}
        onRouteSelection={() => {}}
        onBackButtonClick={() => {}}
      />
    );

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.RoutesOverview.EARLIER_BUTTON',
      })
    );

    expect(screen.getByText('17:25 - 17:34')).toBeVisible();
  });

  it('displays later route time when clicking on later button', () => {
    render(
      <RoutesOverviewContainer
        route={simpleRoute}
        onRouteSelection={() => {}}
        onBackButtonClick={() => {}}
      />
    );

    userEvent.click(
      screen.getByRole('button', {
        name: 'Content.RoutesOverview.LATER_BUTTON',
      })
    );

    expect(screen.getByText('17:50 - 17:59')).toBeVisible();
  });

  describe('time and date', () => {
    it('displays the time and date correctly', () => {
      render(
        <RoutesOverviewContainer
          route={simpleRoute}
          onRouteSelection={() => {}}
          onBackButtonClick={() => {}}
        />
      );

      const withinFirstRouteSection = within(
        screen.getByRole('button', {
          name: 'Content.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE 17:30 - 17:39',
        })
      );

      expect(screen.getByText('Friday 24 September')).toBeVisible();
      expect(withinFirstRouteSection.getByText('9 min')).toBeVisible();
      expect(withinFirstRouteSection.getByText('17:30 - 17:39')).toBeVisible();
    });

    it('displays separated total time in hours and minutes if total time is above one hour', () => {
      const routeWithTotalTimeAboveOneHour = {
        subRoutes: [
          {
            stationsPath: [
              {
                id: 'station_a',
                name: 'Station a',
                lines: ['green'],
                connectedStations: [
                  { id: 'station_b', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_b',
                name: 'Station b',
                lines: ['green', 'red'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 35,
            line: 'green',
            transferTimeToNextLine: 10,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Station b',
                lines: ['green', 'red'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: ['red'],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_d',
                name: 'Station d',
                lines: ['red'],
                connectedStations: [],
              },
            ],
            totalTime: 30,
            line: 'red',
          },
        ] as SubRoute[],
        totalTime: 75,
      } as Route;

      render(
        <RoutesOverviewContainer
          route={routeWithTotalTimeAboveOneHour}
          onRouteSelection={() => {}}
          onBackButtonClick={() => {}}
        />
      );

      const withinFirstRouteSection = within(
        screen.getByRole('button', {
          name: 'Content.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE 17:30 - 18:45',
        })
      );

      expect(screen.getByText('Friday 24 September')).toBeVisible();
      expect(withinFirstRouteSection.getByText('1 h')).toBeVisible();
      expect(withinFirstRouteSection.getByText('15 min')).toBeVisible();
      expect(withinFirstRouteSection.getByText('17:30 - 18:45')).toBeVisible();
    });

    it('displays total time only in hours if total time is exactly an hour', () => {
      const routeWithTotalTimeOfExactlyAnHour = {
        subRoutes: [
          {
            stationsPath: [
              {
                id: 'station_a',
                name: 'Station a',
                lines: ['green'],
                connectedStations: [
                  { id: 'station_b', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_b',
                name: 'Station b',
                lines: ['green', 'red'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
            ],
            totalTime: 25,
            line: 'green',
            transferTimeToNextLine: 5,
          },
          {
            stationsPath: [
              {
                id: 'station_b',
                name: 'Station b',
                lines: ['green', 'red'],
                connectedStations: [
                  { id: 'station_c', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_c',
                name: 'Station c',
                lines: ['red'],
                connectedStations: [
                  { id: 'station_d', timeTo: 2 } as ConnectedStation,
                ],
              },
              {
                id: 'station_d',
                name: 'Station d',
                lines: ['red'],
                connectedStations: [],
              },
            ],
            totalTime: 30,
            line: 'red',
          },
        ] as SubRoute[],
        totalTime: 60,
      } as Route;

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
        calculateRoute: () => routeWithTotalTimeOfExactlyAnHour,
      });

      render(
        <RoutesOverviewContainer
          route={routeWithTotalTimeOfExactlyAnHour}
          onRouteSelection={() => {}}
          onBackButtonClick={() => {}}
        />
      );

      const withinFirstRouteSection = within(
        screen.getByRole('button', {
          name: 'Content.RoutesOverview.SINGLE_ROUTE_BUTTON_TITLE 17:30 - 18:30',
        })
      );

      expect(screen.getByText('Friday 24 September')).toBeVisible();
      expect(withinFirstRouteSection.getByText('1 h')).toBeVisible();
      expect(withinFirstRouteSection.queryByText(/min/)).toBeNull();
      expect(withinFirstRouteSection.getByText('17:30 - 18:30')).toBeVisible();
    });
  });
});
