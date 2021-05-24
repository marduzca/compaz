import React from 'react';
import TripSelector from './TripSelector';
import { useFirebase } from '../providers/FirebaseProvider';

const TripSelectorContainer: React.FC = () => {
  const { stations } = useFirebase();

  return <TripSelector stations={stations} />;
};

export default TripSelectorContainer;
