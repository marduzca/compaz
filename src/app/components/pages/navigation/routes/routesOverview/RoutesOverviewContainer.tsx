import React, { useState } from 'react';
import { useNavigation } from '../../../../providers/navigation/NavigationProvider';
import RoutesOverview from './RoutesOverview';
import { Route } from '../../../../domain';
import { addMinutesToDate, reduceMinutesToDate } from '../../dateFormatter';

interface RoutesOverviewContainerProps {
  route: Route;
  onRouteSelection: (departureTime: Date) => void;
  onBackButtonClick: () => void;
}

const RoutesOverviewContainer: React.FC<RoutesOverviewContainerProps> = (
  props
) => {
  const { origin, destination, departureDate, departureTime } = useNavigation();

  const departureDateAndTime = new Date(`${departureDate}T${departureTime}`);

  const [displayedRouteTimes, setDisplayedRouteTimes] = useState<Date[]>([
    departureDateAndTime,
    addMinutesToDate(departureDateAndTime, 5),
    addMinutesToDate(departureDateAndTime, 10),
    addMinutesToDate(departureDateAndTime, 15),
  ]);

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
      route={props.route}
      originName={origin ? origin.name : ''}
      destinationName={destination ? destination.name : ''}
      dateAndTime={departureDateAndTime}
      displayedRouteTimes={displayedRouteTimes}
      onRouteSelection={props.onRouteSelection}
      onBackButtonClick={props.onBackButtonClick}
      onEarlierButtonClick={handleEarlierButtonClick}
      onLaterButtonClick={handleLaterButtonClick}
    />
  );
};

export default RoutesOverviewContainer;
