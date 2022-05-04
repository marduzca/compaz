import React, { useState } from 'react';
import TripSelector from './TripSelector';
import { useNavigation } from '../../providers/navigation/NavigationProvider';

interface TripSelectorContainerProps {
  onMenuButtonClick: () => void;
  onSearchButtonClick: () => void;
}

const TripSelectorContainer: React.FC<TripSelectorContainerProps> = (props) => {
  const { origin, destination } = useNavigation();

  const [showOriginMissingError, setShowOriginMissingError] =
    useState<boolean>(false);
  const [showDestinationMissingError, setShowDestinationMissingError] =
    useState<boolean>(false);

  const handleSearchButtonClick = () => {
    if (origin && destination) {
      setShowOriginMissingError(false);
      setShowDestinationMissingError(false);

      props.onSearchButtonClick();
    } else {
      setShowOriginMissingError(!origin);
      setShowDestinationMissingError(!destination);
    }
  };

  return (
    <TripSelector
      onMenuButtonClick={props.onMenuButtonClick}
      onSearchButtonClick={handleSearchButtonClick}
      showOriginMissingError={showOriginMissingError}
      showDestinationMissingError={showDestinationMissingError}
    />
  );
};

export default TripSelectorContainer;
