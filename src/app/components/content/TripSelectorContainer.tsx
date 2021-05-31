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

  const isStationsListEmpty = (searchTerm: string): boolean =>
    !stations.some((station) =>
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleOriginChange = (newOrigin: string) => {
    setOrigin(newOrigin);

    setOriginValidationError(isStationsListEmpty(newOrigin));
  };

  const handleDestinationChange = (newDestination: string) => {
    setDestination(newDestination);

    setDestinationValidationError(isStationsListEmpty(newDestination));
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
    />
  );
};

export default TripSelectorContainer;
