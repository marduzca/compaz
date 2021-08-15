import React, { createContext, useContext, useState } from 'react';
import { Station } from '../domain';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dijkstra = require('dijkstrajs');

interface StationsMap {
  [stationID: string]: ConnectedStationTimeTo;
}

interface ConnectedStationTimeTo {
  [connectedStationID: string]: number;
}

interface NavigationContextProps {
  origin: Station;
  destination: Station;
  setOriginStation: (newOrigin: Station) => void;
  setDestinationStation: (newDestination: Station) => void;
  findShortestPath: (
    stations: Station[],
    fromStationID: string,
    toStationID: string
  ) => string[];
}

export const NavigationContext = createContext<NavigationContextProps>({
  origin: {
    connectedStations: [],
    id: '',
    lines: [],
    name: '',
  },
  destination: {
    connectedStations: [],
    id: '',
    lines: [],
    name: '',
  },
  setOriginStation: () => {},
  setDestinationStation: () => {},
  findShortestPath: () => [],
});

export const NavigationProvider: React.FC = (props) => {
  const [origin, setOrigin] = useState<Station>({
    connectedStations: [],
    id: '',
    lines: [],
    name: '',
  });
  const [destination, setDestination] = useState<Station>({
    connectedStations: [],
    id: '',
    lines: [],
    name: '',
  });

  const setOriginStation = (newOrigin: Station) => {
    setOrigin(newOrigin);
  };

  const setDestinationStation = (newDestination: Station) => {
    setDestination(newDestination);
  };

  const generateStationsMap = (stations: Station[]): StationsMap => {
    const stationsMap = {} as StationsMap;

    stations.forEach((station) => {
      const connectedStationTimeTo = {} as ConnectedStationTimeTo;

      station.connectedStations.forEach((connectedStation) => {
        connectedStationTimeTo[`${connectedStation.id}`] =
          connectedStation.timeTo;
      });

      stationsMap[`${station.id}`] = connectedStationTimeTo;
    });

    return stationsMap;
  };

  const findShortestPath = (
    stations: Station[],
    originStationID: string,
    destinationStationID: string
  ): string[] => {
    const stationsMap = generateStationsMap(stations);

    const findPath = dijkstra.find_path;

    return findPath(stationsMap, originStationID, destinationStationID);
  };

  return (
    <NavigationContext.Provider
      value={{
        origin,
        destination,
        setOriginStation,
        setDestinationStation,
        findShortestPath,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};

const useNavigation = (): NavigationContextProps =>
  useContext<NavigationContextProps>(NavigationContext);

export { useNavigation };
