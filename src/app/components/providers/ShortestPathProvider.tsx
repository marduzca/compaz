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

interface ShortestPathContext {
  stationsMap: StationsMap;
  createStationsMap: (stations: Station[]) => void;
  findShortestPath: (fromStationID: string, toStationID: string) => string[];
}

export const ShortestPathContext = createContext<ShortestPathContext>({
  stationsMap: {},
  createStationsMap: () => {},
  findShortestPath: () => [],
});

export const ShortestPathProvider: React.FC = (props) => {
  const [stationsMap, setStationsMap] = useState<StationsMap>({});
  const findPath = dijkstra.find_path;

  const createStationsMap = (stations: Station[]) => {
    const stationsObject = {} as StationsMap;

    stations.forEach((station) => {
      const connectedStationsObject = {} as ConnectedStationTimeTo;

      station.connectedStations.forEach((connectedStation) => {
        connectedStationsObject[`${connectedStation.id}`] =
          connectedStation.timeTo;
      });

      stationsObject[`${station.id}`] = connectedStationsObject;
    });

    setStationsMap(stationsObject);
  };

  const findShortestPath = (
    fromStationID: string,
    toStationID: string
  ): string[] => findPath(stationsMap, fromStationID, toStationID);

  return (
    <ShortestPathContext.Provider
      value={{
        stationsMap: stationsMap || {},
        createStationsMap,
        findShortestPath,
      }}
    >
      {props.children}
    </ShortestPathContext.Provider>
  );
};

const useShortestPathFinder = (): ShortestPathContext =>
  useContext<ShortestPathContext>(ShortestPathContext);

export { useShortestPathFinder };
