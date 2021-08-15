import { act, renderHook } from '@testing-library/react-hooks';
import { NavigationProvider, useNavigation } from './NavigationProvider';
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

  it('calculates the shortest path correctly', async () => {
    const { result } = renderHook(() => useNavigation(), {
      wrapper: NavigationProvider,
    });

    act(() => {
      result.current.generateStationsMap(stations);
    });

    act(() => {
      result.current.setOriginStation(stations[0]);
    });

    act(() => {
      result.current.setDestinationStation(stations[4]);
    });

    const shortestPath =
      result.current.findShortestPathFromOriginToDestination();

    expect(shortestPath).toEqual(['station_a', 'station_d', 'station_e']);
  });
});
