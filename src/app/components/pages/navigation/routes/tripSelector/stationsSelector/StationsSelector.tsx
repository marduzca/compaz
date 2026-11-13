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
import StationPicker, {
  StationsOfLine,
} from '../../../../../atoms/station-picker/StationPicker';

const ORIGIN = 'Navigation.TripSelector.ORIGIN_PLACEHOLDER';
const DESTINATION = 'Navigation.TripSelector.DESTINATION_PLACEHOLDER';

interface StationsSelectorProps {
  stations: Station[];
  originGroups?: StationsOfLine[];
  destinationGroups?: StationsOfLine[];
  originStationId?: string | undefined;
  destinationStationId?: string | undefined;
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
      props.originGroups &&
      props.destinationGroups ? (
        <div className={styles.stationsSelector}>
          <StationPicker
            label={t(ORIGIN)}
            groups={props.originGroups}
            selectedStationId={props.originStationId}
            onSelect={props.onOriginChange}
            onClear={props.onClearOriginButtonClick}
            clearText={t('Navigation.TripSelector.CLEAR_INPUT')}
            errorMessage={
              props.showOriginValidationError
                ? t('Navigation.TripSelector.ERROR_VALIDATION')
                : undefined
            }
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
          <StationPicker
            label={t(DESTINATION)}
            groups={props.destinationGroups}
            selectedStationId={props.destinationStationId}
            onSelect={props.onDestinationChange}
            onClear={props.onClearDestinationButtonClick}
            clearText={t('Navigation.TripSelector.CLEAR_INPUT')}
            errorMessage={
              props.showDestinationValidationError
                ? t('Navigation.TripSelector.ERROR_VALIDATION')
                : undefined
            }
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
