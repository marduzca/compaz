import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../providers/NavigationProvider';
import RoutesOverview from './RoutesOverview';
import { useFirebase } from '../../providers/FirebaseProvider';
import { Route } from '../../domain';

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
  const { stations, lines } = useFirebase();

  const [route, setRoute] = useState<Route>({ subRoutes: [], totalTime: 0 });

  useEffect(() => {
    setRoute(calculateRoute(stations, lines));
  }, [calculateRoute, lines, stations]);

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
      dateAndTime={new Date('2021-09-24 17:30')}
      onBackButtonClick={handleBackButtonClick}
    />
  );
};

export default RoutesOverviewContainer;
