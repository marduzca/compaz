import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './StationsSelector.module.css';
import Combobox, { Option } from '../../../atoms/combobox/Combobox';
import { ReactComponent as Switcher } from '../../../../static/img/switcher.svg';
import { Station } from '../../../domain';

export const ORIGIN = 'Content.TripSelector.ORIGIN_PLACEHOLDER';
export const DESTINATION = 'Content.TripSelector.DESTINATION_PLACEHOLDER';

interface StationsSelectorProps {
  stations: Station[];
  originInputValue: string;
  destinationInputValue: string;
  showOriginValidationError: boolean;
  showDestinationValidationError: boolean;
  showOriginMissingError: boolean;
  showDestinationMissingError: boolean;
  onOriginChange: (newOrigin: string) => void;
  onDestinationChange: (newDestination: string) => void;
  onSwitcherClick: () => void;
  onClearButtonClick: (inputName: string) => void;
}

const StationsSelector: React.FC<StationsSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.stationsSelector}>
      <Combobox
        name={t(ORIGIN)}
        placeholder={`${t(ORIGIN)}${
          // eslint-disable-next-line no-nested-ternary
          props.showOriginValidationError
            ? ` - ${t('Content.TripSelector.ERROR_VALIDATION')}`
            : props.showOriginMissingError && !props.originInputValue.length
            ? ` ${t('Content.TripSelector.ERROR_ORIGIN_MISSING')}`
            : ''
        }`}
        options={props.stations
          .filter((station) => station.name !== props.destinationInputValue)
          .map(
            (station) => ({ value: station.id, text: station.name } as Option)
          )}
        inputValue={props.originInputValue}
        onChange={props.onOriginChange}
        validationError={
          props.showOriginValidationError ||
          (props.showOriginMissingError && !props.originInputValue.length)
        }
        toggleButtonTitle={t('Content.TripSelector.TOGGLE_STATIONS')}
        clearButtonTitle={t('Content.TripSelector.CLEAR_INPUT')}
        onClearButtonClick={props.onClearButtonClick}
      />
      <button
        title={t('Content.TripSelector.STATIONS_SWITCHER')}
        type="button"
        className={styles.stationsSwitcherButton}
        onClick={props.onSwitcherClick}
      >
        <Switcher />
      </button>
      <Combobox
        name={t(DESTINATION)}
        placeholder={`${t(DESTINATION)} ${
          // eslint-disable-next-line no-nested-ternary
          props.showDestinationValidationError
            ? ` - ${t('Content.TripSelector.ERROR_VALIDATION')}`
            : props.showDestinationMissingError &&
              !props.destinationInputValue.length
            ? ` ${t('Content.TripSelector.ERROR_DESTINATION_MISSING')}`
            : ''
        }`}
        options={props.stations
          .filter((station) => station.name !== props.originInputValue)
          .map(
            (station) => ({ value: station.id, text: station.name } as Option)
          )}
        inputValue={props.destinationInputValue}
        onChange={props.onDestinationChange}
        validationError={
          props.showDestinationValidationError ||
          (props.showDestinationMissingError &&
            props.destinationInputValue.length === 0)
        }
        toggleButtonTitle={t('Content.TripSelector.TOGGLE_STATIONS')}
        clearButtonTitle={t('Content.TripSelector.CLEAR_INPUT')}
        onClearButtonClick={props.onClearButtonClick}
      />
    </div>
  );
};

export default StationsSelector;
