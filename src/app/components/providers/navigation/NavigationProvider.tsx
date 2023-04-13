import React, { createContext, useContext, useState } from 'react';
// @ts-ignore
import dijkstra from 'dijkstrajs';
import { Line, LineColor, Route, Station, SubRoute } from '../../domain';
import {
  parseToSimpleDate,
  parseToSimpleTime,
} from '../../pages/navigation/util/dateFormatter';

interface StationsMap {
  [stationID: string]: ConnectedStationTimeTo;
}

interface ConnectedStationTimeTo {
  [connectedStationID: string]: number;
}

interface NavigationContextInterface {
  origin: Station | undefined;
  destination: Station | undefined;
  departureTime: string;
  departureDate: string;
  setNewDepartureTime: (newDepartureTime: string) => void;
  setNewDepartureDate: (newDepartureDate: string) => void;
  setOriginStation: (newOrigin: Station | undefined) => void;
  setDestinationStation: (newDestination: Station | undefined) => void;
  generateStationsMap: (stations: Station[]) => void;
  calculateRoute: (stations: Station[], lines: Line[]) => Route;
}

export const NavigationContext = createContext<NavigationContextInterface>({
  origin: undefined,
  destination: undefined,
  departureTime: '',
  departureDate: '',
  setNewDepartureTime: () => {},
  setNewDepartureDate: () => {},
  setOriginStation: () => {},
  setDestinationStation: () => {},
  generateStationsMap: () => {},
  calculateRoute: () => ({ subRoutes: [], totalTime: 0, price: 0 } as Route),
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

  // Add intermediate station time
  if (subRoute.length > 2) {
    totalTime += TIME_INTERMEDIATE_STATION * (subRoute.length - 2);
  }

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
            transferTimeToNextLine: Math.round(nextLine.transferTime),
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

const INITIAL_PRICE = 3;
const TRANSFER_PRICE = 2;
const TIME_INTERMEDIATE_STATION = 1.33;

const calculateRoutePrice = (subRoutes: SubRoute[]): number => {
  let routePrice = INITIAL_PRICE + TRANSFER_PRICE * (subRoutes.length - 1);

  subRoutes.forEach((subRoute, index) => {
    // Price exception for white-lightblue line: If there is a connection that connects both, the transfer is free
    if (
      subRoute.line === LineColor.WHITE &&
      ((subRoutes[index - 1] &&
        subRoutes[index - 1].line === LineColor.LIGHT_BLUE) ||
        (subRoutes[index + 1] &&
          subRoutes[index + 1].line === LineColor.LIGHT_BLUE))
    ) {
      routePrice -= 2;
    }

    // Price exception for brown line: If you use the brown line connecting with others (not just that line), the transfer is free
    if (subRoute.line === LineColor.BROWN && subRoutes.length > 1) {
      routePrice -= 2;
    }
  });

  return routePrice;
};

interface NavigationProviderProps {
  children: React.ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = (
  props
) => {
  const [origin, setOrigin] = useState<Station | undefined>(undefined);
  const [destination, setDestination] = useState<Station | undefined>(
    undefined
  );
  const [departureTime, setDepartureTime] = useState<string>(
    parseToSimpleTime(new Date())
  );
  const [departureDate, setDepartureDate] = useState<string>(
    parseToSimpleDate(new Date())
  );
  const [stationsMap, setStationsMap] = useState<StationsMap>({});

  const setOriginStation = (newOrigin: Station | undefined) => {
    setOrigin(newOrigin);
  };

  const setDestinationStation = (newDestination: Station | undefined) => {
    setDestination(newDestination);
  };

  const setNewDepartureTime = (newDepartureTime: string) => {
    setDepartureTime(newDepartureTime);
  };

  const setNewDepartureDate = (newDepartureDate: string) => {
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

    return findPath(stationsMap, origin?.id, destination?.id).map(
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
      if (subRoute.stationsPath.length === 1) {
        return;
      }

      // Add transfer time
      if (subRoute.transferTimeToNextLine) {
        totalTimeOfFullRoute += subRoute.transferTimeToNextLine;
      }
    });

    const routePrice = calculateRoutePrice(subRoutesWithTimeAndLineInfo);

    return {
      subRoutes: subRoutesWithTimeLineAndTransferInfo,
      totalTime: totalTimeOfFullRoute,
      price: routePrice,
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

const useNavigation = (): NavigationContextInterface =>
  useContext<NavigationContextInterface>(NavigationContext);

export { useNavigation };
