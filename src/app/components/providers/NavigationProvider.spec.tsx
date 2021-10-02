import { act, renderHook } from '@testing-library/react-hooks';
import {
  calculateLineOfSubRoute,
  calculateTotalTimeOfSubRoute,
  addTransferTimeBetweenLines,
  extractSubRoutes,
  NavigationProvider,
  useNavigation,
  calculateDirectionOfSubRoute,
} from './NavigationProvider';
import { ConnectedStation, Line, Route, Station, SubRoute } from '../domain';

describe('ShortestPathProvider', () => {
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
      direction: 'station_b',
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
      direction: 'end_station_red',
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
      direction: 'station_b',
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
      direction: 'end_station_red',
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
      direction: 'station_e',
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
      stationsPath: [
        'start_station_red',
        'station_b',
        'station_c',
        'station_d',
        'end_station_red',
      ],
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
          connectedStations: [],
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
            connectedStations: [],
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

      expect(calculatedTotalTime).toEqual(6);
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
    it('calculates direction of route correctly when heading towards end of line', () => {
      const subRouteDirection = calculateDirectionOfSubRoute(
        lines[1],
        routeWithMultipleTransfers[1].stationsPath
      );

      expect(subRouteDirection).toEqual('end_station_red');
    });

    it('calculates direction of route correctly when heading towards start of line', () => {
      const subRouteDirection = calculateDirectionOfSubRoute(
        lines[1],
        routeWithMultipleTransfers[1].stationsPath.reverse()
      );

      expect(subRouteDirection).toEqual('start_station_red');
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
