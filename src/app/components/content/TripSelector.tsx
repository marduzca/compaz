import React from 'react';
import styles from './TripSelector.module.css';
import { Station } from '../providers/FirebaseProvider';
import Combobox, { Option } from './combobox/Combobox';

interface TripSelectorProps {
  stations: Station[];
  origin: string;
  destination: string;
  onOriginChange: (newOrigin: string) => void;
  onDestinationChange: (newDestination: string) => void;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => (
  <div className={styles.container}>
    {props.stations.length ? (
      <div className={styles.stationsSelector}>
        <Combobox
          name="stations"
          placeholder="Salida"
          options={props.stations.map(
            (station) => ({ value: station.id, text: station.name } as Option)
          )}
          inputValue={props.origin}
          onChange={props.onOriginChange}
          validationError={false}
        />
        <Combobox
          name="stations"
          placeholder="Destino"
          options={props.stations
            .filter((station) => station.name !== origin)
            .map(
              (station) => ({ value: station.id, text: station.name } as Option)
            )}
          inputValue={props.destination}
          onChange={props.onOriginChange}
          validationError={false}
        />
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </div>
);

export default TripSelector;
