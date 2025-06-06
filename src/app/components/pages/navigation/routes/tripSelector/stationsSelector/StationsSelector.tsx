import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './StationsSelector.module.css';
import Combobox, { Option } from '../../../../../atoms/combobox/Combobox';
import Switcher from '../../../../../../static/svg/switcher.svg?react';
import { Station } from '../../../../../domain';
import {
  isFeatureFlagSet,
  REPLACE_INPUTS_WITH_MUI,
} from '../../../../../../featureFlag/FeatureFlag';
import SelectMui from '../../../../../atoms/select-mui/SelectMui';

const ORIGIN = 'Navigation.TripSelector.ORIGIN_PLACEHOLDER';
const DESTINATION = 'Navigation.TripSelector.DESTINATION_PLACEHOLDER';

interface StationsSelectorProps {
  stations: Station[];
  stationsGroupedByLine?: Record<string, Station[]>;
  originInputValue: string;
  destinationInputValue: string;
  showOriginValidationError: boolean;
  showDestinationValidationError: boolean;
  onOriginChange: (newOrigin: string) => void;
  onDestinationChange: (newDestination: string) => void;
  onSwitcherClick: () => void;
  onClearOriginButtonClick: () => void;
  onClearDestinationButtonClick: () => void;
}

const StationsSelector: React.FC<StationsSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      {isFeatureFlagSet(REPLACE_INPUTS_WITH_MUI) &&
      props.stationsGroupedByLine ? (
        <div className={styles.stationsSelector}>
          <SelectMui
            onChange={props.onOriginChange}
            selectedOption={props.originInputValue}
            options={Object.keys(props.stationsGroupedByLine).map((line) => ({
              label: line,
              options: props.stationsGroupedByLine
                ? props.stationsGroupedByLine[line]
                    .filter(
                      (station) =>
                        station.id !== props.destinationInputValue &&
                        station.name !== props.destinationInputValue,
                    )
                    .map(
                      (station) =>
                        ({
                          value: station.id,
                          text: station.name,
                        }) as Option,
                    )
                : [],
            }))}
            label={t(ORIGIN)}
          />
          <button
            title={t('Navigation.TripSelector.STATIONS_SWITCHER')}
            aria-label={t('Navigation.TripSelector.STATIONS_SWITCHER')}
            type="button"
            className={styles.stationsSwitcherButton}
            onClick={props.onSwitcherClick}
          >
            <Switcher />
          </button>
          <SelectMui
            onChange={props.onDestinationChange}
            selectedOption={props.destinationInputValue}
            options={Object.keys(props.stationsGroupedByLine).map((line) => ({
              label: line,
              options: props.stationsGroupedByLine
                ? props.stationsGroupedByLine[line]
                    .filter(
                      (station) =>
                        station.id !== props.originInputValue &&
                        station.name !== props.originInputValue,
                    )
                    .map(
                      (station) =>
                        ({
                          value: station.id,
                          text: station.name,
                        }) as Option,
                    )
                : [],
            }))}
            label={t(DESTINATION)}
          />
        </div>
      ) : (
        <div className={styles.stationsSelector}>
          <Combobox
            name={t(ORIGIN)}
            placeholder={`${t(ORIGIN)}${
              props.showOriginValidationError
                ? ` - ${t('Navigation.TripSelector.ERROR_VALIDATION')}`
                : ''
            }`}
            options={props.stations
              .filter((station) => station.name !== props.destinationInputValue)
              .map(
                (station) =>
                  ({
                    value: station.id,
                    text: station.name,
                    lines: station.lines,
                  }) as Option,
              )}
            inputValue={props.originInputValue}
            onChange={props.onOriginChange}
            validationError={props.showOriginValidationError}
            toggleButtonTitle={t('Navigation.TripSelector.TOGGLE_STATIONS')}
            clearButtonTitle={t('Navigation.TripSelector.CLEAR_INPUT')}
            required
            onClearButtonClick={props.onClearOriginButtonClick}
          />
          <button
            title={t('Navigation.TripSelector.STATIONS_SWITCHER')}
            aria-label={t('Navigation.TripSelector.STATIONS_SWITCHER')}
            type="button"
            className={styles.stationsSwitcherButton}
            onClick={props.onSwitcherClick}
          >
            <Switcher />
          </button>
          <Combobox
            name={t(DESTINATION)}
            placeholder={`${t(DESTINATION)}${
              props.showDestinationValidationError
                ? ` - ${t('Navigation.TripSelector.ERROR_VALIDATION')}`
                : ''
            }`}
            options={props.stations
              .filter((station) => station.name !== props.originInputValue)
              .map(
                (station) =>
                  ({
                    value: station.id,
                    text: station.name,
                    lines: station.lines,
                  }) as Option,
              )}
            inputValue={props.destinationInputValue}
            onChange={props.onDestinationChange}
            validationError={props.showDestinationValidationError}
            toggleButtonTitle={t('Navigation.TripSelector.TOGGLE_STATIONS')}
            clearButtonTitle={t('Navigation.TripSelector.CLEAR_INPUT')}
            required
            onClearButtonClick={props.onClearDestinationButtonClick}
          />
        </div>
      )}
    </>
  );
};

export default StationsSelector;
