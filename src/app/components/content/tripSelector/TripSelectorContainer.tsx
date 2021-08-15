import React from 'react';
import TripSelector from './TripSelector';

interface TripSelectorContainerProps {
  onMenuButtonClick: () => void;
  onSearchButtonClick: () => void;
}

const TripSelectorContainer: React.FC<TripSelectorContainerProps> = (props) => (
  <TripSelector
    onMenuButtonClick={props.onMenuButtonClick}
    onSearchButtonClick={props.onSearchButtonClick}
  />
);

export default TripSelectorContainer;
