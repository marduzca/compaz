import React from 'react';
import styles from './TripSelector.module.css';
import { Station } from '../providers/FirebaseProvider';
import StationsSelectorContainer from './StationsSelectorContainer';

interface TripSelectorProps {
  stations: Station[];
}

const TripSelector: React.FC<TripSelectorProps> = (props) => (
  <div className={styles.container}>
    {props.stations.length ? (
      <StationsSelectorContainer stations={props.stations} />
    ) : (
      <div>Loading...</div>
    )}
  </div>
);

export default TripSelector;
