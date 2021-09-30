import React, { useEffect, useState } from 'react';
import { useNavigation } from '../../providers/NavigationProvider';
import RoutesOverview from './RoutesOverview';
import { useFirebase } from '../../providers/FirebaseProvider';
import { Route } from '../../domain';
import {
  addMinutesToDate,
  parseToSimpleDate,
  reduceMinutesToDate,
} from '../dateFormatter';

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
    departureDate,
    departureTime,
  } = useNavigation();
  const { stations, lines } = useFirebase();

  const departureDateAndTime = new Date(
    `${parseToSimpleDate(departureDate)} ${departureTime}`
  );

  const [route, setRoute] = useState<Route>({ subRoutes: [], totalTime: 0 });
  const [displayedRouteTimes, setDisplayedRouteTimes] = useState<Date[]>([
    departureDateAndTime,
    addMinutesToDate(departureDateAndTime, 5),
    addMinutesToDate(departureDateAndTime, 10),
    addMinutesToDate(departureDateAndTime, 15),
  ]);

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

  const handleEarlierButtonClick = () => {
    const updatedDisplayedRouteTimes = [...displayedRouteTimes];
    updatedDisplayedRouteTimes.unshift(
      reduceMinutesToDate(updatedDisplayedRouteTimes[0], 5)
    );

    setDisplayedRouteTimes(updatedDisplayedRouteTimes);
  };

  const handleLaterButtonClick = () => {
    const updatedDisplayedRouteTimes = [...displayedRouteTimes];
    updatedDisplayedRouteTimes.push(
      addMinutesToDate(
        updatedDisplayedRouteTimes[updatedDisplayedRouteTimes.length - 1],
        5
      )
    );

    setDisplayedRouteTimes(updatedDisplayedRouteTimes);
  };

  return (
    <RoutesOverview
      route={route}
      originName={origin.name}
      destinationName={destination.name}
      dateAndTime={departureDateAndTime}
      displayedRouteTimes={displayedRouteTimes}
      onBackButtonClick={handleBackButtonClick}
      onEarlierButtonClick={handleEarlierButtonClick}
      onLaterButtonClick={handleLaterButtonClick}
    />
  );
};

export default RoutesOverviewContainer;
