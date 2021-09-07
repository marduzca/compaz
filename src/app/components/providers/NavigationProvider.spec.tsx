import { act, renderHook } from '@testing-library/react-hooks';
import {
  calculateLineOfSubRoute,
  calculateTotalTimeOfSubRoute,
  extractSubRoutes,
  NavigationProvider,
  useNavigation,
} from './NavigationProvider';
import { ConnectedStation, Route, SubRoute } from '../domain';

describe('ShortestPathProvider', () => {
  const simpleRoute = [
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
  ];
  const multipleTransfersRoute = [
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
        { id: 'station_e', timeTo: 2 } as ConnectedStation,
      ],
    },
    {
      id: 'station_e',
      name: 'Station e',
      lines: ['blue'],
      connectedStations: [{ id: 'station_e', timeTo: 2 } as ConnectedStation],
    },
  ];

  it('calculates the route correctly for simple route', async () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: NavigationProvider,
    });

    act(() => {
      result.current.generateStationsMap(simpleRoute);
    });

    act(() => {
      result.current.setOriginStation(simpleRoute[0]);
    });

    act(() => {
      result.current.setDestinationStation(simpleRoute[3]);
    });

    const route = result.current.calculateRoute(simpleRoute);

    expect(route).toEqual({
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
          totalTime: 2,
          line: 'green',
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
      totalTime: 6,
    } as Route);
  });

  it('calculates the route correctly for route with multiple transfers', async () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: NavigationProvider,
    });

    act(() => {
      result.current.generateStationsMap(multipleTransfersRoute);
    });

    act(() => {
      result.current.setOriginStation(multipleTransfersRoute[0]);
    });

    act(() => {
      result.current.setDestinationStation(multipleTransfersRoute[4]);
    });

    const route = result.current.calculateRoute(multipleTransfersRoute);

    expect(route).toEqual({
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
          totalTime: 2,
          line: 'green',
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
              lines: ['red', 'blue'],
              connectedStations: [
                { id: 'station_c', timeTo: 2 },
                { id: 'station_e', timeTo: 2 } as ConnectedStation,
              ],
            },
          ],
          totalTime: 4,
          line: 'red',
        },
        {
          stationsPath: [
            {
              id: 'station_d',
              name: 'Station d',
              lines: ['red', 'blue'],
              connectedStations: [
                { id: 'station_c', timeTo: 2 },
                { id: 'station_e', timeTo: 2 } as ConnectedStation,
              ],
            },
            {
              id: 'station_e',
              name: 'Station e',
              lines: ['blue'],
              connectedStations: [
                { id: 'station_e', timeTo: 2 } as ConnectedStation,
              ],
            },
          ],
          totalTime: 2,
          line: 'blue',
        },
      ] as SubRoute[],
      totalTime: 8,
    } as Route);
  });

  describe('extractSubRoutes', () => {
    it('extracts sub routes correctly from simple route', () => {
      const calculatedSubRoutes = extractSubRoutes(simpleRoute);

      expect(calculatedSubRoutes).toEqual([
        [
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
        [
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
      ]);
    });

    it('extracts sub routes correctly from route with multiple transfers', () => {
      const calculatedSubRoutes = extractSubRoutes(multipleTransfersRoute);

      expect(calculatedSubRoutes).toEqual([
        [
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
        [
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
            lines: ['red', 'blue'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
              { id: 'station_e', timeTo: 2 } as ConnectedStation,
            ],
          },
        ],
        [
          {
            id: 'station_d',
            name: 'Station d',
            lines: ['red', 'blue'],
            connectedStations: [
              { id: 'station_c', timeTo: 2 },
              { id: 'station_e', timeTo: 2 } as ConnectedStation,
            ],
          },
          {
            id: 'station_e',
            name: 'Station e',
            lines: ['blue'],
            connectedStations: [
              { id: 'station_e', timeTo: 2 } as ConnectedStation,
            ],
          },
        ],
      ]);
    });
  });

  describe('calculateTotalTimeOfSubRoute', () => {
    it('calculates total time of route correctly', () => {
      const calculatedTotalTime = calculateTotalTimeOfSubRoute(simpleRoute);

      expect(calculatedTotalTime).toEqual(6);
    });
  });

  describe('calculateLineOfSubRoute', () => {
    it('calculates lines of route correctly', () => {
      const subRouteLine = calculateLineOfSubRoute(simpleRoute.slice(0, 2));

      expect(subRouteLine).toEqual('green');
    });
  });
});
