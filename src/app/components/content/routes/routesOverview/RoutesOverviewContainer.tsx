import React, { useState } from 'react';
import { useNavigation } from '../../../providers/NavigationProvider';
import RoutesOverview from './RoutesOverview';
import { NotificationEvent, Route } from '../../../domain';
import { addMinutesToDate, reduceMinutesToDate } from '../../dateFormatter';
import { NotificationType } from '../../../notification/Notification';
import { GENERAL_ERROR_NOTIFICATION_KEY } from '../../../notification/NotificationContainer';

interface RoutesOverviewContainerProps {
  route: Route;
  onRouteSelection: (departureTime: Date) => void;
  onBackButtonClick: () => void;
}

const RoutesOverviewContainer: React.FC<RoutesOverviewContainerProps> = (
  props
) => {
  const {
    origin,
    destination,
    setOriginStation,
    setDestinationStation,
    departureDate,
    departureTime,
  } = useNavigation();

  const departureDateAndTime = new Date(`${departureDate}T${departureTime}`);

  const [displayedRouteTimes, setDisplayedRouteTimes] = useState<Date[]>([
    departureDateAndTime,
    addMinutesToDate(departureDateAndTime, 5),
    addMinutesToDate(departureDateAndTime, 10),
    addMinutesToDate(departureDateAndTime, 15),
  ]);

  if (!origin || !destination) {
    // This should actually not be possible
    window.dispatchEvent(
      new CustomEvent('notification', {
        detail: {
          type: NotificationType.ERROR,
          content: GENERAL_ERROR_NOTIFICATION_KEY,
        } as NotificationEvent,
      })
    );
  }

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
      route={props.route}
      originName={origin ? origin.name : ''}
      destinationName={destination ? destination.name : ''}
      dateAndTime={departureDateAndTime}
      displayedRouteTimes={displayedRouteTimes}
      onRouteSelection={props.onRouteSelection}
      onBackButtonClick={handleBackButtonClick}
      onEarlierButtonClick={handleEarlierButtonClick}
      onLaterButtonClick={handleLaterButtonClick}
    />
  );
};

export default RoutesOverviewContainer;
