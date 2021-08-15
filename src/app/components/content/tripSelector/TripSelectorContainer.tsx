import React from 'react';
import TripSelector from './TripSelector';

interface TripSelectorContainerProps {
  onMenuButtonClick: () => void;
}

const TripSelectorContainer: React.FC<TripSelectorContainerProps> = (props) => (
  <TripSelector onMenuButtonClick={props.onMenuButtonClick} />
);

export default TripSelectorContainer;
