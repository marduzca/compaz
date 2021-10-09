import React, { createContext, useContext, useState } from 'react';
import { Line, Route, Station, SubRoute } from '../domain';
import { parseToSimpleTime } from '../content/dateFormatter';

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
  departureTime: string;
  departureDate: Date;
  setNewDepartureTime: (newDepartureTime: string) => void;
  setNewDepartureDate: (newDepartureDate: Date) => void;
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
  departureTime: '',
  departureDate: new Date(),
  setNewDepartureTime: () => {},
  setNewDepartureDate: () => {},
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

export const calculateLineOfSubRoute = (
  subRoute: Station[],
  lines: Line[]
): Line => {
  const lineInCommon = lines.find((line) =>
    subRoute.every((station) => station.lines.includes(line.id))
  );

  if (lineInCommon) {
    return lineInCommon;
  }

  return {
    id: 'unknown',
    stationsPath: [],
    connectedLines: [],
  };
};

export const calculateDirectionOfSubRoute = (
  allStations: Station[],
  subRouteLine: Line,
  subRoute: Station[]
): string => {
  const positionOfSubRouteStartWithinLine = subRouteLine.stationsPath.indexOf(
    subRoute[0].id
  );
  const positionOfSubRouteEndWithinLine = subRouteLine.stationsPath.indexOf(
    subRoute[subRoute.length - 1].id
  );

  if (
    positionOfSubRouteStartWithinLine < 0 ||
    positionOfSubRouteEndWithinLine < 0
  ) {
    return 'unknown';
  }

  const directionId =
    positionOfSubRouteStartWithinLine < positionOfSubRouteEndWithinLine
      ? subRouteLine.stationsPath[subRouteLine.stationsPath.length - 1]
      : subRouteLine.stationsPath[0];

  const directionStation = allStations.find(
    (station) => station.id === directionId
  );

  if (!directionStation) {
    return 'unknown';
  }

  return directionStation.name;
};

export const addTransferTimeBetweenLines = (
  subRoutesWithTimeAndLineInfo: SubRoute[],
  lines: Line[]
): SubRoute[] => {
  if (subRoutesWithTimeAndLineInfo.length === 1) {
    return subRoutesWithTimeAndLineInfo;
  }

  const subRoutesWithTimeLineAndTransferInfo = [] as SubRoute[];

  subRoutesWithTimeAndLineInfo.forEach((subRoute, index) => {
    if (subRoutesWithTimeAndLineInfo[index + 1]) {
      const currentLine = lines.find((line) => line.id === subRoute.line);

      if (currentLine) {
        const nextLine = currentLine.connectedLines.find(
          (connectedLine) =>
            connectedLine.id === subRoutesWithTimeAndLineInfo[index + 1].line
        );

        if (nextLine) {
          subRoutesWithTimeLineAndTransferInfo.push({
            ...subRoute,
            transferTimeToNextLine: nextLine.transferTime,
          });
        }
      }
    } else {
      // Add last sub route
      subRoutesWithTimeLineAndTransferInfo.push(subRoute);
    }
  });

  return subRoutesWithTimeLineAndTransferInfo;
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
  const [departureTime, setDepartureTime] = useState<string>(
    parseToSimpleTime(new Date(Date.now()))
  );
  const [departureDate, setDepartureDate] = useState<Date>(
    new Date(Date.now())
  );
  const [stationsMap, setStationsMap] = useState<StationsMap>({});

  const setOriginStation = (newOrigin: Station) => {
    setOrigin(newOrigin);
  };

  const setDestinationStation = (newDestination: Station) => {
    setDestination(newDestination);
  };

  const setNewDepartureTime = (newDepartureTime: string) => {
    setDepartureTime(newDepartureTime);
  };

  const setNewDepartureDate = (newDepartureDate: Date) => {
    setDepartureDate(newDepartureDate);
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

      const subRouteLine = calculateLineOfSubRoute(subRoute, lines);

      const subRouteDirection = calculateDirectionOfSubRoute(
        allStations,
        subRouteLine,
        subRoute
      );

      return {
        stationsPath: subRoute,
        totalTime: totalTimeOfSubRoute,
        line: subRouteLine.id,
        direction: subRouteDirection,
      } as SubRoute;
    });

    const subRoutesWithTimeLineAndTransferInfo = addTransferTimeBetweenLines(
      subRoutesWithTimeAndLineInfo,
      lines
    );

    subRoutesWithTimeLineAndTransferInfo.forEach((subRoute) => {
      if (subRoute.transferTimeToNextLine) {
        totalTimeOfFullRoute += subRoute.transferTimeToNextLine;
      }
    });

    return {
      subRoutes: subRoutesWithTimeLineAndTransferInfo,
      totalTime: totalTimeOfFullRoute,
    } as Route;
  };

  return (
    <NavigationContext.Provider
      value={{
        origin,
        destination,
        departureTime,
        departureDate,
        setNewDepartureTime,
        setNewDepartureDate,
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
