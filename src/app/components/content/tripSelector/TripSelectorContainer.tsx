import React from 'react';
import TripSelector from './TripSelector';
import { useFirebase } from '../../providers/FirebaseProvider';

interface TripSelectorContainerProps {
  onMenuButtonClick: () => void;
  onSearchButtonClick: () => void;
}

const TripSelectorContainer: React.FC<TripSelectorContainerProps> = (props) => {
  const { MAPS_API_KEY } = useFirebase();

  return (
    <TripSelector
      onMenuButtonClick={props.onMenuButtonClick}
      onSearchButtonClick={props.onSearchButtonClick}
      mapsApiKey={MAPS_API_KEY}
    />
  );
};

export default TripSelectorContainer;
