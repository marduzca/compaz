import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../providers/NavigationProvider';
import RoutesOverview from './RoutesOverview';
import { useFirebase } from '../../providers/FirebaseProvider';
import { Line, Route } from '../../domain';

const lines = [
  {
    id: 'blue',
    connectedLines: [
      { id: 'red', transferTime: 2 },
      { id: 'silver', transferTime: 2 },
    ],
  },
  {
    id: 'red',
    connectedLines: [
      { id: 'blue', transferTime: 2 },
      { id: 'silver', transferTime: 2 },
      { id: 'orange', transferTime: 2 },
    ],
  },
  {
    id: 'silver',
    connectedLines: [
      { id: 'red', transferTime: 2 },
      { id: 'purple', transferTime: 2 },
      { id: 'blue', transferTime: 2 },
      { id: 'yellow', transferTime: 2 },
    ],
  },
  {
    id: 'orange',
    connectedLines: [
      { id: 'red', transferTime: 2 },
      { id: 'white', transferTime: 2 },
    ],
  },
  {
    id: 'white',
    connectedLines: [
      { id: 'brown', transferTime: 2 },
      { id: 'light_blue', transferTime: 2 },
      { id: 'orange', transferTime: 2 },
    ],
  },
  {
    id: 'light_blue',
    connectedLines: [
      { id: 'white', transferTime: 2 },
      { id: 'yellow', transferTime: 2 },
      { id: 'green', transferTime: 2 },
    ],
  },
  { id: 'brown', connectedLines: [{ id: 'white', transferTime: 2 }] },
  { id: 'purple', connectedLines: [{ id: 'silver', transferTime: 2 }] },
  {
    id: 'green',
    connectedLines: [
      { id: 'yellow', transferTime: 2 },
      { id: 'light_blue', transferTime: 2 },
    ],
  },
  {
    id: 'yellow',
    connectedLines: [
      { id: 'green', transferTime: 2 },
      { id: 'light_blue', transferTime: 2 },
      { id: 'silver', transferTime: 2 },
    ],
  },
] as Line[];

interface RoutesOverviewContainerProps {
  onBackButtonClick: () => void;
}

const RoutesOverviewContainer: React.FC<RoutesOverviewContainerProps> = (
  props
) => {
  const {
    calculateRoute,
    origin,
    destination,
    setOriginStation,
    setDestinationStation,
  } = useNavigation();
  const { stations } = useFirebase();

  const [route, setRoute] = useState<Route>({ subRoutes: [], totalTime: 0 });

  useEffect(() => {
    setRoute(calculateRoute(stations, lines));
  }, [calculateRoute, stations]);

  const handleBackButtonClick = () => {
    setOriginStation({
      connectedStations: [],
      id: '',
      lines: [],
      name: '',
    });

    setDestinationStation({
      connectedStations: [],
      id: '',
      lines: [],
      name: '',
    });

    props.onBackButtonClick();
  };

  return (
    <RoutesOverview
      route={route}
      originName={origin.name}
      destinationName={destination.name}
      onBackButtonClick={handleBackButtonClick}
    />
  );
};

export default RoutesOverviewContainer;
