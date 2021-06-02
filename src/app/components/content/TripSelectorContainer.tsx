import React from 'react';
import TripSelector from './TripSelector';
import { useStations } from '../providers/FirebaseProvider';

const TripSelectorContainer: React.FC = () => {
  const { stations } = useStations();

  return <TripSelector stations={stations} />;
};

export default TripSelectorContainer;
