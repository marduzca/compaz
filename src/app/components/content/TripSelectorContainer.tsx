import React from 'react';
import TripSelector from './TripSelector';
import { useStations } from '../providers/FirebaseProvider';

interface TripSelectorContainerProps {
  onMenuButtonClick: () => void;
}

const TripSelectorContainer: React.FC<TripSelectorContainerProps> = (props) => {
  const { stations } = useStations();

  return (
    <TripSelector
      stations={stations}
      onMenuButtonClick={props.onMenuButtonClick}
    />
  );
};

export default TripSelectorContainer;
