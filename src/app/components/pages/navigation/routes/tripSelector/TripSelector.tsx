import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TripSelector.module.css';
import { ReactComponent as SearchIcon } from '../../../../../static/svg/chevron_right.svg';
import StationsSelectorContainer from './stationsSelector/StationsSelectorContainer';
import DateAndTimePickerContainer from './dateAndTimePicker/DateAndTimePickerContainer';
import MobileHeader from '../../../../molecules/mobileHeader/MobileHeader';

interface TripSelectorProps {
  showOriginMissingError: boolean;
  showDestinationMissingError: boolean;
  onMenuButtonClick: () => void;
  onSearchButtonClick: () => void;
}

const TripSelector: React.FC<TripSelectorProps> = (props) => {
  const { t } = useTranslation();

  return (
    <section className={styles.tripSelector}>
      <MobileHeader
        onMenuButtonClick={props.onMenuButtonClick}
        hasLightBackground={false}
      />
      <div className={styles.inputFields}>
        <StationsSelectorContainer
          showOriginMissingError={props.showOriginMissingError}
          showDestinationMissingError={props.showDestinationMissingError}
        />
        <DateAndTimePickerContainer />
      </div>
      <button
        type="button"
        aria-label={t('Navigation.TripSelector.SEARCH_BUTTON')}
        className={styles.searchButton}
        onClick={props.onSearchButtonClick}
      >
        <p>{t('Navigation.TripSelector.SEARCH_BUTTON')}</p>
        <SearchIcon />
      </button>
    </section>
  );
};

export default TripSelector;
