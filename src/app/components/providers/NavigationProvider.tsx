import React, { createContext, useContext, useState } from 'react';
import { Line, Route, Station, SubRoute } from '../domain';

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
  calculateRoute: (stations: Station[], lines: Line[]) => Route;
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
  calculateRoute: () => ({ subRoutes: [], totalTime: 0 }),
});

const identifyTransferPositions = (stationsPath: Station[]): number[] => {
  const transferPositions = [] as number[];

  stationsPath.forEach((subPath, index) => {
    if (index < stationsPath.length - 2) {
      if (stationsPath[index + 1].lines.length > 1) {
        // Next station is connected to more than one line
        if (
          !stationsPath[index + 2].lines.some((line) =>
            subPath.lines.includes(line)
          ) // Station after the next one doesn't belong to line of current station
        ) {
          transferPositions.push(index + 1);
        }
      }
    }
  });

  return transferPositions;
};

export const extractSubRoutes = (stationsPath: Station[]): Station[][] => {
  const subRoutes = [] as Station[][];
  const transferPositions = identifyTransferPositions(stationsPath);

  if (transferPositions.length === 0) {
    subRoutes.push(stationsPath);
    return subRoutes;
  }

  subRoutes.push(stationsPath.slice(0, transferPositions[0] + 1));

  transferPositions.forEach((transferPoint, index) => {
    if (index !== transferPositions.length - 1) {
      subRoutes.push(
        stationsPath.slice(transferPoint, transferPositions[index + 1] + 1)
      );
    }
  });

  subRoutes.push(
    stationsPath.slice(
      transferPositions[transferPositions.length - 1],
      stationsPath.length
    )
  );

  return subRoutes;
};

export const calculateTotalTimeOfSubRoute = (subRoute: Station[]) => {
  let totalTime = 0;

  subRoute.forEach((station, index) => {
    if (index < subRoute.length - 1) {
      const nextStation = station.connectedStations.find(
        (connectedStation) => connectedStation.id === subRoute[index + 1].id
      );

      if (nextStation) totalTime += nextStation.timeTo;
    }
  });

  return Math.round(totalTime);
};

export const calculateLineOfSubRoute = (subRoute: Station[]) => {
  const allLinesInSubRoute = subRoute.map((station) => station.lines);

  return allLinesInSubRoute.reduce((lineListA, lineListB) =>
    lineListA.filter((line) => lineListB.includes(line))
  )[0];
};

export const calculateTotalTransferTime = (
  subRoutesWithTimeAndLineInfo: SubRoute[],
  lines: Line[]
) => {
  let totalTransferTime = 0;

  subRoutesWithTimeAndLineInfo.forEach((subRoute, index) => {
    if (
      subRoutesWithTimeAndLineInfo[index + 1] &&
      subRoutesWithTimeAndLineInfo[index + 1].line !== subRoute.line
    ) {
      const currentLine = lines.find((line) => line.id === subRoute.line);

      if (currentLine) {
        const nextLine = currentLine.connectedLines.find(
          (connectedLine) =>
            connectedLine.id === subRoutesWithTimeAndLineInfo[index + 1].line
        );

        if (nextLine) {
          totalTransferTime += nextLine.transferTime;
        }
      }
    }
  });

  return totalTransferTime;
};

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

  const findShortestPathFromOriginToDestination = (
    allStations: Station[]
  ): Station[] => {
    const findPath = dijkstra.find_path;

    return findPath(stationsMap, origin.id, destination.id).map(
      (stationId: string) =>
        allStations.find((station) => station.id === stationId)
    );
  };

  const calculateRoute = (allStations: Station[], lines: Line[]): Route => {
    const stationsPath = findShortestPathFromOriginToDestination(allStations);

    const subRoutes = extractSubRoutes(stationsPath);

    let totalTimeOfFullRoute = 0;

    const subRoutesWithTimeAndLineInfo = subRoutes.map((subRoute) => {
      const totalTimeOfSubRoute = calculateTotalTimeOfSubRoute(subRoute);
      totalTimeOfFullRoute += totalTimeOfSubRoute;

      const subRouteLine = calculateLineOfSubRoute(subRoute);

      return {
        stationsPath: subRoute,
        totalTime: totalTimeOfSubRoute,
        line: subRouteLine,
      } as SubRoute;
    });

    totalTimeOfFullRoute += calculateTotalTransferTime(
      subRoutesWithTimeAndLineInfo,
      lines
    );

    return {
      subRoutes: subRoutesWithTimeAndLineInfo,
      totalTime: totalTimeOfFullRoute,
    } as Route;
  };

  return (
    <NavigationContext.Provider
      value={{
        origin,
        destination,
        setOriginStation,
        setDestinationStation,
        generateStationsMap,
        calculateRoute,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};

const useNavigation = (): NavigationContextProps =>
  useContext<NavigationContextProps>(NavigationContext);

export { useNavigation };
