import React, { useState } from 'react';
import StationsSelector from './StationsSelector';
import { Station } from '../../providers/FirebaseProvider';

interface StationsSelectorContainerProps {
  stations: Station[];
}

const StationsSelectorContainer: React.FC<StationsSelectorContainerProps> = (
  props
) => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
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
    setOrigin(newOrigin);
    setOriginValidationError(shouldShowValidationError(destination, newOrigin));
  };

  const handleDestinationChange = (newDestination: string) => {
    setDestination(newDestination);
    setDestinationValidationError(
      shouldShowValidationError(origin, newDestination)
    );
  };

  const handleSwitcherClick = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <StationsSelector
      origin={origin}
      destination={destination}
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
