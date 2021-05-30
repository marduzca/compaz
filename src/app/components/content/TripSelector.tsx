import React, { useState } from 'react';
import styles from './TripSelector.module.css';
import { Station } from '../providers/FirebaseProvider';
import Combobox, { Option } from './combobox/Combobox';

interface TripSelectorProps {
  stations: Station[];
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  return (
    <div className={styles.container}>
      {props.stations.length ? (
        <div className={styles.stationsSelector}>
          <Combobox
            name="stations"
            placeholder="Salida"
            options={props.stations.map(
              (station) => ({ value: station.id, text: station.name } as Option)
            )}
            inputValue={origin}
            onChange={(newValue) => setOrigin(newValue)}
            validationError={false}
          />
          <Combobox
            name="stations"
            placeholder="Destino"
            options={props.stations
              .filter((station) => station.name !== origin)
              .map(
                (station) =>
                  ({ value: station.id, text: station.name } as Option)
              )}
            inputValue={destination}
            onChange={(newValue) => setDestination(newValue)}
            validationError={false}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TripSelector;
