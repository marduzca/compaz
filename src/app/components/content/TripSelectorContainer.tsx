import React, { useState } from 'react';
import TripSelector from './TripSelector';
import { useStations } from '../providers/FirebaseProvider';

const TripSelectorContainer: React.FC = () => {
  const { stations } = useStations();
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
    !stations
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
    <TripSelector
      stations={stations}
      origin={origin}
      onOriginChange={handleOriginChange}
      destination={destination}
      onDestinationChange={handleDestinationChange}
      originValidationError={originValidationError}
      destinationValidationError={destinationValidationError}
      onSwitcherClick={handleSwitcherClick}
    />
  );
};

export default TripSelectorContainer;
