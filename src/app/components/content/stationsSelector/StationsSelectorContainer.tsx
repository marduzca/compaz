import React, { useState } from 'react';
import StationsSelector from './StationsSelector';
import { Station } from '../../domain';
import { useNavigation } from '../../providers/NavigationProvider';

interface StationsSelectorContainerProps {
  stations: Station[];
}

const StationsSelectorContainer: React.FC<StationsSelectorContainerProps> = (
  props
) => {
  const { origin, destination, setOriginStation, setDestinationStation } =
    useNavigation();

  const [originInputValue, setOriginInputValue] = useState<string>('');
  const [destinationInputValue, setDestinationInputValue] =
    useState<string>('');
  const [originValidationError, setOriginValidationError] =
    useState<boolean>(false);
  const [destinationValidationError, setDestinationValidationError] =
    useState<boolean>(false);

  const shouldShowValidationError = (
    filterOutValue: string,
    searchTerm: string
  ): boolean =>
    !props.stations
      .filter((station) => station.name !== filterOutValue)
      .some((station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleOriginChange = (newOrigin: string) => {
    setOriginInputValue(newOrigin);
    setOriginValidationError(
      shouldShowValidationError(destination.name, newOrigin)
    );

    const newOriginStation = props.stations.find(
      (station) => station.name === newOrigin
    );
    if (newOriginStation) {
      setOriginStation(newOriginStation);
    }
  };

  const handleDestinationChange = (newDestination: string) => {
    setDestinationInputValue(newDestination);
    setDestinationValidationError(
      shouldShowValidationError(origin.name, newDestination)
    );

    const newDestinationStation = props.stations.find(
      (station) => station.name === newDestination
    );
    if (newDestinationStation) {
      setDestinationStation(newDestinationStation);
    }
  };

  const handleSwitcherClick = () => {
    setOriginStation(destination);
    setDestinationStation(origin);

    setOriginInputValue(destinationInputValue);
    setDestinationInputValue(originInputValue);
  };

  return (
    <StationsSelector
      originInputValue={originInputValue}
      destinationInputValue={destinationInputValue}
      onOriginChange={handleOriginChange}
      onDestinationChange={handleDestinationChange}
      originValidationError={originValidationError}
      destinationValidationError={destinationValidationError}
      onSwitcherClick={handleSwitcherClick}
      stations={props.stations}
    />
  );
};

export default StationsSelectorContainer;
