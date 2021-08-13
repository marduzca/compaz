import { act, renderHook } from '@testing-library/react-hooks';
import {
  ShortestPathProvider,
  useShortestPathFinder,
} from './ShortestPathProvider';
import { Station } from '../domain';

describe('ShortestPathProvider', () => {
  const stations = [
    {
      id: 'station_a',
      name: 'Station A',
      lines: ['green'],
      connectedStations: [
        { id: 'station_b', timeTo: 2 },
        { id: 'station_d', timeTo: 1 },
      ],
    },
    {
      id: 'station_b',
      name: 'Station B',
      lines: ['green'],
      connectedStations: [{ id: 'station_a', timeTo: 2 }],
    },
    {
      id: 'station_c',
      name: 'Station C',
      lines: ['green'],
      connectedStations: [],
    },
    {
      id: 'station_d',
      name: 'Station D',
      lines: ['green'],
      connectedStations: [
        { id: 'station_a', timeTo: 1 },
        { id: 'station_e', timeTo: 2 },
      ],
    },
    {
      id: 'station_e',
      name: 'Station E',
      lines: ['green'],
      connectedStations: [{ id: 'station_d', timeTo: 2 }],
    },
  ] as Station[];

  it('converts the stations list into a stations map correctly', () => {
    const { result } = renderHook(() => useShortestPathFinder(), {
      wrapper: ShortestPathProvider,
    });

    act(() => {
      result.current.createStationsMap(stations);
    });

    expect(result.current.stationsMap).toEqual({
      station_a: { station_b: 2, station_d: 1 },
      station_b: { station_a: 2 },
      station_c: {},
      station_d: { station_a: 1, station_e: 2 },
      station_e: { station_d: 2 },
    });
  });

  it('calculates the shortest path correctly', () => {
    const { result } = renderHook(() => useShortestPathFinder(), {
      wrapper: ShortestPathProvider,
    });

    act(() => {
      result.current.createStationsMap(stations);
    });

    const shortestPath = result.current.findShortestPath(
      'station_a',
      'station_e'
    );

    expect(shortestPath).toEqual(['station_a', 'station_d', 'station_e']);
  });
});
