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
import {
  ConnectedStation,
  Line,
  LineColor,
  Route,
  Station,
  SubRoute,
} from '../../domain';

describe('NavigationProvider', () => {
  const listOfStationsWithTwoLines = [
    {
      id: 'station_a',
      name: 'Station a',
      lines: [LineColor.GREEN],
      connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_b',
      name: 'Station b',
      lines: [LineColor.GREEN, LineColor.RED],
      connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_c',
      name: 'Station c',
      lines: [LineColor.RED],
      connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_d',
      name: 'Station d',
      lines: [LineColor.RED],
      connectedStations: [],
    },
  ] as Station[];
  const listOfStationsWithMultipleLines = [
    {
      id: 'station_a',
      name: 'Station a',
      lines: [LineColor.GREEN],
      connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_b',
      name: 'Station b',
      lines: [LineColor.GREEN, LineColor.RED],
      connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_c',
      name: 'Station c',
      lines: [LineColor.RED],
      connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
    },
    {
      id: 'station_d',
      name: 'Station d',
      lines: [LineColor.RED, LineColor.BLUE],
      connectedStations: [
        { id: 'station_c', timeTo: 2 },
        { id: 'station_e', timeTo: 2 },
      ] as ConnectedStation[],
    },
    {
      id: 'station_e',
      name: 'Station e',
      lines: [LineColor.BLUE],
      connectedStations: [{ id: 'station_e', timeTo: 2 } as ConnectedStation],
    },
  ] as Station[];

  const routeWithOneTransfer = [
    {
      stationsPath: [
        {
          id: 'station_a',
          name: 'Station a',
          lines: [LineColor.GREEN],
          connectedStations: [
            { id: 'station_b', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_b',
          name: 'Station b',
          lines: [LineColor.GREEN, LineColor.RED],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
        },
      ],
      totalTime: 2,
      line: LineColor.GREEN,
      direction: 'Station b',
      transferTimeToNextLine: 2,
    },
    {
      stationsPath: [
        {
          id: 'station_b',
          name: 'Station b',
          lines: [LineColor.GREEN, LineColor.RED],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_c',
          name: 'Station c',
          lines: [LineColor.RED],
          connectedStations: [
            { id: 'station_d', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_d',
          name: 'Station d',
          lines: [LineColor.RED],
          connectedStations: [],
        },
      ],
      totalTime: 5,
      line: LineColor.RED,
      direction: 'Station d',
    },
  ] as SubRoute[];

  const routeWithMultipleTransfers = [
    {
      stationsPath: [
        {
          id: 'station_a',
          name: 'Station a',
          lines: [LineColor.GREEN],
          connectedStations: [
            { id: 'station_b', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_b',
          name: 'Station b',
          lines: [LineColor.GREEN, LineColor.RED],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
        },
      ],
      totalTime: 2,
      line: LineColor.GREEN,
      direction: 'Station b',
      transferTimeToNextLine: 2,
    },
    {
      stationsPath: [
        {
          id: 'station_b',
          name: 'Station b',
          lines: [LineColor.GREEN, LineColor.RED],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_c',
          name: 'Station c',
          lines: [LineColor.RED],
          connectedStations: [
            { id: 'station_d', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_d',
          name: 'Station d',
          lines: [LineColor.RED, LineColor.BLUE],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
            { id: 'station_e', timeTo: 2 },
          ] as ConnectedStation[],
        },
      ],
      totalTime: 5,
      line: LineColor.RED,
      direction: 'Station d',
      transferTimeToNextLine: 3,
    },
    {
      stationsPath: [
        {
          id: 'station_d',
          name: 'Station d',
          lines: [LineColor.RED, LineColor.BLUE],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
            { id: 'station_e', timeTo: 2 },
          ] as ConnectedStation[],
        },
        {
          id: 'station_e',
          name: 'Station e',
          lines: [LineColor.BLUE],
          connectedStations: [
            { id: 'station_e', timeTo: 2 },
          ] as ConnectedStation[],
        },
      ],
      totalTime: 2,
      line: LineColor.BLUE,
      direction: 'Station e',
    },
  ] as SubRoute[];

  const lines = [
    {
      id: LineColor.GREEN,
      stationsPath: ['station_a', 'station_b'],
      connectedLines: [
        { id: LineColor.YELLOW, transferTime: 2 },
        { id: LineColor.RED, transferTime: 2 },
      ],
    },
    {
      id: LineColor.RED,
      stationsPath: ['station_b', 'station_c', 'station_d'],
      connectedLines: [
        { id: LineColor.BLUE, transferTime: 3 },
        { id: LineColor.SILVER, transferTime: 2 },
        { id: LineColor.GREEN, transferTime: 2 },
      ],
    },
    {
      id: LineColor.BLUE,
      stationsPath: ['station_d', 'station_e'],
      connectedLines: [
        { id: LineColor.RED, transferTime: 3 },
        { id: LineColor.SILVER, transferTime: 2 },
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
      totalTime: 9,
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
      totalTime: 14,
      price: 7,
    } as Route);
  });

  it('calculates price reduction for white-lightblue lines combination exception correctly', () => {
    const linesWithWhiteLightBlueLinesException = [
      {
        id: LineColor.WHITE,
        stationsPath: ['station_a', 'station_b'],
        connectedLines: [{ id: LineColor.LIGHT_BLUE, transferTime: 2 }],
      },
      {
        id: LineColor.LIGHT_BLUE,
        stationsPath: ['station_b', 'station_c', 'station_d'],
        connectedLines: [
          { id: LineColor.GREEN, transferTime: 3 },
          { id: LineColor.WHITE, transferTime: 2 },
        ],
      },
      {
        id: LineColor.GREEN,
        stationsPath: ['station_d', 'station_e'],
        connectedLines: [{ id: LineColor.LIGHT_BLUE, transferTime: 3 }],
      },
    ] as Line[];

    const stationsWithWhiteLightBlueLines = [
      {
        id: 'station_a',
        name: 'Station a',
        lines: [LineColor.WHITE],
        connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_b',
        name: 'Station b',
        lines: [LineColor.WHITE, LineColor.LIGHT_BLUE],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: [LineColor.LIGHT_BLUE],
        connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_d',
        name: 'Station d',
        lines: [LineColor.LIGHT_BLUE, LineColor.GREEN],
        connectedStations: [
          { id: 'station_c', timeTo: 2 },
          { id: 'station_e', timeTo: 2 },
        ] as ConnectedStation[],
      },
      {
        id: 'station_e',
        name: 'Station e',
        lines: [LineColor.GREEN],
        connectedStations: [{ id: 'station_e', timeTo: 2 } as ConnectedStation],
      },
    ] as Station[];

    const { result } = renderHook(() => useNavigation(), {
      wrapper: NavigationProvider,
    });

    act(() => {
      result.current.generateStationsMap(stationsWithWhiteLightBlueLines);
    });

    act(() => {
      result.current.setOriginStation(stationsWithWhiteLightBlueLines[0]);
    });

    act(() => {
      result.current.setDestinationStation(stationsWithWhiteLightBlueLines[4]);
    });

    const route = result.current.calculateRoute(
      stationsWithWhiteLightBlueLines,
      linesWithWhiteLightBlueLinesException
    );

    expect(route.price).toBe(5);
  });

  it('calculates prices reduction for brown line exception correctly', () => {
    const linesWithBrownLineException = [
      {
        id: LineColor.WHITE,
        stationsPath: ['station_a', 'station_b'],
        connectedLines: [{ id: LineColor.BROWN, transferTime: 2 }],
      },
      {
        id: LineColor.BROWN,
        stationsPath: ['station_b', 'station_c', 'station_d'],
        connectedLines: [{ id: LineColor.WHITE, transferTime: 2 }],
      },
    ] as Line[];

    const stationsWithBrownLine = [
      {
        id: 'station_a',
        name: 'Station a',
        lines: [LineColor.WHITE],
        connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_b',
        name: 'Station b',
        lines: [LineColor.WHITE, LineColor.BROWN],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: [LineColor.BROWN],
        connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_d',
        name: 'Station d',
        lines: [LineColor.BROWN],
        connectedStations: [],
      },
    ] as Station[];

    const { result } = renderHook(() => useNavigation(), {
      wrapper: NavigationProvider,
    });

    act(() => {
      result.current.generateStationsMap(stationsWithBrownLine);
    });

    act(() => {
      result.current.setOriginStation(stationsWithBrownLine[0]);
    });

    act(() => {
      result.current.setDestinationStation(stationsWithBrownLine[3]);
    });

    const route = result.current.calculateRoute(
      stationsWithBrownLine,
      linesWithBrownLineException
    );

    expect(route.price).toBe(3);
  });

  it('adds intermediate stations times correctly', async () => {
    const listOfStationsWithOneLine = [
      {
        id: 'station_a',
        name: 'Station a',
        lines: [LineColor.GREEN],
        connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_b',
        name: 'Station b',
        lines: [LineColor.GREEN],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: [LineColor.GREEN],
        connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
      },
      {
        id: 'station_d',
        name: 'Station d',
        lines: [LineColor.GREEN],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
      },
    ] as Station[];

    const lonelyLine = [
      {
        id: LineColor.GREEN,
        stationsPath: ['station_a', 'station_b', 'station_c', 'station_d'],
        connectedLines: [],
      },
    ] as Line[];

    const routeWithMultipleIntermediateStations = [
      {
        stationsPath: listOfStationsWithOneLine,
        totalTime: 9,
        line: LineColor.GREEN,
        direction: 'Station d',
      },
    ] as SubRoute[];

    const { result } = renderHook(() => useNavigation(), {
      wrapper: NavigationProvider,
    });

    act(() => {
      result.current.generateStationsMap(listOfStationsWithOneLine);
    });

    act(() => {
      result.current.setOriginStation(listOfStationsWithOneLine[0]);
    });

    act(() => {
      result.current.setDestinationStation(listOfStationsWithOneLine[3]);
    });

    const route = result.current.calculateRoute(
      listOfStationsWithOneLine,
      lonelyLine
    );

    expect(route).toEqual({
      subRoutes: routeWithMultipleIntermediateStations as SubRoute[],
      totalTime: 9,
      price: 3,
    } as Route);
  });

  describe('extractSubRoutes', () => {
    it('extracts sub route correctly from route without transfers', () => {
      const calculatedSubRoutes = extractSubRoutes([
        {
          id: 'station_b',
          name: 'Station b',
          lines: [LineColor.GREEN, LineColor.RED],
          connectedStations: [
            { id: 'station_c', timeTo: 2 },
          ] as ConnectedStation[],
          geoLocation: { latitude: 0, longitude: 0 },
        },
        {
          id: 'station_c',
          name: 'Station c',
          lines: [LineColor.RED],
          connectedStations: [
            { id: 'station_d', timeTo: 2 },
          ] as ConnectedStation[],
          geoLocation: { latitude: 0, longitude: 0 },
        },
        {
          id: 'station_d',
          name: 'Station d',
          lines: [LineColor.RED, LineColor.BLUE],
          connectedStations: [],
          geoLocation: { latitude: 0, longitude: 0 },
        },
      ]);

      expect(calculatedSubRoutes).toEqual([
        [
          {
            id: 'station_b',
            name: 'Station b',
            lines: [LineColor.GREEN, LineColor.RED],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
            geoLocation: { latitude: 0, longitude: 0 },
          },
          {
            id: 'station_c',
            name: 'Station c',
            lines: [LineColor.RED],
            connectedStations: [
              { id: 'station_d', timeTo: 2 },
            ] as ConnectedStation[],
            geoLocation: { latitude: 0, longitude: 0 },
          },
          {
            id: 'station_d',
            name: 'Station d',
            lines: [LineColor.RED, LineColor.BLUE],
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
            lines: [LineColor.GREEN],
            connectedStations: [
              { id: 'station_b', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_b',
            name: 'Station b',
            lines: [LineColor.GREEN, LineColor.RED],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
          },
        ],
        [
          {
            id: 'station_b',
            name: 'Station b',
            lines: [LineColor.GREEN, LineColor.RED],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_c',
            name: 'Station c',
            lines: [LineColor.RED],
            connectedStations: [
              { id: 'station_d', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_d',
            name: 'Station d',
            lines: [LineColor.RED],
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
            lines: [LineColor.GREEN],
            connectedStations: [
              { id: 'station_b', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_b',
            name: 'Station b',
            lines: [LineColor.GREEN, LineColor.RED],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
          },
        ],
        [
          {
            id: 'station_b',
            name: 'Station b',
            lines: [LineColor.GREEN, LineColor.RED],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_c',
            name: 'Station c',
            lines: [LineColor.RED],
            connectedStations: [
              { id: 'station_d', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_d',
            name: 'Station d',
            lines: [LineColor.RED, LineColor.BLUE],
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
            lines: [LineColor.RED, LineColor.BLUE],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
              { id: 'station_e', timeTo: 2 },
            ] as ConnectedStation[],
          },
          {
            id: 'station_e',
            name: 'Station e',
            lines: [LineColor.BLUE],
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

      expect(calculatedTotalTime).toBe(9);
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
        lines: [LineColor.RED],
        connectedStations: [{ id: 'station_b', timeTo: 2 } as ConnectedStation],
        geoLocation: { latitude: 0, longitude: 0 },
      },
      {
        id: 'station_b',
        name: 'Station b',
        lines: [LineColor.RED],
        connectedStations: [{ id: 'station_c', timeTo: 2 } as ConnectedStation],
        geoLocation: { latitude: 0, longitude: 0 },
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: [LineColor.RED],
        connectedStations: [{ id: 'station_d', timeTo: 2 } as ConnectedStation],
        geoLocation: { latitude: 0, longitude: 0 },
      },
      {
        id: 'last_station_red',
        name: 'Last station red',
        lines: [LineColor.RED],
        connectedStations: [],
        geoLocation: { latitude: 0, longitude: 0 },
      },
    ] as Station[];

    const redLine = {
      id: LineColor.RED,
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
        lines: [LineColor.RED],
        connectedStations: [
          { id: 'station_c', timeTo: 2 },
        ] as ConnectedStation[],
        geoLocation: { latitude: 0, longitude: 0 },
      },
      {
        id: 'station_c',
        name: 'Station c',
        lines: [LineColor.RED],
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
