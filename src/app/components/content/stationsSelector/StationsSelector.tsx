import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './StationsSelector.module.css';
import Combobox, { Option } from '../combobox/Combobox';
import { ReactComponent as Switcher } from '../../../static/img/switcher.svg';
import { Station } from '../../domain';

interface StationsSelectorProps {
  stations: Station[];
  origin: string;
  destination: string;
  originValidationError: boolean;
  destinationValidationError: boolean;
  onOriginChange: (newOrigin: string) => void;
  onDestinationChange: (newDestination: string) => void;
  onSwitcherClick: () => void;
}

const StationsSelector: React.FC<StationsSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
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
            (station) => ({ value: station.id, text: station.name } as Option)
          )}
        inputValue={props.origin}
        onChange={props.onOriginChange}
        validationError={props.originValidationError}
      />
      <button
        title="stations-switcher"
        type="button"
        className={styles.stationsSwitcher}
        onClick={props.onSwitcherClick}
      >
        <Switcher />
      </button>
      <Combobox
        name="destination"
        placeholder={`${t('Content.TripSelector.DESTINATION_PLACEHOLDER')} ${
          props.destinationValidationError
            ? ` - ${t('Content.TripSelector.ERROR')}`
            : ''
        }`}
        options={props.stations
          .filter((station) => station.name !== props.origin)
          .map(
            (station) => ({ value: station.id, text: station.name } as Option)
          )}
        inputValue={props.destination}
        onChange={props.onDestinationChange}
        validationError={props.destinationValidationError}
      />
    </div>
  );
};

export default StationsSelector;
