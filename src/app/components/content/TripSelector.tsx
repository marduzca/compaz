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
  originValidationError: boolean;
  destinationValidationError: boolean;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {props.stations.length ? (
        <div className={styles.stationsSelector}>
          <Combobox
            name="origin"
            placeholder={`${t('Content.TripSelector.ORIGIN_PLACEHOLDER')}${
              props.originValidationError
                ? ` - ${t('Content.TripSelector.ERROR')}`
                : ''
            }`}
            options={props.stations
              .filter((station) => station.name !== props.destination)
              .map(
                (station) =>
                  ({ value: station.id, text: station.name } as Option)
              )}
            inputValue={props.origin}
            onChange={props.onOriginChange}
            validationError={props.originValidationError}
          />
          <Combobox
            name="destination"
            placeholder={`${t(
              'Content.TripSelector.DESTINATION_PLACEHOLDER'
            )} ${
              props.destinationValidationError
                ? ` - ${t('Content.TripSelector.ERROR')}`
                : ''
            }`}
            options={props.stations
              .filter((station) => station.name !== props.origin)
              .map(
                (station) =>
                  ({ value: station.id, text: station.name } as Option)
              )}
            inputValue={props.destination}
            onChange={props.onDestinationChange}
            validationError={props.destinationValidationError}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TripSelector;
