import React from 'react';
import { useTranslation } from 'react-i18next';
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

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {props.stations.length ? (
        <div className={styles.stationsSelector}>
          <Combobox
            name="origin"
            placeholder={t('Content.TripSelector.ORIGIN_PLACEHOLDER')}
            options={props.stations.map(
              (station) => ({ value: station.id, text: station.name } as Option)
            )}
            inputValue={props.origin}
            onChange={props.onOriginChange}
            validationError={false}
          />
          <Combobox
            name="destination"
            placeholder={t('Content.TripSelector.DESTINATION_PLACEHOLDER')}
            options={props.stations
              .filter((station) => station.name !== origin)
              .map(
                (station) =>
                  ({ value: station.id, text: station.name } as Option)
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
};

export default TripSelector;
