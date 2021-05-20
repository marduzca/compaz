import React from 'react';
import TripSelector from './TripSelector';
import { Station } from '../../App';

interface TripSelectorContainerProps {
  stations: Station[] | undefined;
}

const TripSelectorContainer: React.FC<TripSelectorContainerProps> = (props) => (
  <TripSelector stations={props.stations} />
);

export default TripSelectorContainer;
