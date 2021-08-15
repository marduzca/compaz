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
  generateStationsMap: (stations: Station[]) => void;
  findShortestPathFromOriginToDestination: () => string[];
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
  generateStationsMap: () => {},
  findShortestPathFromOriginToDestination: () => [],
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
  const [stationsMap, setStationsMap] = useState<StationsMap>({});

  const setOriginStation = (newOrigin: Station) => {
    setOrigin(newOrigin);
  };

  const setDestinationStation = (newDestination: Station) => {
    setDestination(newDestination);
  };

  const generateStationsMap = (stations: Station[]) => {
    const generatedStationsMap = {} as StationsMap;

    stations.forEach((station) => {
      const connectedStationTimeTo = {} as ConnectedStationTimeTo;

      station.connectedStations.forEach((connectedStation) => {
        connectedStationTimeTo[`${connectedStation.id}`] =
          connectedStation.timeTo;
      });

      generatedStationsMap[`${station.id}`] = connectedStationTimeTo;
    });

    setStationsMap(generatedStationsMap);
  };

  const findShortestPathFromOriginToDestination = (): string[] => {
    const findPath = dijkstra.find_path;

    return findPath(stationsMap, origin.id, destination.id);
  };

  return (
    <NavigationContext.Provider
      value={{
        origin,
        destination,
        setOriginStation,
        setDestinationStation,
        generateStationsMap,
        findShortestPathFromOriginToDestination,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};

const useNavigation = (): NavigationContextProps =>
  useContext<NavigationContextProps>(NavigationContext);

export { useNavigation };
