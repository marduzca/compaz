import { act, renderHook } from '@testing-library/react';
import {
  calculateLineOfSubRoute,
  calculateTotalTimeOfSubRoute,
  addTransferTimeBetweenLines,
  extractSubRoutes,
  NavigationProvider,
  useNavigation,
  calculateDirectionOfSubRoute,
} from './NavigationProvider';
import { ConnectedStation, Line, Route, Station, SubRoute } from '../../domain';

describe('NavigationProvider', () => {
  const listOfStationsWithTwoLines = [
    {
      id: 'station_a',
      name: 'Station a',
      lines: ['green'],
      connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_b',
      name: 'Station b',
      lines: ['green', 'red'],
      connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_c',
      name: 'Station c',
      lines: ['red'],
      connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_d',
      name: 'Station d',
      lines: ['red'],
      connectedStations: [],
    },
  ] as Station[];
  const listOfStationsWithMultipleLines = [
    {
      id: 'station_a',
      name: 'Station a',
      lines: ['green'],
      connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_b',
      name: 'Station b',
      lines: ['green', 'red'],
      connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_c',
      name: 'Station c',
      lines: ['red'],
      connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_d',
      name: 'Station d',
      lines: ['red', 'blue'],
      connectedStations: [
        { id: 'station_c', timeTo: 2 },
        { id: 'station_e', timeTo: 2 },
      ] as ConnectedStation[],
    },
    {
      id: 'station_e',
      name: 'Station e',
      lines: ['blue'],
      connectedStations: [{ id: 'station_e', timeTo: 2 } as ConnectedStation],
    },
  ] as Station[];

  const routeWithOneTransfer = [
    {
      stationsPath: [
        {
          id: 'station_a',
          name: 'Station a',
          lines: ['green'],
          connectedStations: [
            { id: 'station_b', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_b',
          name: 'Station b',
          lines: ['green', 'red'],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
        },
      ],
      totalTime: 2,
      line: 'green',
      direction: 'Station b',
      transferTimeToNextLine: 2,
    },
    {
      stationsPath: [
        {
          id: 'station_b',
          name: 'Station b',
          lines: ['green', 'red'],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_c',
          name: 'Station c',
          lines: ['red'],
          connectedStations: [
            { id: 'station_d', timeTo: 2 },
          ] as ConnectedStation[],
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
      direction: 'Station d',
    },
  ] as SubRoute[];

  const routeWithMultipleTransfers = [
    {
      stationsPath: [
        {
          id: 'station_a',
          name: 'Station a',
          lines: ['green'],
          connectedStations: [
            { id: 'station_b', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_b',
          name: 'Station b',
          lines: ['green', 'red'],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
        },
      ],
      totalTime: 2,
      line: 'green',
      direction: 'Station b',
      transferTimeToNextLine: 2,
    },
    {
      stationsPath: [
        {
          id: 'station_b',
          name: 'Station b',
          lines: ['green', 'red'],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_c',
          name: 'Station c',
          lines: ['red'],
          connectedStations: [
            { id: 'station_d', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_d',
          name: 'Station d',
          lines: ['red', 'blue'],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
            { id: 'station_e', timeTo: 2 },
          ] as ConnectedStation[],
        },
      ],
      totalTime: 4,
      line: 'red',
      direction: 'Station d',
      transferTimeToNextLine: 3,
    },
    {
      stationsPath: [
        {
          id: 'station_d',
          name: 'Station d',
          lines: ['red', 'blue'],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
            { id: 'station_e', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_e',
          name: 'Station e',
          lines: ['blue'],
          connectedStations: [
            { id: 'station_e', timeTo: 2 },
          ] as ConnectedStation[],
        },
      ],
      totalTime: 2,
      line: 'blue',
      direction: 'Station e',
    },
  ] as SubRoute[];

  const lines = [
    {
      id: 'green',
      stationsPath: ['station_a', 'station_b'],
      connectedLines: [
        { id: 'yellow', transferTime: 2 },
        { id: 'red', transferTime: 2 },
      ],
    },
    {
      id: 'red',
      stationsPath: ['station_b', 'station_c', 'station_d'],
      connectedLines: [
        { id: 'blue', transferTime: 3 },
        { id: 'silver', transferTime: 2 },
        { id: 'green', transferTime: 2 },
      ],
    },
    {
      id: 'blue',
      stationsPath: ['station_d', 'station_e'],
      connectedLines: [
        { id: 'red', transferTime: 3 },
        { id: 'silver', transferTime: 2 },
      ],
    },
  ] as Line[];

  it('calculates the route correctly for simple route', async () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: NavigationProvider,
    });

    act(() => {
      result.current.generateStationsMap(listOfStationsWithTwoLines);
    });

    act(() => {
      result.current.setOriginStation(listOfStationsWithTwoLines[0]);
    });

    act(() => {
      result.current.setDestinationStation(listOfStationsWithTwoLines[3]);
    });

    const route = result.current.calculateRoute(
      listOfStationsWithTwoLines,
      lines
    );

    expect(route).toEqual({
      subRoutes: routeWithOneTransfer as SubRoute[],
      totalTime: 8,
      price: 5,
    } as Route);
  });

  it('calculates the route correctly for route with multiple transfers', async () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: NavigationProvider,
    });

    act(() => {
      result.current.generateStationsMap(listOfStationsWithMultipleLines);
    });

    act(() => {
      result.current.setOriginStation(listOfStationsWithMultipleLines[0]);
    });

    act(() => {
      result.current.setDestinationStation(listOfStationsWithMultipleLines[4]);
    });

    const route = result.current.calculateRoute(
      listOfStationsWithMultipleLines,
      lines
    );

    expect(route).toEqual({
      subRoutes: routeWithMultipleTransfers as SubRoute[],
      totalTime: 13,
      price: 7,
    } as Route);
  });

  describe('extractSubRoutes', () => {
    it('extracts sub route correctly from route without transfers', () => {
      const calculatedSubRoutes = extractSubRoutes([
        {
          id: 'station_b',
          name: 'Station b',
          lines: ['green', 'red'],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
          geoLocation: { latitude: 0, longitude: 0 },
        },
        {
          id: 'station_c',
          name: 'Station c',
          lines: ['red'],
          connectedStations: [
            { id: 'station_d', timeTo: 2 },
          ] as ConnectedStation[],
          geoLocation: { latitude: 0, longitude: 0 },
        },
        {
          id: 'station_d',
          name: 'Station d',
          lines: ['red', 'blue'],
          connectedStations: [],
          geoLocation: { latitude: 0, longitude: 0 },
        },
      ]);

      expect(calculatedSubRoutes).toEqual([
        [
          {
            id: 'station_b',
            name: 'Station b',
            lines: ['green', 'red'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
            geoLocation: { latitude: 0, longitude: 0 },
          },
          {
            id: 'station_c',
            name: 'Station c',
            lines: ['red'],
            connectedStations: [
              { id: 'station_d', timeTo: 2 },
            ] as ConnectedStation[],
            geoLocation: { latitude: 0, longitude: 0 },
          },
          {
            id: 'station_d',
            name: 'Station d',
            lines: ['red', 'blue'],
            connectedStations: [],
            geoLocation: { latitude: 0, longitude: 0 },
          },
        ],
      ]);
    });

    it('extracts sub routes correctly from simple route', () => {
      const calculatedSubRoutes = extractSubRoutes(listOfStationsWithTwoLines);

      expect(calculatedSubRoutes).toEqual([
        [
          {
            id: 'station_a',
            name: 'Station a',
            lines: ['green'],
            connectedStations: [
              { id: 'station_b', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_b',
            name: 'Station b',
            lines: ['green', 'red'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
          },
        ],
        [
          {
            id: 'station_b',
            name: 'Station b',
            lines: ['green', 'red'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_c',
            name: 'Station c',
            lines: ['red'],
            connectedStations: [
              { id: 'station_d', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_d',
            name: 'Station d',
            lines: ['red'],
            connectedStations: [],
          },
        ],
      ]);
    });

    it('extracts sub routes correctly from route with multiple transfers', () => {
      const calculatedSubRoutes = extractSubRoutes(
        listOfStationsWithMultipleLines
      );

      expect(calculatedSubRoutes).toEqual([
        [
          {
            id: 'station_a',
            name: 'Station a',
            lines: ['green'],
            connectedStations: [
              { id: 'station_b', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_b',
            name: 'Station b',
            lines: ['green', 'red'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
          },
        ],
        [
          {
            id: 'station_b',
            name: 'Station b',
            lines: ['green', 'red'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_c',
            name: 'Station c',
            lines: ['red'],
            connectedStations: [
              { id: 'station_d', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_d',
            name: 'Station d',
            lines: ['red', 'blue'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
              { id: 'station_e', timeTo: 2 },
            ] as ConnectedStation[],
          },
        ],
        [
          {
            id: 'station_d',
            name: 'Station d',
            lines: ['red', 'blue'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
              { id: 'station_e', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_e',
            name: 'Station e',
            lines: ['blue'],
            connectedStations: [
              { id: 'station_e', timeTo: 2 },
            ] as ConnectedStation[],
          },
        ],
      ]);
    });
  });

  describe('calculateTotalTimeOfSubRoute', () => {
    it('calculates total time of route correctly', () => {
      const calculatedTotalTime = calculateTotalTimeOfSubRoute(
        listOfStationsWithTwoLines
      );

      expect(calculatedTotalTime).toBe(6);
    });
  });

  describe('calculateLineOfSubRoute', () => {
    it('calculates lines of route correctly', () => {
      const subRouteLine = calculateLineOfSubRoute(
        listOfStationsWithTwoLines.slice(0, 2),
        lines
      );

      expect(subRouteLine).toEqual(lines[0]);
    });
  });

  describe('calculateDirectionOfSubRoute', () => {
    const allStations = [
      {
        id: 'first_station_red',
        name: 'First station red',
        lines: ['red'],
        connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
        geoLocation: { latitude: 0, longitude: 0 },
      },
      {
        id: 'station_b',
        name: 'Station b',
        lines: ['red'],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
        geoLocation: { latitude: 0, longitude: 0 },
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: ['red'],
        connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
        geoLocation: { latitude: 0, longitude: 0 },
      },
      {
        id: 'last_station_red',
        name: 'Last station red',
        lines: ['red'],
        connectedStations: [],
        geoLocation: { latitude: 0, longitude: 0 },
      },
    ] as Station[];

    const redLine = {
      id: 'red',
      stationsPath: [
        'first_station_red',
        'station_b',
        'station_c',
        'last_station_red',
      ],
      connectedLines: [],
    } as Line;

    const routeHeadingEndOfLine = [
      {
        id: 'station_b',
        name: 'Station b',
        lines: ['red'],
        connectedStations: [
          { id: 'station_c', timeTo: 2 },
        ] as ConnectedStation[],
        geoLocation: { latitude: 0, longitude: 0 },
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: ['red'],
        connectedStations: [
          { id: 'station_d', timeTo: 2 },
        ] as ConnectedStation[],
        geoLocation: { latitude: 0, longitude: 0 },
      },
    ];

    it('calculates direction of route correctly when heading towards end of line', () => {
      const subRouteDirection = calculateDirectionOfSubRoute(
        allStations,
        redLine,
        routeHeadingEndOfLine
      );

      expect(subRouteDirection).toBe('Last station red');
    });

    it('calculates direction of route correctly when heading towards start of line', () => {
      const subRouteDirection = calculateDirectionOfSubRoute(
        allStations,
        redLine,
        routeHeadingEndOfLine.reverse()
      );

      expect(subRouteDirection).toBe('First station red');
    });
  });

  describe('addTransferTimeBetweenLines', () => {
    it('calculates total transfer time correctly', () => {
      const routeWithMultipleTransferTimes = addTransferTimeBetweenLines(
        routeWithMultipleTransfers,
        lines
      );

      expect(routeWithMultipleTransferTimes).toEqual([
        {
          ...routeWithMultipleTransfers[0],
          transferTimeToNextLine: 2,
        },
        {
          ...routeWithMultipleTransfers[1],
          transferTimeToNextLine: 3,
        },
        {
          ...routeWithMultipleTransfers[2],
        },
      ]);
    });
  });
});
