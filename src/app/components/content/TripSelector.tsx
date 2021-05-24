import React from 'react';
import styles from './TripSelector.module.css';
import { Station } from '../../App';

interface TripSelectorProps {
  stations: Station[];
}

const TripSelector: React.FC<TripSelectorProps> = (props) => (
  <div className={styles.container}>
    {props.stations.length ? (
      <select name="stations" id="stations">
        {props.stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);

export default TripSelector;
