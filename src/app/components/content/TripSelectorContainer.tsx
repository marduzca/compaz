import React, { useState } from 'react';
import TripSelector from './TripSelector';
import { useStations } from '../providers/FirebaseProvider';

const TripSelectorContainer: React.FC = () => {
  const { stations } = useStations();
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  const handleOriginChange = (newOrigin: string) => {
    setOrigin(newOrigin);
  };

  const handleDestinationChange = (newDestination: string) => {
    setDestination(newDestination);
  };

  return (
    <TripSelector
      stations={stations}
      origin={origin}
      onOriginChange={handleOriginChange}
      destination={destination}
      onDestinationChange={handleDestinationChange}
    />
  );
};

export default TripSelectorContainer;
