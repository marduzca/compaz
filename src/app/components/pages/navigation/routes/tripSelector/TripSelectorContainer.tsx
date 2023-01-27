import React from 'react';
import TripSelector from './TripSelector';

interface TripSelectorContainerProps {
  onMenuButtonClick: () => void;
  onSearchButtonClick: (event: React.FormEvent) => void;
}

const TripSelectorContainer: React.FC<TripSelectorContainerProps> = (props) => (
  <TripSelector
    onMenuButtonClick={props.onMenuButtonClick}
    onSubmit={props.onSearchButtonClick}
  />
);

export default TripSelectorContainer;
